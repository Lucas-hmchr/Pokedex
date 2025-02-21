function pokemonTemplate(pokemon, index) {
    return `
        <div class="pokemonCard" id="pokemonCard${index}">
            <h1>#${index+1} ${pokemon.name}</h1>
            <div class="types" id="types${index}">

            </div>
            <img class="pokemonCardImage" src="${pokemon.data.sprites.front_default}" alt="">
        </div>

    `
};

function typesTemplate(type, index) {
    return `
        <div class="type ${type}Type">${type}</div>

    `
};