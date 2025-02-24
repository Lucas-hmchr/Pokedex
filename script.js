const BASE_URL = "https://pokeapi.co/api/v2/"

const params = new URLSearchParams();
let limit = 20;
let offset = 0;

let pokemonList;
let pokedexData;

let searchedPokemon = {};

async function init() {
    toggleLoadingAnimation();
    await getPokedexData();
    toggleLoadingAnimation();
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
        if (index !== null) {
            pokemonList[index].data = await response.json()
        } else {
            searchedPokemon.data = await response.json();
        }
    } catch (error) {
        console.error(error)
        document.getElementById('errorMessage').classList.remove('dNone')
    }
};

function renderPokemonCards() {
    document.getElementById('errorMessage').classList.add('dNone')
    document.getElementById('pokedexContent').innerHTML = ''
    // if (pokemonList.length > limit && document.getElementById('pokedexContent').innerHTML !== '') {
    //     let startIndex = pokemonList.length - limit;
    //     if (startIndex < 0) startIndex = 0;
    //     for (let index = startIndex; index < pokemonList.length; index++) {
    //         const element = pokemonList[index];
    //         document.getElementById('pokedexContent').innerHTML += pokemonTemplate(element, index);
    //         renderTypes(element, index)
    //     }
    // } else {
        for (let index = 0; index < pokemonList.length; index++) {
            const element = pokemonList[index];
            document.getElementById('pokedexContent').innerHTML += pokemonTemplate(element, index);
            renderTypes(element, index)
        }
    // }
}

function renderTypes(pokemon, index) {
    if (index !== null) {
        for (let i = 0; i < pokemon.data.types.length; i++) {
            const element = pokemon.data.types[i];
            document.getElementById(`types${index}`).innerHTML += typesTemplate(element.type.name, index);
        }
    } else {
        for (let i = 0; i < pokemon.data.types.length; i++) {
            const element = pokemon.data.types[i];
            document.getElementById(`types${pokemon.data.id - 1}`).innerHTML += typesTemplate(element.type.name, (pokemon.data.id - 1));
        }
    }
}

function renderSearchedPokemon() {
    const element = searchedPokemon;
    document.getElementById('pokedexContent').innerHTML = pokemonTemplate(element, (searchedPokemon.data.id - 1));
    renderTypes(element, null)
};

async function loadMorePokemon() {
    toggleLoadingAnimation();
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
    } catch (error) {
        console.error(error)
    }
    toggleLoadingAnimation()
}

async function addNewPokemon(newPokemon) {
    for (let index = 0; index < newPokemon.length; index++) {
        const pokemon = newPokemon[index];
        pokemonList.push(pokemon)
        await getSingleData(pokemon.url, pokemonList.length - 1)
    }
    renderPokemonCards();
}

function toggleLoadingAnimation() {
    document.getElementById('loadMoreButton').classList.toggle('spinningAnimation');

    if (document.getElementById('loadMoreButton').classList.contains('spinningAnimation')) {
        document.getElementById('loadMoreButtonIcon').src = "./assets/icons/logoIconWhite.svg"
    } else {
        document.getElementById('loadMoreButtonIcon').src = "./assets/icons/reload.svg"
    }
};

function toggleErrorMessage() {
    document.getElementById('errorMessage').classList.toggle('dNone');
};

async function getPokemonBySearch() {
    if (document.getElementById('searchBar').value !== '') {
        toggleLoadingAnimation();
        document.getElementById('pokedexContent').innerHTML = ''
        searchedPokemon.name = document.getElementById('searchBar').value;
        let searchUrl = `${BASE_URL}pokemon/${document.getElementById('searchBar').value}`
        await getSingleData(searchUrl, null)
        renderSearchedPokemon();
        toggleLoadingAnimation()
    }
}

function checkInput() {
    if (document.getElementById('searchBar').value === '') {
        searchedPokemon = {};
        document.getElementById('pokedexContent').innerHTML = ''
        document.getElementById('errorMessage').classList.add('dNone')
        renderPokemonCards();
    }
}




