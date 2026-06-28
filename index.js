
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


function getpokemon(){
    return document.getElementById("search").value;
}

async function searchPokemon() {
    const name = getpokemon();

    return await fetchPokemonData(name);
}


    
