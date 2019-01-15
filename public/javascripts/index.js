import NBA from 'nba';
import barchart from './barchart';
import scatterplot from './scatterplot';
import scatterplot2 from './scatterplot2';
document.addEventListener('DOMContentLoaded', () => {

    //colorbrewer.org 
    console.dir()
    barchart();
    scatterplot2();
    scatterplot();


    // console.log(Object.getOwnPropertyNames(NBA));
    // console.log(NBA.stats.all);
    // console.log(NBA.prototypes)

    // console.log(Object.getOwnPropertyNames(NBA).filter(function (p) {
    //     return typeof NBA[p] === 'function';
    // }));

    // let lebron = NBA.playerIdFromName('Lebron James');
    // NBA.stats.playerInfo({ PlayerID: lebron }).then(console.log);




    // NBA.stats.teamStats().then(console.log)
    // Scatterplot with wRank and fg3mRank
    
    // NBA.stats.teamSplits({TeamID: 1610612744}).then(console.log)
    // Warriors team splits maybe do others as well? dropdown?

    // NBA.stats.playerSplits({PlayerID: lebron}).then(console.log)


    // NBA.stats.teamStats().then(console.log) // doesn't work
    // NBA.stats.playerStats().then(console.log) // doesn't work

    console.dir(NBA.stats.teamStats())
    console.dir(NBA)
    console.dir(NBA.sportVu)

    // NBA.sportVu.touches().then(console.log)
})  

