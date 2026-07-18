
  console.log("index.js loaded");  //Maps table
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

const pokeValues = {
    poke: 200 ,
    great: 255 ,
    master: -1
}

  const statValue = {
      Paralysis: 12,
      Poison: 12,
      Freeze: 25,
      Burn: 12,
      Sleep: 25,
      None:0,
  }




//implement on every page
function darkfunction() {
        let element = document.body;
        element.classList.toggle("dark-mode");
}




  
async function pokemonrateElement() {
    const pokemonjson = await getPokemon();
    const box = document.getElementById("pokelist") ;
    box.innerHTML = "";
    let pokeball = document.createElement("ul");
    pokeball.setAttribute("id", "pokeball");


    for (let i = 0; i < 3; i++) {
        let pokename = document.createElement("li");
        let pokebutton = document.createElement("button");
        pokebutton.addEventListener("click", () => pokeballValue(pokebutton));

        let pokeimage = document.createElement("img");
        switch (i) {
            case 1:
                pokebutton.setAttribute("id", "great");
                pokeimage.setAttribute("src", "../assets/great.png");
                pokebutton.appendChild(pokeimage);
                break;
            case 2:
                pokebutton.setAttribute("id", "Master");
                pokeimage.setAttribute("src", "../assets/master.png");
                pokebutton.appendChild(pokeimage);
                break;
            default:
                pokebutton.setAttribute("id", "poke");
                pokeimage.src = "../assets/poke.png";
                pokebutton.appendChild(pokeimage);
                break;
        }

        pokename.appendChild(pokebutton);
        pokeball.appendChild(pokename);
    }

    box.appendChild(pokeball);
    box.classList.add("visible")
}

async function pokeballValue(button){
    let pokeball = button.id;
    let value = "";
    switch(pokeball){
        case "poke":
            value = pokeValues.poke;
            break;
        case "great":
            value = pokeValues.great;
            break;
        case "Master":
            value = pokeValues.master;
            break;
    }
    

     await statusCondition(value);

}



  async function statusCondition(value) {
      const box = document.getElementById("statuslist");
      const statcondlist = await getstatusdata();

      box.innerHTML = "";

      const div = document.createElement("div");
      div.classList.toggle("center-box");

      const title = document.createElement("h2");
      title.textContent = "Status Conditions";
      div.appendChild(title);

      box.appendChild(div);

      const ul = document.createElement("ul");

      const results = statcondlist.results;

      for (let i = 2; i < 7; i++) {
          const cond = results[i];

          const li = document.createElement("li");
          const button = document.createElement("button");
          button.id = cond.name;
          button.addEventListener("click", () => {
              maxMinHealth(value, cond.name)
              button.classList.add("active");
          });

          button.textContent = cond.name;

          li.appendChild(button);
          ul.appendChild(li);
      }
      const lit = document.createElement("li");
      const buttont = document.createElement("button");
      buttont.id = "none";
      buttont.addEventListener("click", () => maxMinHealth(value, "None"));
      buttont.textContent = "None";
      lit.appendChild(buttont);
      ul.appendChild(lit);
      box.appendChild(ul);
      box.classList.add("visible");
  }

  async function maxMinHealth(pokeballIntvalue, statusName) {
      let statusValue = 0;

      switch (statusName) {
          case "Paralysis":
          case "Poison":
          case "Burn":
              statusValue = statValue.Poison;
              break;

          case "Freeze":
          case "Sleep":
              statusValue = statValue.Freeze;
              break;

          default:
              statusValue = statValue.None;
      }

      const box = document.getElementById("healthbox");
      box.innerHTML = "";

      const healthUl = document.createElement("ul");
      const currLi = document.createElement("li");

      const form = document.createElement("form");
      form.className = "search-container";
      form.id = "currentHpForm";

      const submit = document.createElement("button");
      submit.type = "submit";
      submit.textContent = "Calculate";

      const currHpInput = document.createElement("input");
      currHpInput.type = "number";
      currHpInput.placeholder = "Current HP";
      currHpInput.className = "search-input";
      currHpInput.name = "currentHp";
      currHpInput.required = true;

      const maxHpInput = document.createElement("input");
      maxHpInput.type = "number";
      maxHpInput.placeholder = "Max HP";
      maxHpInput.className = "search-input";
      maxHpInput.name = "maxHp";
      maxHpInput.required = true;

      form.appendChild(submit);
      form.appendChild(currHpInput);
      form.appendChild(maxHpInput);

      form.addEventListener("submit", async (e) => {
          e.preventDefault();

          const currhpvalue = Number(currHpInput.value);
          const maxhpvalue = Number(maxHpInput.value);

          if (currhpvalue <= 0 || maxhpvalue <= 0) return;

          await calculateRate(
              pokeballIntvalue,
              statusValue,
              maxhpvalue,
              currhpvalue
          );
      });

      currLi.appendChild(form);
      healthUl.appendChild(currLi);
      box.appendChild(healthUl);

      box.classList.add("visible");
  }

  async function calculateRate(ballvalue, statusConditionValue,maxHp,currHp) {
    console.log("calculaterate Called");
      const box = document.getElementById("catchRatePage") ;
      box.innerHTML = "";
      let result = 0;
      let Bvalue = 0;
      //const pokeValues = {
      //     poke: 200 ,
      //     great: 255 ,
      //     master: -1
      // }
      let catchrate = await getPokemonRate();

      switch (ballvalue) {
          case 255:
              Bvalue = 8;
              break;
          case -1:
              Bvalue = -1
              break;
          default:
              Bvalue = 12;
              break;
      }

      if (Bvalue === -1){
          result = "That is a Guaranteed Catch!"
      }
      else{
          // need to : create function that recieves : rate, ball value and status condition, create input to recieve current and max hp from keyboard ad pass it the function....( god this is so tedious....)
          // double F = (double)(pokemon.HPmax * 255 * 4) /  (pokemon.HPcurr * Bvalue);
          const f = (maxHp * 255 * 4 ) / (currHp * Bvalue);
          // double x = (((double)pokemon.statusCondition / (ball.ballvalue + 1 )) + (((double)(pokemon.catchrate + 1) / (ball.ballvalue + 1 )) * ((F + 1)/256)));
          const x = statusConditionValue / (ballvalue+1) + (catchrate + 1) * ((f+1)/256);

          result = "The probability of catching the indicated pokemon is: " + x + "%";
      }





      //box
      const title = document.createElement("h2");
      title.textContent = result;
      box.appendChild(title);
      box.classList.add("visible");


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

async function fetchStatusData(){
    try {
        const response = await fetch("https://pokeapi.co/api/v2/move-ailment")
        return response.json()
    }
    catch (e) {
        console.error('Error fetching Pokemon data:', e);
    }
}

async function getstatusdata(){
    return fetchStatusData();
}

function getpokemonName(){
    return document.getElementById("search").value;
}

async function getPokemon() {
    const name = getpokemonName();

    return fetchPokemonData(name);//ACTUAL POKEMON DATA
}

async function getPokemonRate(){
    try{
        const pokemon = await getPokemon();
        const response = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemon.id)
        const data = await response.json();
        return data.capture_rate
    }catch (e) {
        console.error("Error fetching Pokemon data: ", e);
    }
}












//function to create element?? brb

async function pokemonElement() {
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
    document.getElementById("pkSprite").src = pokemonjson.sprites.front_default;

    //get abilities
    const ablilitylist = document.createElement("ul");
     ablilitylist.id = "pkAbilities";
    let ablist = pokemonjson.abilities;

    let  idelement2 = document.createElement("th");
    idelement2.textContent = "Abilities";
    ablilitylist.appendChild(idelement2);

    ablist.forEach(ab => {
        let li = document.createElement("li");
        li.style.backgroundColor = "#74b3c7";
        li.textContent = ab.ability.name;
        ablilitylist.appendChild(li);
    })


   console.log(pokemonjson.sprites);
    //add everything to the box
    box.appendChild(name);
    box.appendChild(statslist);
    box.appendChild(ablilitylist);
    box.appendChild(typelist);
    box.appendChild(idelement);

    //style the element....
    box.classList.add("visible");
}

//create event
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload
        pokemonElement();
    });

});

  document.addEventListener("DOMContentLoaded", () => {
      document.getElementById("searchFormRate").addEventListener("submit", function (event) {
          event.preventDefault(); // Prevent page reload
          pokemonElement();
          pokemonrateElement();
      });

  });



//catch rate functions...




