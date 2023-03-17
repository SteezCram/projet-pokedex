const PokemonDatabase = require('./pokemonDatabase');




module.exports = class Pokemon
{
    constructor(id, name, size, weight, types, ability, description = '') {
        this.id = id;
        this.name = name;
        this.size = size;
        this.weight = weight;
        this.types = types;
        this.ability = ability;
        this.description = description;
    }

    /**
     * Get the color of the type of the pokemon.
     * @param {string} type - The type of the pokemon
     * @returns {string} The color of the type in hex format
     */
    static getTypeColor(type)
    {
        type = type.toLowerCase();

        const colours = {
            normal: '#A8A77A',
            fire: '#EE8130',
            water: '#6390F0',
            electric: '#F7D02C',
            grass: '#7AC74C',
            ice: '#96D9D6',
            fighting: '#C22E28',
            poison: '#A33EA1',
            ground: '#E2BF65',
            flying: '#A98FF3',
            psychic: '#F95587',
            bug: '#A6B91A',
            rock: '#B6A136',
            ghost: '#735797',
            dragon: '#6F35FC',
            dark: '#705746',
            steel: '#B7B7CE',
            fairy: '#D685AD',
        };
        
        return colours[type] || '#777';
    }


    /**
     * Get the image of the pokemon.
     * @returns {Promise<string>} A promise that resolves when the image is set and return the image path
     */
    async getImage() {
        return await PokemonDatabase.getImage(this.id);
    }

    /**
     * Set the image of the pokemon.
     * @param {string} imageName - The name of the image file
     * @param {string} imageDataBase64 - The image data in base64 format
     * @returns {Promise<void>} A promise that resolves when the image is set
     */
    async setImage(imageName, imageDataBase64) {
        await PokemonDatabase.setImage(imageName, imageDataBase64);
    }
}