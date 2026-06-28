
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
    const pokemonjson = await getPokemon();
    const box = document.getElementById("pkinfo");

    //get values
    const name = document.createElement("h2");
    name.textContent = pokemon.forms[0].name;



    //create elements


    //style the element....
}


    
