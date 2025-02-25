async function openOverlay(index) {
    if (!searchedPokemon.name) {
        document.getElementById('overlay').classList.add('dFlex')
        await renderOverlayContent(index);
        await renderOverlayTypes(index);
        checkIndex(index);

    } else {
        document.getElementById('overlay').classList.add('dFlex')
        await renderOverlayContent();
        await renderOverlayTypes();
        checkIndex();
    }
}

async function renderOverlayContent(index) {
    if (!searchedPokemon.name) {
        document.getElementById('overlayContentContainer').innerHTML = overlayContentTemplate(pokemonList[index], index);
    } else {
        document.getElementById('overlayContentContainer').innerHTML = overlayContentTemplate(searchedPokemon);
    }
}

async function renderOverlayTypes(index) {
    if (!searchedPokemon.name) {
        document.getElementById(`overlayTypes`).innerHTML += '';
        for (let i = 0; i < pokemonList[index].data.types.length; i++) {
            const element = pokemonList[index].data.types[i].type;
            document.getElementById(`overlayTypes`).innerHTML += overlayTypeTemplate(element.name);
        }
    } else {
        document.getElementById(`overlayTypes`).innerHTML += '';
        for (let i = 0; i < searchedPokemon.data.types.length; i++) {
            const element = searchedPokemon.data.types[i].type;
            document.getElementById(`overlayTypes`).innerHTML += overlayTypeTemplate(element.name);
        }
    }
}

function closeOverlay() {
    document.getElementById('overlay').classList.remove('dFlex')
}

async function nextPokemon(index) {
    await openOverlay(index);
    checkIndex(index);

};

async function previousPokemon(index) {
    await openOverlay(index);
    checkIndex(index);
};

function checkIndex(index) {
    if (index == pokemonList.length - 1 || searchedPokemon.name) {
        document.getElementById('nextPokemon').classList.add('dNone')
    }
    if (index == 0 || searchedPokemon.name) {
        document.getElementById('previousPokemon').classList.add('dNone')
    }
};