function pokemonTemplate(pokemon, index) {
    return `
        <div class="pokemonCard" id="pokemonCard${index}" onclick="openOverlay(${index})">
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

function overlayContentTemplate(pokemon, index) {
    return `

            <h1>#${pokemon.data.id} ${pokemon.name}</h1>
            <img class="pokemonOverlayCardImage" src="${pokemon.data.sprites.front_default}" alt="">
            <div class="${pokemon.data.types[0].type.name}Type pokemonOverlayImageBackground"></div>
            <div class="types" id="overlayTypes">

            </div>

            <div class="stats" id="stats">
                <table>
                    <tr>
                        <td>Base experience</td>
                        <td>${pokemon.data.base_experience}</td>
                    </tr>
                    <tr>
                        <td>HP</td>
                        <td>${pokemon.data.stats[0].base_stat}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>${pokemon.data.weight}</td>
                    </tr>
                    <tr>
                        <td>Attack</td>
                        <td>${pokemon.data.stats[1].base_stat}</td>
                    </tr>
                    <tr>
                        <td>Defense</td>
                        <td>${pokemon.data.stats[2].base_stat}</td>
                    </tr>
                    <tr>
                        <td>Special-Attack</td>
                        <td>${pokemon.data.stats[3].base_stat}</td>
                    </tr>
                    <tr>
                        <td>Special-Defense</td>
                        <td>${pokemon.data.stats[4].base_stat}</td>
                    </tr>
                </table>
            </div>


            <button type="button" class="closeOverlayButton" onclick="closeOverlay()">✕</button>
            <div class="switchButtons">
                <button type="button" id="previousPokemon" onclick="previousPokemon(${index-1})"><img src="./assets/icons/previousPokemon.svg"></button>
                <button type="button" id="nextPokemon" onclick="nextPokemon(${index+1 || ''})"><img src="./assets/icons/nextPokemon.svg"></button>
            </div>

`
};

function overlayTypeTemplate(type) {
    return `
        <div class="type ${type}Type">${type}</div>

    `
}