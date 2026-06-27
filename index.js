
//implement on every page
function darkfunction() {
        var element = document.body;
        element.classList.toggle("dark-mode");
}



//fetching pokemon data functions 
async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
    }
}


function getpokemon(){
    var element = document.getElementById("search").value;
    return element;
}

async function searchPokemon() {
    const name = getpokemon();

    const pokemon = await fetchPokemonData(name);

    console.log(pokemon);
}

async function data() {
    const pokemon = await fetchPokemonData(getPokemon());
    console.log(pokemon);
}



    
