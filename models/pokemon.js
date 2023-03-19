const PokemonDatabase = require('./pokemonDatabase');




module.exports = class Pokemon
{
    /**
     * 
     * @param {string} id - The id of the pokemon
     * @param {string} name - The name of the pokemon
     * @param {float} size - The size of the pokemon in meters
     * @param {float} weight - The weight of the pokemon in kilograms
     * @param {Array<string>} types - The type(s) of the pokemon
     * @param {string} ability - The ability name of the pokemon
     * @param {string} description - The description of the pokemon
     */
    constructor(id, name, size, weight, types, ability, description = '')
    {
        this.id = id;
        this.name = name;
        this.size = size;
        this.weight = weight;
        this.types = types;
        this.ability = {
            name: ability,
            description: '',
        };
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
     * Get the description of the ability of the pokemon.
     * @param {string} ability - The ability of the pokemon
     * @returns {Promise<string>} A promise that resolves when the description is set and return the description
     */
    static async getAbilityDescription(ability) {
        return await PokemonDatabase.getAbilityDescription(ability);
    }

    /**
     * Get the weaknesses for a pokemon type.
     * @param {string} type - The type of the pokemon
     * @returns {Promise<Array<string>>} A promise that resolves when the weaknesses are set and return the weaknesses
     */
    static async getWeaknesses(type) {
        return await PokemonDatabase.getWeaknesses(type);
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