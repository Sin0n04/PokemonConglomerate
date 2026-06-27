import {searchPokemon} from "./index.js";

class Pokemom{
    constructor(name){
        const pk = searchPokemon(name);
        this.name = pk.forms[0];
    }
}

console.log(new Pokemom("bulbasaur"));
