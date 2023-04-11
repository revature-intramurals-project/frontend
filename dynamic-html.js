function gameTableRowHTML(game){
    const {gameStart,venueTitle,homeTeam,awayTeam,outcome} = game;
    const gameDate = new Date(gameStart*1000);
    return`<tr>
        <td>${game.gameId}</td>
        <td>${gameDate.toLocaleDateString()}</td>
        <td>${gameDate.toLocaleTimeString()}</td>
        <td>${venueTitle}</td><td>${homeTeam}</td>
        <td>${awayTeam}</td><td>${outcome}</td>
        <td>${game.homeTeamScore}</td>
        <td>${game.homeTeamFouls}</td>
        <td>${game.awayTeamScore}</td>
        <td>${game.awayTeamFouls}</td>
        ${game.refereeIds ? `<td><button onclick="showRefereesForGame(${JSON.stringify(game.refereeIds)})">Show Referees</button></td>`: ''}
    </tr>`
}

function officiateGameTableRowHTML(game) {
    const {gameStart,venueTitle,homeTeam,awayTeam,outcome} = game;
    const gameDate = new Date(gameStart*1000);
    return`<tr>
        <td>${game.gameId}</td>
        <td>${gameDate.toLocaleDateString()}</td>
        <td>${gameDate.toLocaleTimeString()}</td>
        <td>${venueTitle}</td><td>${homeTeam}</td>
        <td>${awayTeam}</td><td>${outcome}</td>
        <td><button onclick="renderPlayerLists(${game.gameId}, '${homeTeam}', '${awayTeam}')">Update Scores</button></td>
    </tr>`
}

function venueTableRowHTML(venue) {
    const {title} = venue;
    return `<tr><td>${title}</td></tr>`
}

function seasonTableRowHTML(season) {
    const {title} = season;
    return `<tr><td>${title}</td></tr>`
}

function gamesAndRefereeTableRowHTML(gamesAndReferee) {
    const {gameRequestId,gameId,userId,venue,season} = gamesAndReferee;
    return`<tr>
        <td>${gameRequestId}</td><td>${gameId}</td>
        <td>${userId}</td><td>${venue}</td><td>${season}</td>
    </tr>`
}

function userTableRowHTML(user) {
    const { userId, username, role } = user;
    return `<tr><td>${userId}</td><td>${username}</td><td>${role}</td>
        ${role === 'player' ? `<td><button onclick="promoteToAdmin(${userId})">Promote To Admin</button></td><td><button onclick="promoteToReferee(${userId})">Promote To Referee</button</td>` : `<td><button onclick="demoteToPlayer(${userId})">Demote To Player</button></td>`}
        </tr>`
}

function optionHTML(title,value){
    return `<option value="${value}">${title}</option>`
}

function teamApplicationTableRowHTML(team) {
    return (
    `<tr>
        <td>${team.name}</td>
        <td>${team.sport}</td>
        <td>${team.teamStatus}</td>
        <td>${team.applicationStatus}</td>
        <td><button onclick="showCaptainInfo('${team.name}', ${team.captain})">See The Captain</button></td>
    </tr>`);
}

async function showCaptainInfo(teamName, id) {
    let body = document.getElementsByTagName('body')[0];

    let stats = await retrieveStatsForPlayer(id);

    removePlayerOrCaptainInfo();

    let captainInfoSection = (
        `<section>
            <button onclick="removePlayerOrCaptainInfo()">Close</button>
            <h2>${teamName}'s Captain</h2>
            <p>Player Id: ${stats.id}</p>
            <p>Username: ${stats.username}</p>
            ${stats.hideBiometrics === false ? `<p>Height (inches): ${stats.heightInches}</p> <p>Weight (lbs): ${stats.weightLbs}</p>` : '<p><strong>The Captain has chosen not to show biometric information</strong></p>'}
            ${stats.profilePic != 'none' ? `<img src="${stats.profilePic}" />` : '<p><strong>The Captain has no profile picture</strong></p>'}
        </section>`
    );

    body.innerHTML += captainInfoSection;
}

function teamMemberTableRowHTML(team, member) {
    return `<tr><td>${member.userId}</td><td>${member.username}</td><td>${team.captain === member.userId ? 'Captain' : 'Player'}</td><td><button onclick="${team.captain === member.userId ? `showCaptainInfo('${team.name}', ${member.userId})` : `showPlayerInfo(${member.userId})`}">See The Player</button></td></tr>`
}

async function showPlayerInfo(id) {
    let body = document.getElementsByTagName('body')[0];

    let stats = await retrieveStatsForPlayer(id);

    removePlayerOrCaptainInfo();

    let playerInfoSection = (
        `<section>
            <button onclick="removePlayerOrCaptainInfo()">Close</button>
            <p>Player Id: ${stats.id}</p>
            <p>Username: ${stats.username}</p>
            ${stats.hideBiometrics === false ? `<p>Height (inches): ${stats.heightInches}</p> <p>Weight (lbs): ${stats.weightLbs}</p>` : '<p><strong>Player has chosen not to show biometric information</strong></p>'}
            ${stats.profilePic != 'none' ? `<img src="${stats.profilePic}" />` : '<p><strong>Player has no profile picture</strong></p>'}
        </section>`
    );

    body.innerHTML += playerInfoSection;
}

async function showRefereeInfo(id) {
    let body = document.getElementsByTagName('body')[0];

    let stats = await retrieveStatsForPlayer(id);

    let playerInfoSection = (
        `<section>
            <p>Referee Id: ${stats.id}</p>
            <p>Username: ${stats.username}</p>
            ${stats.hideBiometrics === false ? `<p>Height (inches): ${stats.heightInches}</p> <p>Weight (lbs): ${stats.weightLbs}</p>` : '<p><strong>Referee has chosen not to show biometric information</strong></p>'}
            ${stats.profilePic != 'none' ? `<img src="${stats.profilePic}" />` : '<p><strong>Referee has no profile picture</strong></p>'}
        </section>`
    );

    body.innerHTML += playerInfoSection;
}


function removePlayerOrCaptainInfo() {
    if (document.getElementsByTagName('section').length > 0) {
        let captainInfo = document.getElementsByTagName('section')[0];

        if (captainInfo) {
            captainInfo.parentNode.removeChild(captainInfo);
        }
    }
}

function teamApplyOptions(teams) {
    let applyMenu = `
            <select>
                ${(function() {
                    let result = "";
                    for (team of teams) {
                        result += optionHTML(team.name, team.name);
                    }
                    return result;
                })()}
            </select>
            <button onclick=applyForTeam(document.getElementsByTagName('select')[0].value)>Apply</button>
        `;
    
    return applyMenu;
}

function changePasswordInputType() {
    if (passwordInput.getAttribute("type") === "password") {
        passwordInput.setAttribute("type", "text");
    } else {
        passwordInput.setAttribute("type", "password");
    }
}

function teamRequestTableRowHTML(teamRequest) {
    console.log(teamRequest);
    return `<tr><td>${teamRequest.teamRequestId}</td><td>${teamRequest.requesterId}</td><td>${teamRequest.teamRequestStatus}</td>${teamRequest.teamRequestStatus === 'pending' ? `<td><button onclick="approveTeamRequest(${teamRequest.teamRequestId})">Approve</button></td><td><button onclick="denyTeamRequest(${teamRequest.teamRequestId})">Deny</button></td><td><button onclick="showPlayerInfo(${teamRequest.requesterId})">See The Player</button></td>` : `<td><button onclick="showPlayerInfo(${teamRequest.requesterId})">See The Player</button></td>`}</tr>`
}
