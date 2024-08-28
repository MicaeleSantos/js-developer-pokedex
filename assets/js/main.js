const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const statusDes = document.getElementById('statusDes');
const detailPokemons = document.getElementById('detailPokemons');
const maxRecords = 151;
const limit = 150;
let offset = 0;
let allPokemons = []; 

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            <div>
            <button class="openBtn" data-pokemon-id="${pokemon.number}">More</button>
            </div>
        </li>
    `;
}

function loadPokemonDetails(pokemon) {
    return `
        <li class="pokemon1 ${pokemon.type}">
            <span class="number1">#${pokemon.number}</span>
            <span class="name1">${pokemon.name}</span>
            <img id="img-poke" src="${pokemon.photo}" alt="${pokemon.name}">
            <div class="detail1">
                <ol class="types1">
                    ${pokemon.types.map((type) => `<li class="type1 ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <div class="data-stats">
                <table>
                    <tr>
                        <td><b>Weight:</b> ${pokemon.weight / 10}kg</td>
                        <td><b>Height:</b> ${pokemon.height / 10}cm</td>
                    </tr>
                    <tr>
                        <td><b>Main move:</b> ${pokemon.mainmove}</td>
                        <td><b>Ability:</b> ${pokemon.ability}</td>
                    </tr>
                </table>
            </div>
            <div class="statuss" id="status-id">
                <ol class="pokeStats" id="statsPoke">
                
                    <div class="abilities">
                        <td class="stats">HP</td> <td>${pokemon.hp}</td> <li class="poke-bar"><div class="bar-hp " style="width: ${pokemon.hp}%">&nbsp;</div></li>
                    </div>
                    <div class="abilities">
                        <td class="stats">ATK</td> <td>${pokemon.atk}</td> <li class="poke-bar"> <div class="bar-atk " style="width: ${pokemon.atk}%">&nbsp;</div></li>

                    </div>
                    <div class="abilities">
                        <td class="stats">DEF</td> <td>${pokemon.def}</td> <li class="poke-bar"><div class="bar-def" style="width: ${pokemon.def}%">&nbsp;</div></li>
                    </div>
                    <div class="abilities">
                        <td class="stats">SATK</td> <td>${pokemon.satk}</td> <li class="poke-bar"><div class="bar-satk" style="width: ${pokemon.satk}%">&nbsp;</div></li>

                    </div>
                    <div class="abilities">
                        <td class="stats">SDEF</td> <td>${pokemon.sdef}</td> <li class="poke-bar"><div class="bar-sdef " style="width: ${pokemon.sdef}%">&nbsp;</div></li>
                    </div>
                    <div class="abilities">
                        <td class="stats">SPEED</td> <td>${pokemon.speed}</td> <li class="poke-bar" ><div class="bar-spd " style="width: ${pokemon.speed}%">&nbsp;</div></li>
                    </div>
                </ol>
            </div>
            <div>
            <button class="closeBtn">Close</button>
            </din>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
        allPokemons = allPokemons.concat(pokemons);
    });
}

// Função para mais detalhes
function pokemonsDetails(pokemonId) {
    pokeApi.getPokemonDetail ({ url:`https://pokeapi.co/api/v2/pokemon/${pokemonId}`})
    .then(pokemon => {
        detailPokemons.innerHTML = loadPokemonDetails(pokemon)
        statusDes.classList.remove('hidden')
    })
}

pokemonList.addEventListener('click', (pokes) =>{
    if(pokes.target.classList.contains('openBtn')) {
        const pokemonId = pokes.target.getAttribute ('data-pokemon-id')
        pokemonsDetails(pokemonId)
    }
})

statusDes.addEventListener('click', (pokes) => {
   // Reativar o display: none;
    if (pokes.target.classList.contains('closeBtn')) {
        statusDes.classList.add('hidden'); 
    }
}) 
loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadMoreButton.style.display = 'none';
    }
});

// Função select
const options = [
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
];

function pokeSelect() {
    const selectElement = document.getElementById('pokemonFilter');

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.text = option.text;
        selectElement.add(opt);
    });
    selectElement.addEventListener('change', handleSelectChange);
}

function handleSelectChange(pokeFilter) {
    // Limpar a lista atual
    const selectedType = pokeFilter.target.value;
    pokemonList.innerHTML = ''; 
    const filteredPokemons = selectedType === 'all'
        ? allPokemons
        : allPokemons.filter(pokemon => pokemon.types.includes(selectedType));
    
    const newHtml = filteredPokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML = newHtml;

 if (selectedType === 'all') {
        loadMoreButton.style.display = 'grid';
    } else {
        loadMoreButton.style.display = 'none';
    }
}
window.onload = pokeSelect;