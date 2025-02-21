const BASE_URL = "https://pokeapi.co/api/v2/"

const params = new URLSearchParams();
let limit = 20;
let offset = 0;

let pokemonList;
let pokedexData;

async function init() {
    await getPokedexData();
};

async function getPokedexData() {
    await getPokemonList();
    await getPokemonData();
    renderPokemonCards();
};

async function getPokemonList() {
    params.append("limit", limit);
    params.append("offset", offset);
    try {
        const response = await fetch(`${BASE_URL}pokemon?${params}`, {
            "method": "GET",
        });
        pokemonList = await response.json()
        pokemonList = pokemonList.results
    } catch (error) {
        console.error(error)
    }
};

async function getPokemonData() {
    for (let index = 0; index < pokemonList.length; index++) {
        const element = pokemonList[index];
        await getSingleData(element.url, index);
    }
};

async function getSingleData(url, index) {
    try {
        const response = await fetch(`${url}`, {
            "method": "GET",
        });
        pokemonList[index].data = await response.json()
    } catch (error) {
        console.error(error)
    }
};

function renderPokemonCards(){
    let startIndex = pokemonList.length - limit;
    if (startIndex < 0) startIndex = 0;
    for (let index = startIndex; index < pokemonList.length; index++) {
        const element = pokemonList[index];
        document.getElementById('pokedexContent').innerHTML += pokemonTemplate(element, index);
        renderTypes(element, index)
    }

    console.log('alles gerendert')
}

function renderTypes(pokemon, index){
    for (let i = 0; i < pokemon.data.types.length; i++) {
        const element = pokemon.data.types[i];
        document.getElementById(`types${index}`).innerHTML += typesTemplate(element.type.name, index);
    }
}

async function loadMorePokemon(){
    offset += 20;
    params.delete("limit") 
    params.delete("offset") 
    params.append("limit", limit);
    params.append("offset", offset);
    try {
        const response = await fetch(`${BASE_URL}pokemon?${params}`, {
            "method": "GET",
        });
        let newPokemon = await response.json()
        await addNewPokemon(newPokemon.results);
        // pokemonList.push(newPokemon.results)
        // console.log(pokemonList)
    } catch (error) {
        console.error(error)
    }

}

async function addNewPokemon(newPokemon) {
    for (let index = 0; index < newPokemon.length; index++) {
        const pokemon = newPokemon[index];
        // console.log(pokemon)
        pokemonList.push(pokemon)
        await getSingleData(pokemon.url, pokemonList.length - 1)
    }
    renderPokemonCards();
    console.log(pokemonList)
}




