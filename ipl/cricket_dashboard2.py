import os, re, glob, json
from bs4 import BeautifulSoup
import pandas as pd
import streamlit as st
import uuid

# Configure page layout
st.set_page_config(page_title="Cricket Match Dashboard", layout="wide")

# Load all JSON match files from the target folder
match_folder = "matches"
if not os.path.isdir(match_folder):
    match_folder = "."  # fall back to current directory
match_files = glob.glob(os.path.join(match_folder, "*.json"))

if not match_files:
    st.error(f"No JSON match files found in folder: {match_folder}")
    st.stop()

matches_data = {}
teams_overall = {}
players_overall = {}

for file_path in match_files:
    try:
        with open(file_path, "r") as f:
            data = json.load(f)
    except Exception as e:
        st.warning(f"Failed to load {file_path}: {e}")
        continue
    # Ensure expected structure
    if 'match' not in data or 'content' not in data or 'innings' not in data['content']:
        continue

    match_info = data['match']
    content = data['content']
    innings_list = content['innings']
    if not innings_list:
        continue

    # Use provided match ID or generate a unique ID
    match_id = match_info.get('id')
    if match_id is None:
        match_id = str(uuid.uuid4())

    # Teams information
    teams_info = match_info.get('teams', [])
    if len(teams_info) < 2:
        continue
    team1_info = teams_info[0]['team']
    team2_info = teams_info[1]['team']
    team1_name = team1_info.get('longName') or team1_info.get('name')
    team2_name = team2_info.get('longName') or team2_info.get('name')
    team1_short = team1_info.get('name', team1_name)
    team2_short = team2_info.get('name', team2_name)

    # Basic match info
    # Clean possible HTML from status text using BeautifulSoup
    raw_status = match_info.get('statusText', "")
    result_text = BeautifulSoup(raw_status, "html.parser").get_text()
    toss_winner_id = match_info.get('tossWinnerTeamId')
    toss_choice = match_info.get('tossWinnerChoice')
    toss_winner_name = team1_name if toss_winner_id == team1_info['id'] else team2_name
    toss_decision = "bat" if toss_choice == 1 else "field"
    toss_text = f"{toss_winner_name} won the toss and elected to {toss_decision} first."
    match_date = match_info.get('daysInfo') or match_info.get('startDate', "")[:10]
    venue = match_info.get('ground', {}).get('name') or match_info.get('ground', {}).get('longName', "")

    # Player of the Match (if available)
    player_of_match = None
    support_info = content.get('supportInfo', {})
    if support_info and support_info.get('mostValuedPlayerOfTheMatch'):
        pom = support_info['mostValuedPlayerOfTheMatch']
        if 'player' in pom:
            player_of_match = pom['player'].get('longName') or pom['player'].get('name')
    if not player_of_match and content.get('mostValuedPlayerOfTheMatch'):
        pom = content['mostValuedPlayerOfTheMatch']
        if 'player' in pom:
            player_of_match = pom['player'].get('longName') or pom['player'].get('name')
    if not player_of_match and match_info.get('playerOfTheMatch'):
        pom = match_info['playerOfTheMatch']
        if isinstance(pom, dict):
            player_of_match = pom.get('longName') or pom.get('name')

    # Innings data
    # Determine which team batted in each innings
    inn1 = innings_list[0]
    inn2 = innings_list[1] if len(innings_list) > 1 else None
    inn1_team_id = inn1['team']['id']
    inn2_team_id = inn2['team']['id'] if inn2 else None
    inn1_team_name = team1_name if inn1_team_id == team1_info['id'] else team2_name
    inn2_team_name = None
    if inn2:
        # If second innings exists
        inn2_team_name = team2_name if inn2_team_id == team2_info['id'] else team1_name

    # Batting stats for innings 1
    bats1 = []
    for batsman in inn1.get('inningBatsmen', []):
        if batsman.get('playerRoleType') != 'P':
            continue  # skip entries that are not actual players
        player_name = batsman['player'].get('battingName') or batsman['player'].get('name')
        runs = batsman.get('runs') or 0
        balls = batsman.get('balls') or 0
        fours = batsman.get('fours') or 0
        sixes = batsman.get('sixes') or 0
        # Calculate strike rate if not provided
        strikerate = batsman.get('strikerate')
        if strikerate is None:
            strikerate = (runs * 100.0 / balls) if balls else 0.0
        # Dismissal information
        if not batsman.get('isOut'):
            dismissal = "not out"
        else:
            dtype = batsman.get('dismissalType')
            bowler_info = batsman.get('dismissalBowler') or {}
            fielders_info = batsman.get('dismissalFielders') or []
            dismissal = ""
            if dtype == 12:
                # 12 might represent retired or not out (depending on source definition)
                dismissal = "not out"
            elif bowler_info and fielders_info:
                # Caught or Stumped (fielder(s) and bowler present)
                fielder_names = ", ".join([f['player']['name'] for f in fielders_info if f.get('player')])
                dismissal = f"c. {fielder_names} b. {bowler_info.get('name','')}"
            elif bowler_info and not fielders_info:
                # Bowled or LBW (no fielder, bowler present)
                dismissal = f"b. {bowler_info.get('name','')}"
            elif fielders_info and not bowler_info:
                # Run out (fielder(s) present, no bowler credit)
                fielder_names = ", ".join([f['player']['name'] for f in fielders_info if f.get('player')])
                dismissal = f"run out ({fielder_names})"
            else:
                dismissal = "out"
        bats1.append([player_name, runs, balls, fours, sixes, f"{strikerate:.2f}", dismissal])

    # Bowling stats for innings 1 (bowling team is inn2_team_name)
    # These are the bowlers from the team that bowled in innings 1 (team2 if team1 batted first, or vice versa)
    bowls_inn1 = []
    for bowler in inn1.get('inningBowlers', []):
        bowler_name = bowler['player']['name']
        overs = bowler.get('overs', 0)
        maidens = bowler.get('maidens', 0)
        runs_conceded = bowler.get('conceded', 0)
        wkts = bowler.get('wickets', 0)
        economy = bowler.get('economy', 0.0)
        wides = bowler.get('wides', 0)
        noballs = bowler.get('noballs', 0)
        bowls_inn1.append([bowler_name, overs, maidens, runs_conceded, wkts, f"{economy:.2f}", wides, noballs])

    # Batting and bowling for innings 2 (if exists)
    bats2 = []
    bowls_inn2 = []
    if inn2:
        for batsman in inn2.get('inningBatsmen', []):
            if batsman.get('playerRoleType') != 'P':
                continue
            player_name = batsman['player'].get('battingName') or batsman['player'].get('name')
            runs = batsman.get('runs') or 0
            balls = batsman.get('balls') or 0
            fours = batsman.get('fours') or 0
            sixes = batsman.get('sixes') or 0
            strikerate = batsman.get('strikerate')
            if strikerate is None:
                strikerate = (runs * 100.0 / balls) if balls else 0.0
            if not batsman.get('isOut'):
                dismissal = "not out"
            else:
                dtype = batsman.get('dismissalType')
                bowler_info = batsman.get('dismissalBowler') or {}
                fielders_info = batsman.get('dismissalFielders') or []
                if dtype == 12:
                    dismissal = "not out"
                elif bowler_info and fielders_info:
                    fielder_names = ", ".join([f['player']['name'] for f in fielders_info if f.get('player')])
                    dismissal = f"c. {fielder_names} b. {bowler_info.get('name','')}"
                elif bowler_info and not fielders_info:
                    dismissal = f"b. {bowler_info.get('name','')}"
                elif fielders_info and not bowler_info:
                    fielder_names = ", ".join([f['player']['name'] for f in fielders_info if f.get('player')])
                    dismissal = f"run out ({fielder_names})"
                else:
                    dismissal = "out"
            bats2.append([player_name, runs, balls, fours, sixes, f"{strikerate:.2f}", dismissal])
        for bowler in inn2.get('inningBowlers', []):
            bowler_name = bowler['player']['name']
            overs = bowler.get('overs', 0)
            maidens = bowler.get('maidens', 0)
            runs_conceded = bowler.get('conceded', 0)
            wkts = bowler.get('wickets', 0)
            economy = bowler.get('economy', 0.0)
            wides = bowler.get('wides', 0)
            noballs = bowler.get('noballs', 0)
            bowls_inn2.append([bowler_name, overs, maidens, runs_conceded, wkts, f"{economy:.2f}", wides, noballs])

    # Fall of wickets for each innings
    fow1_list = []
    for w in inn1.get('inningFallOfWickets', []):
        wicket_num = w.get('fowWicketNum')
        out_batsman = w.get('dismissalBatsman', {}).get('name')
        runs_at_fall = w.get('fowRuns')
        over_at_fall = w.get('fowOvers')
        if wicket_num is not None:
            fow1_list.append((wicket_num, out_batsman, runs_at_fall, over_at_fall))
    fow2_list = []
    if inn2:
        for w in inn2.get('inningFallOfWickets', []):
            wicket_num = w.get('fowWicketNum')
            out_batsman = w.get('dismissalBatsman', {}).get('name')
            runs_at_fall = w.get('fowRuns')
            over_at_fall = w.get('fowOvers')
            if wicket_num is not None:
                fow2_list.append((wicket_num, out_batsman, runs_at_fall, over_at_fall))

    # Runs per over and cumulative runs for each innings (for charts)
    runs_by_over1 = []
    cum_runs1 = []
    for over in inn1.get('inningOvers', []):
        runs_by_over1.append(over.get('overRuns', 0))
        cum_runs1.append(over.get('totalRuns', 0))
    runs_by_over2 = []
    cum_runs2 = []
    if inn2:
        for over in inn2.get('inningOvers', []):
            runs_by_over2.append(over.get('overRuns', 0))
            cum_runs2.append(over.get('totalRuns', 0))

    # Store match data for use in dashboard
    matches_data[str(match_id)] = {
        "teams": [team1_name, team2_name],
        "teams_short": [team1_short, team2_short],
        "score_str": [teams_info[0].get('score'), teams_info[1].get('score')],
        "result": result_text,
        "toss": toss_text,
        "player_of_match": player_of_match,
        "date": match_date,
        "venue": venue,
        "innings": [
            {
                "team_name": inn1_team_name,
                "runs": inn1.get('runs'),
                "wickets": inn1.get('wickets'),
                "overs": inn1.get('overs'),
                "batting": bats1,
                "bowling": bowls_inn2,  # bowling of opposing team in that innings
                "fall_of_wickets": fow1_list,
                "runs_by_over": runs_by_over1,
                "cum_runs": cum_runs1
            },
            {
                "team_name": inn2_team_name,
                "runs": inn2.get('runs') if inn2 else None,
                "wickets": inn2.get('wickets') if inn2 else None,
                "overs": inn2.get('overs') if inn2 else None,
                "batting": bats2,
                "bowling": bowls_inn1,  # bowling of opposing team in that innings
                "fall_of_wickets": fow2_list,
                "runs_by_over": runs_by_over2,
                "cum_runs": cum_runs2
            }
        ]
    }

    # Aggregate team stats (overall across loaded matches)
    for team_name, team_info in zip([team1_name, team2_name], [team1_info, team2_info]):
        if team_name not in teams_overall:
            teams_overall[team_name] = {
                "matches": 0, "wins": 0, "losses": 0,
                "runs_scored": 0, "runs_conceded": 0,
                "wickets_taken": 0, "wickets_lost": 0
            }
        teams_overall[team_name]["matches"] += 1
    # Team runs/wickets from this match
    team1_runs = inn1.get('runs') or 0
    team1_wkts = inn1.get('wickets') or 0
    team2_runs = inn2.get('runs') or 0 if inn2 else 0
    team2_wkts = inn2.get('wickets') or 0 if inn2 else 0
    # The team that batted first (inn1_team_name) scored team1_runs and lost team1_wkts, second innings team scored team2_runs
    if inn1_team_name:
        teams_overall[inn1_team_name]["runs_scored"] += team1_runs
        teams_overall[inn1_team_name]["wickets_lost"] += team1_wkts
        teams_overall[inn1_team_name]["runs_conceded"] += team2_runs
        teams_overall[inn1_team_name]["wickets_taken"] += team2_wkts
    if inn2_team_name:
        teams_overall[inn2_team_name]["runs_scored"] += team2_runs
        teams_overall[inn2_team_name]["wickets_lost"] += team2_wkts
        teams_overall[inn2_team_name]["runs_conceded"] += team1_runs
        teams_overall[inn2_team_name]["wickets_taken"] += team1_wkts
    # Wins and losses
    winner_id = match_info.get('winnerTeamId')
    if winner_id:
        winner_name = team1_name if winner_id == team1_info['id'] else team2_name
        loser_name = team2_name if winner_id == team1_info['id'] else team1_name
        teams_overall[winner_name]["wins"] += 1
        teams_overall[loser_name]["losses"] += 1

    # Aggregate player stats (overall across loaded matches)
    # Batting: add runs, balls, fours, sixes, and count matches for each player
    for batting_entry in bats1 + bats2:
        if not batting_entry: 
            continue
        player_name = batting_entry[0]
        runs = batting_entry[1] or 0
        balls = batting_entry[2] or 0
        fours = batting_entry[3] or 0
        sixes = batting_entry[4] or 0
        if player_name not in players_overall:
            players_overall[player_name] = {"matches": 0, "runs": 0, "balls": 0, "fours": 0, "sixes": 0, "wickets": 0}
        players_overall[player_name]["matches"] += 1
        players_overall[player_name]["runs"] += runs
        players_overall[player_name]["balls"] += balls
        players_overall[player_name]["fours"] += fours
        players_overall[player_name]["sixes"] += sixes
    # Bowling: add wickets and count matches for each bowler
    for bowling_entry in bowls_inn1 + bowls_inn2:
        if not bowling_entry:
            continue
        bowler_name = bowling_entry[0]
        # Wickets might be stored as int or str in list, ensure int
        try:
            wickets = int(bowling_entry[4])
        except:
            wickets = int(float(bowling_entry[4])) if bowling_entry[4] not in [None, ""] else 0
        if bowler_name not in players_overall:
            players_overall[bowler_name] = {"matches": 0, "runs": 0, "balls": 0, "fours": 0, "sixes": 0, "wickets": 0}
        players_overall[bowler_name]["matches"] += 1
        players_overall[bowler_name]["wickets"] += wickets

# Sidebar filters for comparison type
compare_mode = st.sidebar.selectbox("Compare", ["Matches", "Players", "Teams"])

# ============= Matches Comparison Mode =============
if compare_mode == "Matches":
    match_names = []
    match_id_map = {}
    for mid, info in matches_data.items():
        name = f"{info['teams'][0]} vs {info['teams'][1]} - {info['date']}"
        match_names.append(name)
        match_id_map[name] = mid
    match_names = sorted(match_names)
    default_selection = match_names[:2] if len(match_names) >= 2 else match_names
    selected_matches = st.sidebar.multiselect("Select two matches to compare:", match_names, default=default_selection)
    if len(selected_matches) != 2:
        st.sidebar.warning("Please select exactly two matches for comparison.")
    else:
        m1_name, m2_name = selected_matches
        m1 = matches_data[ match_id_map[m1_name] ]
        m2 = matches_data[ match_id_map[m2_name] ]
        # Match Summary side-by-side
        st.header("Match Summary")
        col1, col2 = st.columns(2)
        with col1:
            st.subheader(m1_name)
            st.write(f"**Result:** {m1['result']}")
            st.write(f"**Venue:** {m1['venue']}")
            st.write(f"**Date:** {m1['date']}")
            st.write(f"**Toss:** {m1['toss']}")
            if m1['player_of_match']:
                st.write(f"**Player of the Match:** {m1['player_of_match']}")
        with col2:
            st.subheader(m2_name)
            st.write(f"**Result:** {m2['result']}")
            st.write(f"**Venue:** {m2['venue']}")
            st.write(f"**Date:** {m2['date']}")
            st.write(f"**Toss:** {m2['toss']}")
            if m2['player_of_match']:
                st.write(f"**Player of the Match:** {m2['player_of_match']}")

        # Player (Team) Stats
        st.header("Player Stats")
        col1, col2 = st.columns(2)
        with col1:
            # Match 1 batting and bowling tables
            inn1_team = m1['innings'][0]['team_name']
            inn2_team = m1['innings'][1]['team_name']
            st.markdown(f"**Batting – {inn1_team}**")
            df_bat1 = pd.DataFrame(m1['innings'][0]['batting'], columns=["Batsman", "R", "B", "4s", "6s", "SR", "Dismissal"])
            st.table(df_bat1)
            st.markdown(f"**Batting – {inn2_team}**")
            df_bat2 = pd.DataFrame(m1['innings'][1]['batting'], columns=["Batsman", "R", "B", "4s", "6s", "SR", "Dismissal"])
            st.table(df_bat2)
            st.markdown(f"**Bowling – {inn2_team}**")
            df_bowl1 = pd.DataFrame(m1['innings'][0]['bowling'], columns=["Bowler", "O", "M", "R", "W", "Econ", "Wd", "Nb"])
            st.table(df_bowl1)
            st.markdown(f"**Bowling – {inn1_team}**")
            df_bowl2 = pd.DataFrame(m1['innings'][1]['bowling'], columns=["Bowler", "O", "M", "R", "W", "Econ", "Wd", "Nb"])
            st.table(df_bowl2)
        with col2:
            # Match 2 batting and bowling tables
            inn1_team_2 = m2['innings'][0]['team_name']
            inn2_team_2 = m2['innings'][1]['team_name']
            st.markdown(f"**Batting – {inn1_team_2}**")
            df2_bat1 = pd.DataFrame(m2['innings'][0]['batting'], columns=["Batsman", "R", "B", "4s", "6s", "SR", "Dismissal"])
            st.table(df2_bat1)
            st.markdown(f"**Batting – {inn2_team_2}**")
            df2_bat2 = pd.DataFrame(m2['innings'][1]['batting'], columns=["Batsman", "R", "B", "4s", "6s", "SR", "Dismissal"])
            st.table(df2_bat2)
            st.markdown(f"**Bowling – {inn2_team_2}**")
            df2_bowl1 = pd.DataFrame(m2['innings'][0]['bowling'], columns=["Bowler", "O", "M", "R", "W", "Econ", "Wd", "Nb"])
            st.table(df2_bowl1)
            st.markdown(f"**Bowling – {inn1_team_2}**")
            df2_bowl2 = pd.DataFrame(m2['innings'][1]['bowling'], columns=["Bowler", "O", "M", "R", "W", "Econ", "Wd", "Nb"])
            st.table(df2_bowl2)

        # Over-wise Analysis with grouping filter
        st.header("Over-wise Analysis")
        grouping = st.selectbox("Group overs by", [1, 5, 10], index=1, help="Select over grouping for run summary")
        col1, col2 = st.columns(2)
        # Helper to prepare grouped runs for a match's innings
        def get_grouped_runs(runs_by_over, group):
            if not runs_by_over:
                return []
            total_overs = len(runs_by_over)
            grouped = []
            for start in range(0, total_overs, group):
                segment_runs = sum(runs_by_over[start:start+group])
                grouped.append(segment_runs)
            return grouped

        with col1:
            st.subheader(f"{m1['innings'][0]['team_name']} vs {m1['innings'][1]['team_name']}")
            if grouping == 1:
                # Plot cumulative run progression (worm chart) for each innings
                df_worm = pd.DataFrame({
                    m1['innings'][0]['team_name']: m1['innings'][0]['cum_runs'],
                    m1['innings'][1]['team_name']: m1['innings'][1]['cum_runs']
                })
                df_worm.index = list(range(1, len(df_worm) + 1))
                st.line_chart(df_worm) 
            else:
                # Plot runs scored in each grouped segment as a bar chart
                runs_grouped_1 = get_grouped_runs(m1['innings'][0]['runs_by_over'], grouping)
                runs_grouped_2 = get_grouped_runs(m1['innings'][1]['runs_by_over'], grouping)
                segments = [f"{i*grouping+1}-{min((i+1)*grouping, len(m1['innings'][0]['runs_by_over']))}" 
                            for i in range(len(runs_grouped_1))]
                df_seg = pd.DataFrame({
                    "Segment": segments,
                    m1['innings'][0]['team_name']: runs_grouped_1,
                    m1['innings'][1]['team_name']: runs_grouped_2
                })
                st.bar_chart(df_seg.set_index("Segment"))
        with col2:
            st.subheader(f"{m2['innings'][0]['team_name']} vs {m2['innings'][1]['team_name']}")
            if grouping == 1:
                df_worm2 = pd.DataFrame({
                    m2['innings'][0]['team_name']: m2['innings'][0]['cum_runs'],
                    m2['innings'][1]['team_name']: m2['innings'][1]['cum_runs']
                })
                df_worm2.index = list(range(1, len(df_worm2) + 1))
                st.line_chart(df_worm2)
            else:
                runs_grouped_1 = get_grouped_runs(m2['innings'][0]['runs_by_over'], grouping)
                runs_grouped_2 = get_grouped_runs(m2['innings'][1]['runs_by_over'], grouping)
                segments = [f"{i*grouping+1}-{min((i+1)*grouping, len(m2['innings'][0]['runs_by_over']))}" 
                            for i in range(len(runs_grouped_1))]
                df_seg2 = pd.DataFrame({
                    "Segment": segments,
                    m2['innings'][0]['team_name']: runs_grouped_1,
                    m2['innings'][1]['team_name']: runs_grouped_2
                })
                st.bar_chart(df_seg2.set_index("Segment"))

        # Fall of Wickets
        st.header("Fall of Wickets")
        col1, col2 = st.columns(2)
        with col1:
            st.subheader(f"{m1['innings'][0]['team_name']} Innings")
            for w in m1['innings'][0]['fall_of_wickets']:
                wicket_no, batsman, runs_at, over_at = w
                st.write(f"{wicket_no}-{runs_at} ({batsman}, {over_at} ov)")
            st.subheader(f"{m1['innings'][1]['team_name']} Innings")
            for w in m1['innings'][1]['fall_of_wickets']:
                wicket_no, batsman, runs_at, over_at = w
                st.write(f"{wicket_no}-{runs_at} ({batsman}, {over_at} ov)")
        with col2:
            st.subheader(f"{m2['innings'][0]['team_name']} Innings")
            for w in m2['innings'][0]['fall_of_wickets']:
                wicket_no, batsman, runs_at, over_at = w
                st.write(f"{wicket_no}-{runs_at} ({batsman}, {over_at} ov)")
            st.subheader(f"{m2['innings'][1]['team_name']} Innings")
            for w in m2['innings'][1]['fall_of_wickets']:
                wicket_no, batsman, runs_at, over_at = w
                st.write(f"{wicket_no}-{runs_at} ({batsman}, {over_at} ov)")

# ============= Players Comparison Mode =============
elif compare_mode == "Players":
    all_players = sorted(players_overall.keys())
    if not all_players:
        st.warning("No player data available.")
    else:
        player1 = st.sidebar.selectbox("Player 1", all_players, index=0)
        player2 = st.sidebar.selectbox("Player 2", all_players, index=1 if len(all_players) > 1 else 0)
        if player1 == player2:
            st.sidebar.warning("Select two different players for comparison.")
        # Show stats side by side
        st.header("Player Comparison")
        col1, col2 = st.columns(2)
        with col1:
            st.subheader(player1)
            stats1 = players_overall.get(player1, {})
            st.write(f"**Matches:** {stats1.get('matches', 0)}")
            st.write(f"**Runs:** {stats1.get('runs', 0)}")
            st.write(f"**Balls Faced:** {stats1.get('balls', 0)}")
            # Calculate strike rate if possible
            if stats1.get('balls', 0) > 0:
                sr1 = stats1['runs'] * 100.0 / stats1['balls']
                st.write(f"**Strike Rate:** {sr1:.2f}")
            else:
                st.write("**Strike Rate:** N/A")
            st.write(f"**Fours:** {stats1.get('fours', 0)}")
            st.write(f"**Sixes:** {stats1.get('sixes', 0)}")
            st.write(f"**Wickets:** {stats1.get('wickets', 0)}")
        with col2:
            st.subheader(player2)
            stats2 = players_overall.get(player2, {})
            st.write(f"**Matches:** {stats2.get('matches', 0)}")
            st.write(f"**Runs:** {stats2.get('runs', 0)}")
            st.write(f"**Balls Faced:** {stats2.get('balls', 0)}")
            if stats2.get('balls', 0) > 0:
                sr2 = stats2['runs'] * 100.0 / stats2['balls']
                st.write(f"**Strike Rate:** {sr2:.2f}")
            else:
                st.write("**Strike Rate:** N/A")
            st.write(f"**Fours:** {stats2.get('fours', 0)}")
            st.write(f"**Sixes:** {stats2.get('sixes', 0)}")
            st.write(f"**Wickets:** {stats2.get('wickets', 0)}")

# ============= Teams Comparison Mode =============
elif compare_mode == "Teams":
    team_names = sorted(teams_overall.keys())
    if not team_names:
        st.warning("No team data available.")
    else:
        team1 = st.sidebar.selectbox("Team 1", team_names, index=0)
        team2 = st.sidebar.selectbox("Team 2", team_names, index=1 if len(team_names) > 1 else 0)
        if team1 == team2:
            st.sidebar.warning("Select two different teams for comparison.")
        st.header("Team Comparison")
        col1, col2 = st.columns(2)
        team1_stats = teams_overall.get(team1, {})
        team2_stats = teams_overall.get(team2, {})
        with col1:
            st.subheader(team1)
            st.write(f"**Matches:** {team1_stats.get('matches', 0)}")
            st.write(f"**Wins:** {team1_stats.get('wins', 0)}")
            st.write(f"**Losses:** {team1_stats.get('losses', 0)}")
            st.write(f"**Runs Scored:** {team1_stats.get('runs_scored', 0)}")
            st.write(f"**Runs Conceded:** {team1_stats.get('runs_conceded', 0)}")
            st.write(f"**Wickets Taken:** {team1_stats.get('wickets_taken', 0)}")
            st.write(f"**Wickets Lost:** {team1_stats.get('wickets_lost', 0)}")
        with col2:
            st.subheader(team2)
            st.write(f"**Matches:** {team2_stats.get('matches', 0)}")
            st.write(f"**Wins:** {team2_stats.get('wins', 0)}")
            st.write(f"**Losses:** {team2_stats.get('losses', 0)}")
            st.write(f"**Runs Scored:** {team2_stats.get('runs_scored', 0)}")
            st.write(f"**Runs Conceded:** {team2_stats.get('runs_conceded', 0)}")
            st.write(f"**Wickets Taken:** {team2_stats.get('wickets_taken', 0)}")
            st.write(f"**Wickets Lost:** {team2_stats.get('wickets_lost', 0)}")
