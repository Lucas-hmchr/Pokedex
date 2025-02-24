function pokemonTemplate(pokemon, index) {
    return `
        <div class="pokemonCard" id="pokemonCard${index}">
            <h1>#${pokemon.data.id} ${pokemon.name}</h1>
            <div class="types" id="types${index}">

            </div>
            <img class="pokemonCardImage" src="${pokemon.data.sprites.front_default}" alt="">
            <div class="${pokemon.data.types[0].type.name}Type pokemonImageBackground"></div>
        </div>

    `
};

function typesTemplate(type, index) {
    return `
        <div class="type ${type}Type">${type}</div>

    `
};