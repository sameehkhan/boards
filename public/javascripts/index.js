import NBA from 'nba';

document.addEventListener('DOMContentLoaded', () => {

    
    // console.log(Object.getOwnPropertyNames(NBA));
    // console.log(NBA.stats.all);
    // console.log(NBA.prototypes)

    // console.log(Object.getOwnPropertyNames(NBA).filter(function (p) {
    //     return typeof NBA[p] === 'function';
    // }));

    let lakers = NBA.teamIdFromName('Los Angeles Lakers')
    console.log(lakers)

    let lebron = NBA.playerIdFromName('Lebron James')

    // let search = NBA.searchPlayers('james')
    // console.log(search);

    // NBA.stats.teamInfoCommon({ TeamID: lakers }).then(console.log);
    // NBA.stats.playerClutch({ PlayerID: lebron }).then(console.log);

    // let per = "PerGame"

    // NBA.stats.team_clutch({TeamID: lakers}).then(console.log);
    // NBA.stats.playerShooting().then(console.log);
    // NBA.stats.teamShooting().then(console.log);
    NBA.stats.measureType().then(console.log);



    // TEAMS

    // teamShooting()
    // teamSplits
    // commonInfo 

    // PLAYERS
    // playerSplits
    // player shooting is not what you think
    // playerStats

    // NOT WORKING
    // playerClutch



    // 0: "teamIdFromName"
    // 1: "playerIdFromName"
    // 2: "findPlayer" Returns first player with name match (first in array of James' i.e.)
    // 3: "searchPlayers"  You can search by player's name
    // 4: "updatePlayers" idk 
    // 5: "updateTeams" idk 

    
})
