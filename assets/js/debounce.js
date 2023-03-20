/**
 * Debounce a function.
 * @param {function} callback - The function to call
 * @param {number} delay - The delay in milliseconds
 * @returns {function} The debounced function
 */
function debounce(callback, delay = 1000) {
    let timeout;

    return (...args) =>  {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), delay);
    };
};