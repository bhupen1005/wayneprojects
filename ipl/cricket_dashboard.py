# cricket_dashboard.py
# Python Streamlit app to parse local HTML scorecards and build interactive dashboards

import os
import re
import glob
from bs4 import BeautifulSoup
import pandas as pd
import streamlit as st
import uuid  # For generating unique match IDs


# -----------------------
# Helper: Parse a single HTML scorecard
# -----------------------

def parse_scorecard(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    match_info = {}

    # --- Match metadata from <h1> and subheader ---
    hdr = soup.select_one('h1.cb-nav-hdr')
    if hdr:
        try:
            title = hdr.text.strip()
            teams_part, rest = title.split(',', 1)
            team_a, team_b = [t.strip() for t in teams_part.split(' vs ')]
            match_info['teams'] = f"{team_a} vs {team_b}"
            match_info['match_name'] = rest.split('-')[0].strip()
        except ValueError:
            match_info['teams'] = "Unknown"
            match_info['match_name'] = "Unknown"
    else:
        match_info['teams'] = "Unknown"
        match_info['match_name'] = "Unknown"

    # Date from itemprop=startDate
    dt = soup.select_one('span[itemprop="startDate"]')
    match_info['date'] = dt['content'].split(
        'T')[0] if dt and dt.has_attr('content') else ''

    # Series (first link in subheader)
    series_link = soup.select_one('.cb-nav-subhdr a')
    match_info['series'] = series_link.text.strip() if series_link else ''

    # Generate a unique match_id
    match_info['match_id'] = str(uuid.uuid4())

    batting = []
    bowling = []

    # --- Iterate each innings block ---
    for inn in soup.find_all('div', id=re.compile(r'innings_\d')):
        hdr_row = inn.select_one('.cb-scrd-hdr-rw')
        if not hdr_row:
            continue
        team_name = hdr_row.find('span').text.replace(' Innings', '').strip()
        total = hdr_row.find('span', class_='pull-right').text.strip()

        # --- Batting ---
        try:
            bat_hdr = next(
                h for h in inn.select('.cb-scrd-sub-hdr.cb-bg-gray')
                if 'Batter' in h.text
            )
        except StopIteration:
            continue

        for sib in bat_hdr.find_next_siblings():
            cls = sib.get('class', [])
            if 'cb-scrd-sub-hdr' in cls or 'cb-ltst-wgt-hdr' in cls:
                break
            if 'cb-scrd-itms' in cls:
                if sib.select_one('div.cb-col.cb-col-60'):
                    continue

                player_el = sib.select_one('div.cb-col.cb-col-25')
                if not player_el:
                    continue
                player = player_el.text.strip()

                nums = sib.select('div.cb-col.cb-col-8.text-right')
                if len(nums) < 5:
                    continue

                runs = nums[0].text.strip()
                balls = nums[1].text.strip()
                fours = nums[2].text.strip()
                sixes = nums[3].text.strip()
                sr = nums[4].text.strip()

                batting.append({
                    'match_id': match_info['match_id'],
                    'team': team_name,
                    'player': player,
                    'runs': runs,
                    'balls': balls,
                    'fours': fours,
                    'sixes': sixes,
                    'strike_rate': sr
                })

        # --- Bowling ---
        try:
            bowl_hdr = next(
                h for h in inn.select('.cb-scrd-sub-hdr.cb-bg-gray.text-bold')
                if 'Bowler' in h.text
            )
        except StopIteration:
            continue

        for sib in bowl_hdr.find_next_siblings():
            cls = sib.get('class', [])
            if 'cb-ltst-wgt-hdr' in cls:
                break
            if 'cb-scrd-itms' in cls:
                bowler = sib.select_one('div.cb-col.cb-col-38').text.strip()
                nums = sib.select('div.cb-col.text-right')
                if len(nums) < 7:
                    continue

                overs = nums[0].text.strip()
                maidens = nums[1].text.strip()
                runs_conceded = nums[2].text.strip()
                wickets = nums[3].text.strip()
                nb = nums[4].text.strip()
                wd = nums[5].text.strip()
                econ = nums[6].text.strip()

                bowling.append({
                    'match_id': match_info['match_id'],
                    'team': team_name,
                    'bowler': bowler,
                    'overs': overs,
                    'maidens': maidens,
                    'runs_conceded': runs_conceded,
                    'wickets': wickets,
                    'no_balls': nb,
                    'wides': wd,
                    'economy': econ
                })

    return match_info, pd.DataFrame(batting), pd.DataFrame(bowling)


def load_data_from_folder(folder_path='data'):
    matches = []
    batting_list = []
    bowling_list = []
    html_files = glob.glob(os.path.join(folder_path, '*.html'))
    for file in html_files:
        try:
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
            info, bat_df, bowl_df = parse_scorecard(content)
            matches.append(info)
            batting_list.append(bat_df)
            bowling_list.append(bowl_df)
        except Exception as e:
            st.warning(f"Error processing file {file}: {e}")

    matches_df = pd.DataFrame(matches)
    batting_df = pd.concat(
        batting_list, ignore_index=True) if batting_list else pd.DataFrame()
    bowling_df = pd.concat(
        bowling_list, ignore_index=True) if bowling_list else pd.DataFrame()

    # Convert numeric columns
    for col in ['runs', 'balls', 'fours', 'sixes', 'strike_rate']:
        if col in batting_df.columns:
            batting_df[col] = pd.to_numeric(batting_df[col], errors='coerce')

    for col in ['overs', 'maidens', 'runs_conceded', 'wickets', 'no_balls', 'wides', 'economy']:
        if col in bowling_df.columns:
            bowling_df[col] = pd.to_numeric(bowling_df[col], errors='coerce')

    return matches_df, batting_df, bowling_df


# -----------------------
# Streamlit UI
# -----------------------

def main():
    st.set_page_config(layout="wide")
    st.title("Cricket Dashboard")
    st.sidebar.header("Filters")

    matches_df, batting_df, bowling_df = load_data_from_folder('data')

    if matches_df.empty:
        st.error("No match data found in `data/`. Please check your HTML files.")
        return

    teams = set()
    matches_df['teams'].str.split(' vs ').apply(teams.update)
    if not teams:
        st.error("No teams parsed from your data.")
        return

    # Sidebar dropdowns for selecting two teams
    team1_selected = st.sidebar.selectbox(
        'Select Team 1', sorted(teams), key='team1')
    team2_selected = st.sidebar.selectbox(
        'Select Team 2', sorted(teams), key='team2')

    # Filter matches and batting data for the selected teams
    team1_matches = matches_df[matches_df['teams'].str.contains(
        team1_selected)]
    team2_matches = matches_df[matches_df['teams'].str.contains(
        team2_selected)]

    team1_batting = batting_df[batting_df['team'] == team1_selected]
    team2_batting = batting_df[batting_df['team'] == team2_selected]

    # Sidebar dropdowns for selecting players from the respective teams
    team1_players = sorted(team1_batting['player'].unique())
    team2_players = sorted(team2_batting['player'].unique())

    player1_selected = st.sidebar.selectbox(
        f'Select Player from {team1_selected}', team1_players, key='player1')
    player2_selected = st.sidebar.selectbox(
        f'Select Player from {team2_selected}', team2_players, key='player2')

    # Create two columns for Team 1 and Team 2
    col1, col2 = st.columns(2)

    # Team 1 Stats (Left Column)
    with col1:
        st.subheader(f"{team1_selected} Stats")

        # Matches for Team 1
        st.write(f"Matches for {team1_selected}")
        st.dataframe(team1_matches[['date', 'teams', 'match_name']])

        # Top Scorers for Team 1
        st.write(f"Top Scorers for {team1_selected}")
        if not team1_batting.empty:
            top_team1_scorers = team1_batting.groupby(
                'player')['runs'].sum().sort_values(ascending=False).head(5)
            st.bar_chart(top_team1_scorers)
        else:
            st.write(f"No batting data available for {team1_selected}.")

        # Player 1's Last Scores
        st.write(f"Last Scores of {player1_selected}")
        player1_stats = team1_batting[team1_batting['player']
                                      == player1_selected]
        if not player1_stats.empty:
            player1_stats = player1_stats.merge(
                matches_df[['match_id', 'date']], on='match_id', how='left')
            player1_stats['date'] = pd.to_datetime(player1_stats['date'])
            player1_stats = player1_stats.sort_values('date')  # Sort by date
            player1_stats['runs'] = pd.to_numeric(
                player1_stats['runs'], errors='coerce')
            chart_data = player1_stats[['date', 'runs']].set_index('date')
            st.line_chart(chart_data)
        else:
            st.write(f"No data available for {player1_selected}.")

        # Team 1 Performance Over Time
        st.write(f"Performance of {team1_selected} Over Time")
        team1_performance = team1_batting.groupby(
            'match_id')['runs'].sum().reset_index()
        team1_performance = team1_performance.merge(
            matches_df, on='match_id', how='left')
        team1_performance['date'] = pd.to_datetime(team1_performance['date'])
        team1_performance = team1_performance.sort_values('date')
        if not team1_performance.empty:
            st.line_chart(
                team1_performance[['date', 'runs']].set_index('date'))
        else:
            st.write(f"No performance data available for {team1_selected}.")

    # Team 2 Stats (Right Column)
    with col2:
        st.subheader(f"{team2_selected} Stats")

        # Matches for Team 2
        st.write(f"Matches for {team2_selected}")
        st.dataframe(team2_matches[['date', 'teams', 'match_name']])

        # Top Scorers for Team 2
        st.write(f"Top Scorers for {team2_selected}")
        if not team2_batting.empty:
            top_team2_scorers = team2_batting.groupby(
                'player')['runs'].sum().sort_values(ascending=False).head(5)
            st.bar_chart(top_team2_scorers)
        else:
            st.write(f"No batting data available for {team2_selected}.")

        # Player 2's Last Scores
        st.write(f"Last Scores of {player2_selected}")
        player2_stats = team2_batting[team2_batting['player']
                                      == player2_selected]
        if not player2_stats.empty:
            player2_stats = player2_stats.merge(
                matches_df[['match_id', 'date']], on='match_id', how='left')
            player2_stats['date'] = pd.to_datetime(player2_stats['date'])
            player2_stats = player2_stats.sort_values('date')  # Sort by date
            player2_stats['runs'] = pd.to_numeric(
                player2_stats['runs'], errors='coerce')
            chart_data = player2_stats[['date', 'runs']].set_index('date')
            st.line_chart(chart_data)
        else:
            st.write(f"No data available for {player2_selected}.")

        # Team 2 Performance Over Time
        st.write(f"Performance of {team2_selected} Over Time")
        team2_performance = team2_batting.groupby(
            'match_id')['runs'].sum().reset_index()
        team2_performance = team2_performance.merge(
            matches_df, on='match_id', how='left')
        team2_performance['date'] = pd.to_datetime(team2_performance['date'])
        team2_performance = team2_performance.sort_values('date')
        if not team2_performance.empty:
            st.line_chart(
                team2_performance[['date', 'runs']].set_index('date'))
        else:
            st.write(f"No performance data available for {team2_selected}.")


if __name__ == '__main__':
    main()
