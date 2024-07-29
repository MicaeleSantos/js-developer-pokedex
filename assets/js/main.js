const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 151
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit);
    }
})


        // select list

const   options = [
    { value: "all", text: "All" },
    { value: "bug", text: "Bug" },
    { value: "dark", text: "Dark" },
    { value: "dragon", text: "Dragon" },
    { value: "electric", text: "Electric" },
    { value: "fairy", text: "Fairy" },
    { value: "fighting", text: "Fighting" },
    { value: "fire", text: "Fire" },
    { value: "flying", text: "Flying" },
    { value: "ghost", text: "Ghost" },
    { value: "grass", text: "Grass" },
    { value: "ground", text: "Ground" },
    { value: "ice", text: "Ice" },
    { value: "poison", text: "Poison" },
    { value: "psychic", text: "Psychic" },
    { value: "rock", text: "Rock" },
    { value: "steel", text: "Steel" },
    { value: "water", text: "Water" }
]

function pokeSelect() {
    const selectElement = document.getElementById('pokemonFilter')

    options.forEach(option => {
        const opt = document.createElement('option')
        opt.value = option.value
        opt.text = option.text
        selectElement.add(opt)
    });
    selectElement.addEventListener('change', handleSelectChange)
}


    function handleSelectChange(event) {
        const selectedType = event.target.value;
        const pokemons = pokemonList.getElementsByClassName('pokemon');
        
            for (let i = 0; i < pokemons.length; i++) {
                const pokemon = pokemons[i];
                const types = pokemon.getElementsByClassName('type');
                let hasType = false;
        
                for (let j = 0; j < types.length; j++) {
                    if (types[j].textContent === selectedType || selectedType === 'all') {
                        hasType = true;
                        break;
                    }
                }
        
                if (hasType) {
                    pokemon.style.display = '';
                } else {
                    pokemon.style.display = 'none';
                }
            }
        }
    
window.onload = pokeSelect;