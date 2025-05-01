import os
import glob
import json
import uuid
import re
from bs4 import BeautifulSoup
import pandas as pd
import streamlit as st
import altair as alt

# -----------------------------------------
# Cached data loading and transformation
# -----------------------------------------


@st.cache_data
def load_and_flatten_data(match_folder="matches"):
    # Discover JSON match files
    files = glob.glob(os.path.join(match_folder, "*.json"))
    matches, innings, batting, bowling, runs_over, fow = [], [], [], [], [], []
    for fp in files:
        try:
            data = json.load(open(fp))
        except Exception:
            continue
        m = data.get("match")
        c = data.get("content", {})
        inns = c.get("innings", [])
        if not m or not inns:
            continue
        # Clean HTML text
        status = BeautifulSoup(m.get('statusText', ''),
                               'html.parser').get_text()
        date = m.get('daysInfo', m.get('startDate', '')[:10])
        venue = m.get('ground', {}).get('name', '')
        toss_id = m.get('tossWinnerTeamId')
        toss = ""
        if toss_id:
            teams = m.get('teams', [])
            tw = next((t['team']['longName']
                      for t in teams if t['team']['id'] == toss_id), None)
            choice = m.get('tossWinnerChoice')
            toss = f"{tw} won toss and chose {'bat' if choice == 1 else 'field'}"
        pom = None
        pom_data = m.get('playerOfTheMatch') or c.get('mostValuedPlayerOfTheMatch') or c.get(
            'supportInfo', {}).get('mostValuedPlayerOfTheMatch')
        if isinstance(pom_data, dict) and 'player' in pom_data:
            pom = pom_data['player'].get(
                'longName') or pom_data['player'].get('name')
        mid = m.get('id') or str(uuid.uuid4())
        teams = [t['team']['longName'] for t in m.get('teams', [])]
        matches.append({
            'match_id': mid, 'date': date, 'teams': ' vs '.join(teams),
            'result': status, 'venue': venue, 'toss': toss, 'pom': pom
        })
        # Flatten each innings
        for idx, inn in enumerate(inns, start=1):
            team = inn.get('team', {}).get('longName')
            runs = inn.get('runs')
            wkts = inn.get('wickets')
            ovs = inn.get('overs')
            innings.append({
                'match_id': mid, 'inning': idx, 'team': team,
                'runs': runs, 'wickets': wkts, 'overs': ovs
            })
            # batting
            for b in inn.get('inningBatsmen', []):
                if b.get('playerRoleType') != 'P':
                    continue
                p = b['player']
                sr = b.get('strikerate') or (runs := b.get('runs') or 0) * 100 / (balls := b.get('balls') or 1)
                batting.append({
                    'match_id': mid, 'inning': idx, 'team': team,
                    'player': p.get('longName') or p.get('name'),
                    'runs': b.get('runs', 0), 'balls': b.get('balls', 0),
                    'fours': b.get('fours', 0), 'sixes': b.get('sixes', 0),
                    'sr': round(sr, 2), 'dismissal': (b.get('dismissalText') or {}).get('long')
                })
            # bowling
            for b in inn.get('inningBowlers', []):
                p = b['player']
                bowling.append({
                    'match_id': mid, 'inning': idx, 'team': team,
                    'player': p.get('longName') or p.get('name'),
                    'overs': b.get('overs', 0), 'maidens': b.get('maidens', 0),
                    'runs_conceded': b.get('conceded', 0), 'wickets': b.get('wickets', 0),
                    'econ': round(b.get('economy', 0.0), 2),
                    'wides': b.get('wides', 0), 'noballs': b.get('noballs', 0)
                })
            # runs by over & cumulative
            ro = inn.get('runs_by_over') or []
            cum = 0
            for i, r in enumerate(ro, start=1):
                cum += r
                runs_over.append(
                    {'match_id': mid, 'inning': idx, 'over': i, 'runs': r, 'cum_runs': cum})
            # fall of wickets
            for f in inn.get('fall_of_wickets', []):
                wicket, batsman, r_at, ov = f
                fow.append({
                    'match_id': mid, 'inning': idx,
                    'wicket': wicket, 'player': batsman,
                    'runs_at': r_at, 'over': ov
                })
    # Convert to DataFrames
    return (
        pd.DataFrame(matches), pd.DataFrame(innings),
        pd.DataFrame(batting), pd.DataFrame(bowling),
        pd.DataFrame(runs_over), pd.DataFrame(fow)
    )


# -----------------------------------------
# UI Layout and Interactivity
# -----------------------------------------
st.set_page_config(page_title="Advanced Cricket Dashboard", layout="wide")
st.title("🏏 Advanced Interactive Cricket Dashboard")

# Load data
match_df, inn_df, bat_df, bowl_df, ro_df, fow_df = load_and_flatten_data()

# Sidebar filters
st.sidebar.header("Filters & Comparison")
matches = match_df['match_id'].tolist()
match_map = dict(zip(match_df['match_id'], match_df['teams']))
sel_match = st.sidebar.selectbox(
    "Select Match", options=matches, format_func=lambda x: match_map[x])
teams = list(set(bat_df['team'].tolist() + bowl_df['team'].tolist()))
sel_team = st.sidebar.selectbox("Select Team (All)", options=["All"]+teams)
players = sorted(set(bat_df['player'].tolist() + bowl_df['player'].tolist()))
sel_players = st.sidebar.multiselect(
    "Compare Players", options=players, default=[])
# Overs filter (range slider)
max_over = int(ro_df['over'].max())
over_min, over_max = st.sidebar.slider(
    "Select Over Range", 1, max_over, (1, max_over))
# -------------------
# Tabs for sections
# -------------------
tab1, tab2, tab3, tab4, tab5 = st.tabs([
    "Match Overview", "Batting Analysis", "Bowling Analysis", "Player Comparison", "Aggregate Stats"
])

# -----------------------------------------
# 1) Match Overview Tab
# -----------------------------------------
with tab1:
    st.header("Match Overview")
    md = match_df.set_index('match_id').loc[sel_match]
    col1, col2, col3 = st.columns(3)
    col1.metric("Date", md['date'])
    col2.metric("Venue", md['venue'])
    col3.metric("Result", md['result'])
    if md['pom']:
        st.markdown(f"**Player of the Match:** {md['pom']}")
    st.markdown("---")

    # Worm chart: cumulative runs over overs
    data = ro_df[(ro_df['match_id'] == sel_match) & (
        ro_df['over'].between(over_min, over_max))]
    chart = alt.Chart(data).mark_line(point=True).encode(
        x=alt.X('over:O', title='Over'),
        y=alt.Y('cum_runs:Q', title='Cumulative Runs'),
        color='inning:N',
        tooltip=['inning', 'over', 'runs', 'cum_runs']
    ).properties(width=700, height=300)
    st.altair_chart(chart, use_container_width=True)

    # Fall of wickets overlay
    fdata = fow_df[fow_df['match_id'] == sel_match]
    scatter = alt.Chart(fdata).mark_point(filled=True, size=100).encode(
        x='over:O', y='runs_at:Q', shape='inning:N', color='inning:N',
        tooltip=['player', 'runs_at', 'over', 'wicket']
    )
    st.altair_chart(chart + scatter, use_container_width=True)

    # Runs per over bar chart
    bar = alt.Chart(data).mark_bar().encode(
        x='over:O', y='runs:Q', color='inning:N',
        tooltip=['inning', 'over', 'runs']
    ).properties(width=700, height=200)
    st.altair_chart(bar, use_container_width=True)

# -----------------------------------------
# 2) Batting Analysis Tab
# -----------------------------------------
with tab2:
    st.header("Batting Analysis")
    df = bat_df[(bat_df['match_id'] == sel_match) & (
        bat_df['team'] == sel_team if sel_team != "All" else True)]
    if df.empty:
        st.write("No batting data for this selection.")
    else:
        # Top 5 batsmen by runs
        st.subheader("Top Batsmen by Runs")
        top5 = df.nlargest(5, 'runs')
        st.table(top5[['player', 'runs', 'balls', 'fours', 'sixes', 'sr']])
        # Strike Rate Distribution
        st.subheader("Strike Rate Distribution")
        box = alt.Chart(df).mark_boxplot().encode(
            x=alt.value(''), y='sr:Q',
            tooltip=['player', 'sr', 'runs']
        ).properties(width=400, height=200)
        st.altair_chart(box)

# -----------------------------------------
# 3) Bowling Analysis Tab
# -----------------------------------------
with tab3:
    st.header("Bowling Analysis")
    dfb = bowl_df[(bowl_df['match_id'] == sel_match) & (
        bowl_df['team'] == sel_team if sel_team != "All" else True)]
    if dfb.empty:
        st.write("No bowling data for this selection.")
    else:
        # Top 5 bowlers by wickets
        st.subheader("Top Bowlers by Wickets")
        topb = dfb.nlargest(5, 'wickets')
        st.table(topb[['player', 'wickets', 'overs', 'econ']])
        # Economy Rate Distribution
        st.subheader("Economy Rate Distribution")
        box2 = alt.Chart(dfb).mark_boxplot().encode(
            x=alt.value(''), y='econ:Q',
            tooltip=['player', 'econ', 'wickets']
        ).properties(width=400, height=200)
        st.altair_chart(box2)

# -----------------------------------------
# 4) Player Comparison Tab
# -----------------------------------------
with tab4:
    st.header("Player Comparison Over Matches")
    if len(sel_players) < 2:
        st.write("Select two players in the sidebar to compare their career graphs.")
    else:
        # Prepare career runs per match
        cm = bat_df[bat_df['player'].isin(sel_players)].groupby(
            ['player', 'match_id'])['runs'].sum().reset_index()
        # Merge with match dates
        cm = cm.merge(match_df[['match_id', 'date']], on='match_id')
        line = alt.Chart(cm).mark_line(point=True).encode(
            x=alt.X('date:T', title='Match Date'),
            y=alt.Y('runs:Q', title='Runs'),
            color='player:N',
            tooltip=['player', 'date', 'runs']
        ).properties(width=700, height=300)
        st.altair_chart(line, use_container_width=True)
        # Also show table
        st.subheader("Summary Stats")
        psum = bat_df[bat_df['player'].isin(sel_players)].groupby('player').agg(
            matches=('match_id', 'nunique'),
            total_runs=('runs', 'sum'),
            avg_sr=('sr', 'mean')
        ).reset_index()
        st.table(psum)

# -----------------------------------------
# 5) Aggregate Stats Tab
# -----------------------------------------
with tab5:
    st.header("Aggregate Tournament Stats")
    # Leaderboard: top run scorers
    rs = bat_df.groupby('player')['runs'].sum(
    ).reset_index().nlargest(10, 'runs')
    st.subheader("Top 10 Run Scorers")
    st.table(rs)
    # Leaderboard: top wicket takers
    ws = bowl_df.groupby('player')['wickets'].sum(
    ).reset_index().nlargest(10, 'wickets')
    st.subheader("Top 10 Wicket Takers")
    st.table(ws)
    # Avg runs per over heatmap
    avg_ro = ro_df.groupby('over')['runs'].mean().reset_index()
    heat = alt.Chart(avg_ro).mark_rect().encode(
        x=alt.X('over:O', title='Over'),
        y=alt.value(''),
        color=alt.Color('runs:Q', scale=alt.Scale(scheme='greens')),
        tooltip=['over', 'runs']
    ).properties(width=700, height=50)
    st.subheader("Average Runs per Over (All Matches)")
    st.altair_chart(heat, use_container_width=True)

# -----------------------------------------
# Footer note
# -----------------------------------------
st.markdown("---")
st.caption(
    "Dashboard auto-updates as new JSON files are added to the `matches/` folder.")
