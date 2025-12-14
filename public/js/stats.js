export {initState}
export {stats};
export {updateStats};
export {getStats};
export {successRate};

let initState = function(what, solutionId) {
    const stored = localStorage.getItem(what);
    let state;

    if (stored === null) {
        state = {
            solution: solutionId,
            guesses: []
        };
    } else {
        state = JSON.parse(stored);
    }

    const updateFunction = function(guess) {
        state.guesses.push(guess);
        localStorage.setItem(what, JSON.stringify(state));
    };


    return [state, updateFunction];
}

let successRate = function(e){
    if (e.totalGames === 0) {
        return 0;
    }
    return Math.round(((e.totalGames - e.gamesFailed) / e.totalGames) * 100);
}

let getStats = function (what){
    let gameStats = JSON.parse(localStorage.getItem(what)) || {
        totalGames: 0,
        currentStreak: 0,
        gamesFailed: 0,
        winDistribution: [0, 0, 0, 0, 0, 0, 0, 0],
        bestStreak: 0,
        successRate: 0
    };
    gameStats.successRate = successRate(gameStats);

    console.log('Stats obtenidos:', gameStats); 

    return gameStats;
}


function updateStats(t) {

    console.log('Antes:', localStorage.getItem('gameStats'));

    let gameStats = JSON.parse(localStorage.getItem('gameStats')) || {
        totalGames: 0,
        currentStreak: 0,
        gamesFailed: 0,
        winDistribution: [0, 0, 0, 0, 0, 0, 0, 0],
        bestStreak: 0,
        successRate: 0
    };

    gameStats.totalGames++;

    if (t >= 8) {
        // Ez da asmatu
        gameStats.gamesFailed++;
        gameStats.currentStreak = 0;
    } else {
        // Asmatu da
        gameStats.currentStreak++;
        gameStats.winDistribution[t - 1]++;

        if (gameStats.currentStreak > gameStats.bestStreak) {
            gameStats.bestStreak = gameStats.currentStreak;
        }
    }

    gameStats.successRate = successRate(gameStats);

    localStorage.setItem('gameStats', JSON.stringify(gameStats));
    console.log('Después:', localStorage.getItem('gameStats'));

}





const stats = function () {
    const gameStats = getStats("gameStats");
    const {totalGames, bestStreak, currentStreak, successRate, gamesFailed} = gameStats;
    const winDistribution = gameStats.winDistribution || [0, 0, 0, 0, 0, 0, 0, 0];

    let blocks = `<div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden sh
adow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 dark:bg-gray-800"><div class="absolute right-4 top-4" id="closedialog"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" class="h-6 w-6 cursor-pointer dark:stroke-white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><div class="text-center"><h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" id="headlessui-dialog-title-7">Statistics</h3><div class="mt-2"><div class="flex justify-center my-2"><div class="items-center justify-center m-1 w-1/4 dark:text-white"><div class="text-3xl font-bold">${totalGames}</div><div class="text-xs">Total tries</div></div><div class="items-center justify-center m-1 w-1/4 dark:text-white"><div class="text-3xl font-bold">${successRate}%</div><div class="text-xs">Success rate</div></div><div class="items-center justify-center m-1 w-1/4 dark:text-white"><div class="text-3xl font-bold">${currentStreak}</div><div class="text-xs">Current streak</div></div><div class="items-center justify-center m-1 w-1/4 dark:text-white"><div class="text-3xl font-bold">${bestStreak}</div><div class="text-xs">Best streak</div></div></div>
<h4 class="cursor-pointer text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" id="showHide">Show Guess Distribution</h4><div class="columns-1 justify-left m-2 text-sm dark:text-white">`
    console.log(winDistribution);
    let sum = winDistribution.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
    });

    blocks += "<div id='guesscontainer' style='display:none'>"
    for(let i=1; i<=8; i++){
        blocks += `<div class="flex justify-left m-1">
                        <div class="items-center justify-center w-2">${i}</div>
                        <div class="rounded-full w-full ml-2">
                            <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 rounded-l-full" style="width: ${Math.ceil(winDistribution[i] / sum * 100) }%;">
                                ${winDistribution[i]}
                            </div>
                        </div>
                    </div>`
    }
    blocks += "</div>"

    blocks += `<div class="mt-2 justify-center items-center space-x-2 dark:text-white">
                    <div>
                        <h5>New footballer:</h5>
                        <span class="text-lg font-medium text-gray-900 dark:text-gray-100" id="nextPlayer"></span>
                    </div>
                   <!-- <button type="button" class="rounded-md border border-transparent shadow-sm px-4 pt-1 pb-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm" tabindex="0"><span class="block text-2xl tracking-wide font-bold leading-7">Share</span>
                   <span class="block text-xs tracking-tight font-light">#HashTag</span></button> -->
               </div>
               <div class="mt-3">
               </div>
               <div class="dark:text-white">
                   <div class="text-lg font-extrabold text-[#b837c6] dark:text-[#ceff27]" style="color: #ceff27">Web Sistemak</div>
                   <div class="text-sm">2025/2026 ikasturteko praktika</div>
               </div>               
               </div></div></div></div>`

    return blocks
}



