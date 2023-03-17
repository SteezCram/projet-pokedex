const fs = require('fs');
const path = require('path');

const Pokemon = require('./pokemon');




module.exports = class PokemonDatabase
{
    /**
     * Create a new pokemon in the database.
     * @param {Pokemon} pokemon - The pokemon to be saved to the database
     * @returns {boolean} - True if the pokemon was saved successfully, false otherwise
     */
    static async create(pokemon)
    {
        if (pokemon == null)
            return false;

        if (fs.existsSync(path.join('data', `${pokemon.id}.json`)))
            return false;

        try {
            await fs.promises.writeFile(path.join('data', `${pokemon.id}.json`), JSON.stringify(pokemon));
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Get a pokemon from the database.
     * @param {string} id - The id of the pokemon to be retrieved
     * @returns {Pokemon} - The pokemon with the given id, or null if the pokemon does not exist
     */
    static async get(id)
    {
        if (id == null)
            return null;

        if (!fs.existsSync(path.join('data', `${id}.json`)))
            return null;

        try {
            let pokemonData = JSON.parse(await fs.promises.readFile(path.join('data', `${id}.json`)));
            
            const pokemon = new Pokemon(pokemonData.id, pokemonData.name, pokemonData.size, pokemonData.weight, pokemonData.types, pokemonData.ability, pokemonData.description);
            pokemon.image = await PokemonDatabase.getImage(pokemon.id);
            
            return pokemon;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Get all the pokemons in the database.
     * @returns {Promise<Pokemon[]>} - An array of all the pokemons in the database
     */
    static async getAll()
    {
        const files = await fs.promises.readdir('data');
        const pokemons = [];

        for (let i = 0; i < files.length; i++)
        {
            const pokemon = await PokemonDatabase.get(files[i].split('.')[0]);
            pokemons.push(pokemon);
        }

        return pokemons;
    }

    /**
     * Get the image of the pokemon.
     * @param {string} id - The id of the pokemon to be updated
     * @returns {Promise<string>} - The path to the image of the pokemon
     */
    static async getImage(id)
    {
        const files = await fs.promises.readdir(path.join('static', 'img', 'pokemons'));
        return `/img/pokemons/${files.find(file => file.startsWith(id))}`;
    }

    /**
     * Set the image of the pokemon.
     * @param {string} id - The id of the pokemon to be updated 
     * @param {string} imageName - The image name of the pokemon
     * @param {string} imageDataBase64 - The image of the pokemon in base64 format
     * @returns {Promise<void>} A promise that resolves when the image is set
     */
    static async setImage(imageName, imageDataBase64)
    {
        if (imageName === null || imageDataBase64 === null)
            return;

        if (!fs.existsSync(path.join('static', 'img', 'pokemons')))
            await fs.promises.mkdir(path.join('static', 'img', 'pokemons'), { recursive: true });

        try {
            const buffer = Buffer.from(imageDataBase64.split(',')[1], 'base64'); 
            await fs.promises.writeFile(path.join('static', 'img', 'pokemons', imageName), buffer);
        }
        catch (error) {
            console.error(error);
        }
    }
}