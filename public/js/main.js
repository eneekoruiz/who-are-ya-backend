import { folder, leftArrow } from "./fragments.js";
import { fetchJSON } from "./loaders.js";
import { setupRows } from "./rows.js";
import { autocomplete } from "./autocomplete.js";

function differenceInDays(date1) {
    // YOUR CODE HERE
    const hoy = new Date();
    if(date1 > hoy){
        console.log("data txikixaua")
        return 0; 
    }
    const differenceInTime = hoy.getTime() - date1.getTime();
    console.log(differenceInTime);
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
}

let difference_In_Days = differenceInDays(new Date('01-10-2025')); //"01-10-2025"

window.onload = function () {
  document.getElementById("gamenumber").innerText = difference_In_Days.toString();
  document.getElementById("back-icon").innerHTML = folder + leftArrow;
  let status = localStorage.getItem("status") || 0
  console.log("Status: ", status);
  setupRows(game, status);
};

let game = {
  guesses: [],
  solution: {},
  players: [],
  leagues: []
};

function getSolution(players, solutionArray, difference_In_Days) {
    // YOUR CODE HERE
    let index = (difference_In_Days - 1) % solutionArray.length;
    //let index = Math.abs(difference_In_Days % solutionArray.length);

    console.log("Gaurko indizea"+ index);
    let solutionId = solutionArray[index];
    console.log("gaurko indizea"+solutionId);
    console.log(players);
    let son = players.find(player => player.id === Number(solutionId));

    if (!son) {
        console.log("Ez da aurkitu");
    } else {
        console.log("Aurkitu da:", son);
    }
    return son;
    //console.log(players.find(player => player.id === solutionId))
    //return players.find(player => player.id === solutionId);

}

Promise.all([fetchJSON("fullplayers25"), fetchJSON("solution25")]).then(
  (values) => {

    let solution;

    let rawGame = localStorage.getItem("game");
    let localGame = rawGame ? JSON.parse(rawGame) : null;

    let status=localStorage.getItem("satatus") || 0

    if (localGame !== null) {
      game=localGame;
    }

    [game.players, solution] = values;
    console.log("✅ Players:", game.players);
    console.log("✅ Solution array:", solution);
    let pastSol=game.solution;
    game.solution = getSolution(game.players, solution, difference_In_Days);
    if (pastSol.id !== game.solution.id) {
      game.guesses = [];
      localStorage.setItem("game", JSON.stringify(game));
      localStorage.setItem("status", 0) //Reset status to 0 (ongoing game)
      console.log("New day, guesses reset");
    }
    console.log("Solución del día:", game.solution);
    console.log("Guesses cargadas:", game.guesses);

    document.getElementById("mistery").src = `./images/players/${game.solution.id % 32}/${game.solution.id}.png`;
      // YOUR CODE HERE
      let addRow = setupRows( /* THIS NEEDS A PARAMETER */ game);
      // get myInput object...
      // when the user types a number an press the Enter key:
    const input = document.getElementById("myInput");
    autocomplete(input, game);
    
    input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const playerName = input.value;
        // inputa zenbaki bat dela egiaztatu
        
        const player = game.players.find(p => p.name === playerName);  
        if (!player) {
            alert(`Ez dago jokalaririk izen honekin: ${playerName}`);
        } else {
            addRow(player.id);
        }
      }
      
    }); 
  }
);
