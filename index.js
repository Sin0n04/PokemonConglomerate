//color table
const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};



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
    pkinfo.innerHTML = ""; 
    pkinfo.innerHTML = `<img src="" id="pkSprite">`;// Clear previous content
    
    const pokemonjson = await getPokemon();
    const box = document.getElementById("pkinfo");

    //get values
    const name = document.createElement("h2");
    name.textContent = pokemonjson.forms[0].name;



    //get elements

    //get types
    let types = pokemonjson.types;
    let typelist = document.createElement("ul");
    typelist.id = "pkTypes";


    types.forEach(type => {
        const li = document.createElement("li");
        li.textContent = type.type.name;
        switch (type.type.name){
            case "normal":
                li.style.backgroundColor = colours.normal;
                break;
            case "fighting":
                li.style.backgroundColor = colours.fighting;
                break;
            case "flying":
                li.style.backgroundColor = colours.flying;
                break;

            case "poison":
                li.style.backgroundColor = colours.poison;
                break;
            case "ground":
                li.style.backgroundColor = colours.ground;
                break;

            case "rock":
                li.style.backgroundColor = colours.rock;
                break;


            case "bug":
                li.style.backgroundColor = colours.bug;
                break;


            case "ghost":
                li.style.backgroundColor = colours.ghost;
                break;


            case "steel":
                li.style.backgroundColor = colours.steel;
                break;


            case "fire":
                li.style.backgroundColor = colours.fire;
                break;


            case  "water":
                li.style.backgroundColor = colours.water;
                break;


            case "grass":
                li.style.backgroundColor = colours.grass;
                break;


            case "electric":
                li.style.backgroundColor = colours.electric;
                break;


            case "psychic":
                li.style.backgroundColor = colours.psychic;
                break;


            case "ice":
                li.style.backgroundColor = colours.ice;
                break;


            case "dragon":
                li.style.backgroundColor = colours.dragon;
                break;


            case "dark":
                li.style.backgroundColor = colours.dark;
                break;


            case "fairy":
                li.style.backgroundColor = colours.fairy;
                break;


            case "stellar":
                li.style.backgroundColor = colours.steel;
                break;

        }
        typelist.appendChild(li);
    });

    //get stats

    let stats = pokemonjson.stats;
    let statslist = document.createElement("table");

    stats.forEach(stat => {
        const tr = document.createElement("tr");

        const statName = document.createElement("td");
        statName.textContent = stat.stat.name;
        statName.style.fontFamily = "Consolas, Monaco, 'Courier New', monospace";

        const statValue = document.createElement("td");
        statValue.textContent = stat.base_stat;

        tr.appendChild(statName);
        tr.appendChild(statValue);

        statslist.appendChild(tr);
    });

    //get weight
    let id  = pokemonjson.id;
    let idelement = document.createElement("span");
    idelement.textContent = id;

    //get sprite
    const spriteUrl = pokemonjson.sprites.front_default;
    document.getElementById("pkSprite").src = spriteUrl;


   console.log(pokemonjson.sprites);
    //add everything to the box
    box.appendChild(name);
    box.appendChild(statslist);
    box.appendChild(typelist);
    box.appendChild(idelement);

    //style the element....
    box.classList.add("visible");
}

//create event
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchButton")
        .addEventListener("click", pokemonElement);
});

    
