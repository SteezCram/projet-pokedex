/**
 * Search for a pokemon in the database. Debounced to prevent spamming the server.
 * @param {Event} event 
 */
const search = debounce(async event =>
{
    const target = event.target;
    const value = target.value;
    const searchHits = document.getElementById('searchHits');

    if (value.length === 0) {
        searchHits.classList.add('hidden');
        return;
    }
    
    let hits = [];

    // Test if the value is a number
    if (/^\d+$/.test(value))
        hits = await searchID(parseInt(value, 10));
    else
        hits = await searchName(value);

    if (hits.length === 0) {
        searchHits.classList.remove('hidden');
        searchHits.innerHTML = `<ul><li class="p-2"><a href="#" onclick="return false;" class="block rounded hover:bg-blue-500 hover:text-white p-2">No result</a></li></ul>`;
        return;
    }
    
    let html = '<ul>';
    for (const x of hits) {
        html += `
        <li class="p-2">
            <a href="/${x.id}" class="flex flex-row items-center rounded hover:bg-blue-500 hover:text-white p-2">
                <img src="${x.image}" class="w-8 h-8 mr-2"/>
                ${x.name}
            </a>
        </li>`;
    }
    html += '</ul>';

    searchHits.classList.remove('hidden');
    searchHits.innerHTML = html;
});


/**
 * Search for a pokemon by its name.
 * @param {string} id - The id of the pokemon.
 * @returns {Promise<Pokemon[]>} The pokemon that match the id
 */
async function searchID(id)
{
    const response = await fetch(`/api/pokemons/${id}/exists`);

    if (!response.ok) return [];

    return [await response.json()];
}

/**
 * Search for a pokemon by its name.
 * @param {string} name - The name of the pokemon
 * @returns {Promise<Pokemon[]>} The pokemon that are close to the name
 */
async function searchName(name)
{
    const response = await fetch(`/api/pokemons/${name}/search`);

    if (!response.ok) return [];

    return await response.json();
}