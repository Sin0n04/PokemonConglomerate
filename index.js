
//implement on every page
function darkfunction() {
        let element = document.body;
        element.classList.toggle("dark-mode");
}



//fetching pokemon data functions 
async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName);
        return await response.json();
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
    }
}


function getpokemonName(){
    return document.getElementById("search").value;
}

async function getPokemon() {
    const name = getpokemonName();

    return fetchPokemonData(name);//ACTUAL POKEMON DATA
}

//function to create element?? brb
async function pokemonElement(pokemon) {
    console.log("pokemonElement called");
    const pkinfo = document.getElementById("pkinfo");
    pkinfo.innerHTML = ""; // Clear previous result

    const pokemonjson = await getPokemon();
    const box = document.getElementById("pkinfo");

    //get values
    const name = document.createElement("h2");
    name.textContent = pokemonjson.forms[0].name;



    //get elements

    //get types
    let types = pokemonjson.types;
    let typelist = document.createElement("ul");


    types.forEach(type => {
        const li = document.createElement("li");
        li.textContent = type.type.name;
        typelist.appendChild(li);
    });

    //get stats

    let stats = pokemonjson.stats;
    let statslist = document.createElement("table");

    stats.forEach(stat => {
        const tr = document.createElement("tr");

        const statName = document.createElement("td");
        statName.textContent = stat.stat.name;

        const statValue = document.createElement("td");
        statValue.textContent = stat.base_stat;

        tr.appendChild(statName);
        tr.appendChild(statValue);

        statslist.appendChild(tr);
    });

    //get weight
    let weight  = pokemonjson.weight;
    let weightelemnt = document.createElement("span");
    weightelemnt.textContent = weight;

    //add everything to the box
    box.appendChild(weightelemnt);
    box.appendChild(statslist);
    box.appendChild(typelist);
    box.appendChild(name);

    //style the element....
    box.classList.add("visible");
}

//create event
document.getElementById("searchButton").addEventListener("click", pokemonElement);


    
