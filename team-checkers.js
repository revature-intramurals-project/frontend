async function playerHasPendingTeamRequest(playerId) {
    let teamRequests = await retrieveTeamRequestsForPlayer(playerId);
    let teamRequestMap = {}
    for (teamRequest of teamRequests) {
        teamRequestMap[teamRequest.teamName] = { teamRequestStatus: teamRequest.teamRequestStatus };
    }

    for (key in teamRequestMap) {
        if (teamRequestMap[key].teamRequestStatus === 'pending') {
            return true;
        }
    }

    return false;
}

async function getUnappliedTeamsOfPlayer(playerId) {
    let teams = await retrieveAllTeams();
    let teamRequests = await retrieveTeamRequestsForPlayer(playerId);
    let teamRequestsMap = {}
    for (teamRequest of teamRequests) {
        teamRequestsMap[teamRequest.teamName] = teamRequest
    }

    teams = teams.filter(t => !(t.name in teamRequestsMap))
    
    return teams;
}

async function getTeamOfUser(playerId) {
    // See if they're a regular player that is part of a team (accepted Team Request)
    let teamRequests = await retrieveTeamRequestsForPlayer(playerId);
    let teamRequestMap = {}
    for (teamRequest of teamRequests) {
        teamRequestMap[teamRequest.teamName] = { teamRequestStatus: teamRequest.teamRequestStatus };
    }

    for (key in teamRequestMap) {
        if (teamRequestMap[key].teamRequestStatus === 'accepted') {
            return await retrieveTeamByTeamName(key);
        }
    }

    // Retrieve team of captain
    let teams = await retrieveAllTeams()
    for (team of teams) {
        if (playerId === team.captain) {
            return team;
        }
    }

    return null;
}