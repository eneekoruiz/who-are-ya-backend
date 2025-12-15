// YOUR CODE HERE :
// .... stringToHTML ....
// .... setupRows .....
import { stringToHTML } from "./fragments.js";
import { higher } from "./fragments.js";   
import { lower } from "./fragments.js";
import { initState } from "./stats.js";
import { showStats } from "./fragments.js";
import { updateStats } from "./stats.js";
import { getStats } from "./stats.js";

const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate', 'number']


let setupRows = function (game, status) {
    let [state, updateState] = initState('WAYgameState', game.solution.id)


    function leagueToFlag(leagueId) {
        // YOUR CODE HERE
        const ligaMap = {
            564: 'es1',
            8: 'en1',
            82: 'de1',
            384: 'it1',
            301: 'fr1'
        };

        return ligaMap[leagueId] || null;
    }


    function getAge(dateString) {
        // YOUR CODE HERE
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;

    }

    let check = function(theKey, theValue) {
        const balioa = game.solution[theKey];

        if (theKey === "birthdate") {
            const gaur = new Date();
            const jaiotzeData = new Date(balioa);
            const sartutakoData = new Date(theValue);

            let adinaSoluzioa = gaur.getFullYear() - jaiotzeData.getFullYear();
            if (gaur.getMonth() < jaiotzeData.getMonth() ||
                (gaur.getMonth() === jaiotzeData.getMonth() && gaur.getDate() < jaiotzeData.getDate())) {
                adinaSoluzioa--;
            }

            let adinaSartu = gaur.getFullYear() - sartutakoData.getFullYear();
            if (gaur.getMonth() < sartutakoData.getMonth() ||
                (gaur.getMonth() === sartutakoData.getMonth() && gaur.getDate() < sartutakoData.getDate())) {
                adinaSartu--;
            }

            if (adinaSartu === adinaSoluzioa) return "correct";
            // if guessed age is less than solution age, indicate solution is higher
            else if (adinaSartu < adinaSoluzioa) return "higher";
            else return "lower";
        }

        if (theKey === "number") {
            const solNum = Number(balioa);
            const valNum = Number(theValue);
            if (!Number.isFinite(solNum) || !Number.isFinite(valNum)) return "incorrect";
            if (valNum === solNum) return "correct";
            // if guessed number is less than solution number, the solution is higher
            return valNum < solNum ? "higher" : "lower";
        }

        if (balioa === theValue) return "correct";
        return "incorrect";
    };

    function unblur(outcome) {
        return new Promise( (resolve, reject) =>  {
            setTimeout(() => {
                document.getElementById("mistery").classList.remove("hue-rotate-180", "blur")
                document.getElementById("combobox").remove()
                let color, text
                if (outcome=='success'){
                    color =  "bg-blue-500"
                    text = "Awesome"
                } else {
                    color =  "bg-rose-500"
                    text = "The player was " + game.solution.name
                }
                document.getElementById("picbox").innerHTML += `<div class="animate-pulse fixed z-20 top-14 left-1/2 transform -translate-x-1/2 max-w-sm shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${color} text-white"><div class="p-4"><p class="text-sm text-center font-medium">${text}</p></div></div>`
                resolve();
            }, "2000")
        })
    }

    function setContent(guess) {
        return [
            `<img src="./images/flags/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
            `<img src="./images/leagues/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
            `<img src="./images/players/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
            `${guess.position}`,
            `${getAge(guess.birthdate)}`,
            `<span style="white-space: nowrap; font-size: 1rem;">#${guess.number}</span>`
        ]
    }



    function showContent(content, guess) {
        let fragments = '', s = '';
        // calculate flexible width so any number of items (e.g. 6) fits in one row
        const widthPercent = (100 / content.length).toFixed(4) + '%';
        for (let j = 0; j < content.length; j++) {
            s = "".concat(((j + 1) * delay).toString(), "ms")
            fragments += `<div class="shrink-0 flex justify-center" style="flex: 0 0 ${widthPercent};">
                            <div class="mx-1 overflow-hidden w-full max-w-2 shadowed font-bold text-xl flex aspect-square rounded-full justify-center items-center bg-slate-400 text-white ${check(attribs[j], guess[attribs[j]]) == 'correct' ? 'bg-green-500' : ''} opacity-0 fadeInDown" style="max-width: 60px; animation-delay: ${s};">
                                ${content[j]}
                                ${check(attribs[j], guess[attribs[j]]) == 'higher' ? higher : ''}
                                ${check(attribs[j], guess[attribs[j]]) == 'lower' ? lower : ''}
                            </div>
                         </div>`
        }

        let child = `<div class="flex w-full flex-wrap text-l py-2">
                        <div class=" w-full grow text-center pb-2">
                            <div class="mx-1 overflow-hidden h-full flex items-center justify-center sm:text-right px-4 uppercase font-bold text-lg opacity-0 fadeInDown " style="animation-delay: 0ms;">
                                ${guess.name}
                            </div>
                        </div>
                        ${fragments}`

        let playersNode = document.getElementById('players')
        playersNode.prepend(stringToHTML(child))
    }

    let getPlayer = function (playerId) {
        // YOUR CODE HERE
        return  game.players.find(p=> p.id === Number(playerId));

    }

    function resetInput(){
        let input = document.getElementById('myInput');
        input.value = '';
        input.placeholder = `Guess ${game.guesses.length + 1} of 8`;
    }

    function gameEnded(lastGuess){
        if (lastGuess == game.solution.id) {
            return true;
        }

        if (game.guesses.length >= 8) {
            return true;
        }

        return false;
    }

    function success() {
        unblur('success');
        showStats();
        localStorage.setItem("status", 1)
    }

    function gameOver() {
        unblur('failure');
        showStats();
        localStorage.setItem("status", 2)
    }
        
    if (status==1) {
        success();
    }

    if (status==2)  {
        gameOver();
    }


    resetInput();

    (function renderStoredGuesses(){
        if (!Array.isArray(game.guesses)) return;
        console.log("Es esto lo que se duplica?", game.guesses);
        console.log("Soluzioak", game.solution);
        console.log("Renderizando guesses almacenadas:", game.guesses.length);
        game.guesses.forEach(gid => {
            const idNum = Number(gid);
            const prevGuess = getPlayer(idNum);
            if (!prevGuess) return;
            const content = setContent(prevGuess);
            showContent(content, prevGuess);
        });
    })();

    return /* addRow */ function (playerId) {

        // If nothing stored yet, initialize the structure
        
        let guess = getPlayer(playerId)
        console.log(guess)

        console.log("Guesses", game.guesses)

        let content = setContent(guess)

        game.guesses.push(playerId)


        updateState(playerId)

        resetInput();

        if (gameEnded(playerId)) {
            updateStats(game.guesses.length);

            if (playerId == game.solution.id) {
                success();
            }

            if (game.guesses.length == 8)  {
                gameOver();
            }
        }

        showContent(content, guess)
        
        localStorage.setItem("game", JSON.stringify(game))
    }
}

function calculateTimeUntilMidnight() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Siguiente medianoche

    const diff = midnight - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
}

export { setupRows };
export {calculateTimeUntilMidnight};