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
        if (pokemonListFiltered.length === 0) {
            document.getElementById('overlayContentContainer').innerHTML = overlayContentTemplate(pokemonList[index], index);
        } else {
            document.getElementById('overlayContentContainer').innerHTML = overlayContentTemplate(pokemonListFiltered[index], index);
        }
    } else {
        document.getElementById('overlayContentContainer').innerHTML = overlayContentTemplate(searchedPokemon);
    }
}

async function renderOverlayTypes(index) {
    if (!searchedPokemon.name && pokemonListFiltered.length === 0) {
        renderTypesForList(pokemonList, index);
    } else if (pokemonListFiltered.length > 0) {
        renderTypesForList(pokemonListFiltered, index);
    } else {
        renderTypesForSearchedPokemon();
    }
}

function renderTypesForList(array, index) {
    document.getElementById(`overlayTypes`).innerHTML = '';
    for (let i = 0; i < array[index].data.types.length; i++) {
        const element = array[index].data.types[i].type;
        document.getElementById(`overlayTypes`).innerHTML += overlayTypeTemplate(element.name);
    }
}

function renderTypesForSearchedPokemon() {
    document.getElementById(`overlayTypes`).innerHTML = '';  
    for (let i = 0; i < searchedPokemon.data.types.length; i++) {
        const element = searchedPokemon.data.types[i].type;
        document.getElementById(`overlayTypes`).innerHTML += overlayTypeTemplate(element.name);
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
    if (pokemonListFiltered.length === 0) {
        if (index == pokemonList.length - 1 || searchedPokemon.name) {
            deactivateButton('nextPokemon')
        }
        if (index == 0 || searchedPokemon.name) {
            deactivateButton('previousPokemon')
        }
    } else {
        if (index == pokemonListFiltered.length - 1) {
            deactivateButton('nextPokemon')
        }
        if (index == 0) {
            deactivateButton('previousPokemon')
        }
    }
};

function deactivateButton(id){
    document.getElementById(`${id}`).classList.add('dNone')
}