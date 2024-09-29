const form = document.querySelector("form")
const loading = document.querySelector('.loading')
const search = document.querySelector('.search')
const result = document.querySelector('.result')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    loading.classList.remove('d-none')
    loadPokemon();
})


const getPokemon = async (URL, text) => {
    try{

        const res = await fetch(URL);
        if(!res.ok || !text || text <= 0 || text >=1000){
            throw 'Invalid entry. Please enter number from 1 to 1000 OR type correct name.'
        }
        const data = await res.json()
        console.log(data)


        const{id, height, abilities, types, stats, name, sprites:{other:{dream_world:{front_default}}}} = data;

        const secondAbility = abilities.length > 1 ? `and ${abilities[1].ability.name}` : "";

        loading.classList.add('d-none');
        result.className = 'result active'
        result.innerHTML = `
        <div class="pokemon found">
        <span class="closebox"></span>
        <img src="${front_default}" alt="${name}" class="pokemon" style= "padding: 20px">
        <h3 class="pokename"> Name: ${name} </h3>
        <p class ="pokenumber">ID#: ${id.toString().padStart(4,'0')}</p>
        <p class ="height"> Height: ${height} ft</p>
        <p class ="pokeability"> Abilities: ${abilities[0].ability.name} ${secondAbility}</p>
        <p class ="poketype"> Type: ${types[0].type.name}</p>
        <h5 class="pokestat">Stats:</h5>
        <p class ="pokestatus">${stats[0].stat.name}: ${stats[0].base_stat}</p>
        <p class ="pokestatus">${stats[1].stat.name}: ${stats[1].base_stat}</p>
        <p class ="pokestatus">${stats[2].stat.name}: ${stats[2].base_stat}</p>
        <p class ="pokestatus">${stats[5].stat.name}: ${stats[5].base_stat}</p>
        </div>
        `;
        search.value = null;

    } catch(error){
        console.log(error)


        loading.classList.add('d-none');
        result.className = 'result active'
        let pokemonid = search.value ? (isNaN(search.value) ? search.value: `ID# ${search.value}`): " ";
        result.innerHTML = `
        
        <div class="pokemon_notfound">
        <span class="closebox"></span>
        <img src="images/404_img.jpeg" alt="errorimage" style= "padding: 20px">
        <p class="error">Pokemon <span class="pokemon">${pokemonid}</span> Not Found, Please try again. </p>

        </div>
        `;

        search.value = null;

    }
}

function loadPokemon(){
    let text = search.value.trim();
    if(isNaN(text)) text = text.toLowerCase();
    const URL = `https://pokeapi.co/api/v2/pokemon/${text}`;
    getPokemon(URL, text);
}