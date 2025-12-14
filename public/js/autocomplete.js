import {setupRows} from "./rows.js";



export {autocomplete}

function autocomplete(inp, game) {

    /* Kendu in dut localstoragerekin duplikatuak ez agertzeko
    let addRow = setupRows(game);
    */
    function filterPlayers(searchText) {
        if (!searchText) return [];

        const upperSearch = searchText.toUpperCase();

        // Primero: jugadores que empiezan con el texto buscado
        const startsWithMatches = game.players.filter(player => {
            return player.name.toUpperCase().startsWith(upperSearch);
        });

        // Segundo: jugadores que contienen el texto (pero no al inicio)
        const containsMatches = game.players.filter(player => {
            const result = parse(player.name, searchText);
            return result !== null && !player.name.toUpperCase().startsWith(upperSearch);
        });

        // Combinar: primero los que empiezan, luego los que contienen
        return [...startsWithMatches, ...containsMatches].slice(0, 10);
    }

    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        let a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -2;

        const filteredPlayers = filterPlayers(val);

        // Si no hay resultados, no crear la lista
        if (filteredPlayers.length === 0) {
            return false;
        }

        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < filteredPlayers.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            //if ( /* YOUR CODE HERE */ val.toUpperCase() === players[i].name.toUpperCase().substr(0, val.length)) {

            b = document.createElement("DIV");
            b.classList.add('flex', 'items-start', 'gap-x-3', 'leading-tight', 'uppercase', 'text-sm');
            b.innerHTML = `<img src="https://cdn.sportmonks.com/images/soccer/teams/${filteredPlayers[i].teamId % 32}/${filteredPlayers[i].teamId}.png"  width="28" height="28">`;
            const result = parse(filteredPlayers[i].name, val);

            /*make the matching letters bold:*/
            /*make the matching letters bold:*/
            b.innerHTML += `<div class='self-center'>
                    <span>${result.before}</span><span class='font-bold'>${result.match}</span><span>${result.after}</span>
                    <input type='hidden' name='name' value='${filteredPlayers[i].name}'>
                    <input type='hidden' name='id' value='${filteredPlayers[i].id}'>
                </div>`;

            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function (e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;

                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();


            });

            /* (Tab selection handled on the input element) */
            a.appendChild(b);
        }
    });

    inp.addEventListener("keydown", function (e) {
        // If Tab pressed and suggestion list open, pick first suggestion
        if (e.key === "Tab" || e.keyCode === 9) {
            let list = document.getElementById(this.id + "autocomplete-list");
            if (list) {
                let items = list.getElementsByTagName("div");
                if (items && items.length > 0) {
                    e.preventDefault();
                    let first = items[0];
                    let hidden = first.getElementsByTagName("input")[0];
                    if (hidden) inp.value = hidden.value;
                    closeAllLists();
                    return;
                }
            }
        }

        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus += 2;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus -= 2;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    // players.find ( p => { return p.id == 47323 })

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active", "bg-slate-200", "pointer");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active", "bg-slate-200", "pointer");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}



