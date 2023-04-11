
const server = "http://127.0.0.1:7000";

async function sendLogin(username, password){
    const body = JSON.stringify({username,password});
    const result = await fetch(`${server}/login`,{method:"POST", body, headers:{"Content-type":"application/json"}, credentials:"include"});
    const responseBody = await result.json();
    
    return responseBody;
}

async function sendLogout() {
    const result = await fetch(`${server}/logout`, {method:"POST", credentials:"include"});
    return result;
}

async function sendUserUpdate(username, password, heightInches, weightLbs, profilePic, hideBiometrics) {
    const body = JSON.stringify({username, password, heightInches, weightLbs, profilePic, hideBiometrics});
    const result = await fetch(`${server}/users`, {method:"PUT", body, credentials:"include"});
    const responseBody = await result.json();

    return responseBody;
}

async function sendUserRegistration(username, password, heightInches, weightLbs, profilePic, hideBiometrics) {
    const body = JSON.stringify({username, password, heightInches, weightLbs, profilePic, hideBiometrics});
    const result = await fetch(`${server}/users`, {method:"POST", body, headers:{"Content-type":"application/json"}, credentials:"include"});
    const responseBody = await result.json();

    return responseBody;
}

async function retrieveAllUsers() {
    const result = await fetch(`${server}/users`, { credentials:"include" });
    const users = await result.json();
    return users;
}

async function demoteToPlayer(userId) {
    const result = await fetch(`${server}/users/${userId}/role`, {method:"PATCH", body: JSON.stringify({role: "player"}), headers:{"Content-type":"application/json"}, credentials:"include"})
    document.location.reload();
}

async function promoteToAdmin(userId) {
    const result = await fetch(`${server}/users/${userId}/role`, {method:"PATCH", body: JSON.stringify({role: "admin"}), headers:{"Content-type":"application/json"}, credentials:"include"})
    document.location.reload();
}

async function promoteToReferee(userId) {
    const result = await fetch(`${server}/users/${userId}/role`, {method:"PATCH", body: JSON.stringify({role: "referee"}), headers:{"Content-type":"application/json"}, credentials:"include"})
    document.location.reload();
}

async function sendTeamRegistration(name, captain, teamStatus, sport){
    const body = JSON.stringify({name,captain,teamStatus,sport});
    const result = await fetch(`${server}/teams`,{method:"POST", body, headers:{"Content-type":"application/json"}, credentials:"include"});
    return result.status === 204;
}

async function sendGame(game){
    const body = JSON.stringify(game);
    const result = await fetch(`${server}/games`,{method:"POST", body, headers:{"Content-type":"application/json"}, credentials:"include"});
    const savedGame = await result.json();
    return savedGame;
}

async function sendSeason(title) {
    const body = JSON.stringify({title});
    const result = await fetch(`${server}/seasons`,{method:"POST", body, headers:{"Content-type":"application/json"}, credentials:"include"})
    const savedSeason = await result.json();
    return savedSeason
}

async function retrieveAllVenues(){
    const result = await fetch(`${server}/venues`, { credentials:"include" });
    const venues = await result.json();
    return venues;
}

async function retrieveAllTeams(){
    const result = await fetch(`${server}/teams`, { credentials:"include" });
    const teams = await result.json();
    return teams;
}

async function retrieveTeamByTeamName(teamName) {
    const result = await fetch(`${server}/teams/${teamName}`, { credentials:"include" });
    const team = await result.json();
    return team;
}

async function retrieveUsersByTeamName(teamName) {
    const result = await fetch(`${server}/teams/${teamName}/users`, { credentials:"include" });
    const players = await result.json();
    return players;
}

async function retrieveAllSeasons(){
    const result = await fetch(`${server}/seasons`, { credentials:"include" });
    const seasons = await result.json();
    return seasons;
}

async function retrieveAllGames(){
    const result = await fetch(`${server}/games`, { credentials:"include" });
    const games = await result.json();
    return games;
}

async function retrieveRosterForTeam(teamName){
    const result = await fetch(`${server}/teams/${teamName}/users`, { credentials:"include" });
    const players = await result.json();
    return players;
}

async function retrieveStatsForPlayer(playerId = 0,sport =""){ // returns stats
    const result = await fetch(`${server}/playercards/${playerId}`, { credentials:"include" })
    const stats = await result.json();
    return stats;
}

async function retrieveTeamRequestsForPlayer(playerId) {
    const result = await fetch(`${server}/teamrequests?userId=${playerId}`, { credentials:"include" })
    const teamRequests = await result.json();
    return teamRequests;
}

async function retrieveTeamRequestsForTeam(teamName) {
    const result = await fetch(`${server}/teamrequests?team=${teamName}`, { credentials:"include" })
    const teamRequests = await result.json();
    return teamRequests;
}

async function addTeamRequestForPlayer(teamName, playerId) {
    let body = JSON.stringify({ requesterId: playerId, teamName});
    const result = await fetch(`${server}/teamrequests`, { method: "POST", body, headers:{"Content-type":"application/json"}, credentials:"include" });
    const addedTeamRequest = await result.json();
    return addedTeamRequest;
}


async function retrieveAllGamesAndReferees(){
    const result = await fetch(`${server}/referee-and-games-lookup`);
    const gamesAndReferees = await result.json();
    return gamesAndReferees;
}

async function refereeApplyToOfficiate(gameId, userId){
    const body = JSON.stringify({gameId,userId});
    const result = await fetch(`${server}/game-requests/apply`,{method:"POST", body, headers:{"Content-type":"application/json"}, credentials:"include"});
    return result.status === 201;
}

async function refereeRemoveOfficiate(gameId, userId){
    const body = JSON.stringify({gameId, userId});
    const result = await fetch(`${server}/game-requests/delete`,{method:"DELETE", body, headers:{"Content-type":"application/json"}, credentials:"include"});
    return result.status === 204;
}

async function sendApproveTeamRequest(requestId){
    const result = await fetch(`${server}/teamrequests/${requestId}/approve`,{method:"PATCH", credentials:"include"});
    return result.status === 200;
}

async function sendDenyTeamRequest(requestId){
    const result = await fetch(`${server}/teamrequests/${requestId}/deny`,{method:"PATCH", credentials:"include"});
    return result.status === 200;
}

async function sendAddOrUpdateBasketballStat(gameId, userId, teamName, points, fouls) {
    const body = JSON.stringify({ gameId, userId, teamName, points, fouls });
    const result = await fetch(`${server}/statbasketball`,{method:"POST", body, headers:{"Content-type":"application/json"}, credentials:"include"});
    return result.status === 200;
}

async function retrieveBasketballStatsByGameId(gameId) {
    const result = await fetch(`${server}/games/${gameId}/statbasketball`, { credentials: 'include' });
    const stats = await result.json();
    return stats;
}