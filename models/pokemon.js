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