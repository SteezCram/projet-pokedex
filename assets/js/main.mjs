export const abilities = (await (await fetch('/abilities.json')).json()).map(x => x.name);
export const types = (await (await fetch('/types.json')).json()).map(x => x.name);


/**
 * Read a file and return a promise with the data url.
 * @param {File} file - The file to read
 * @returns {Promise<string>} - The data url
 */
export function getFileDataURL(file)
{
    return new Promise((resolve, reject) =>
    {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function (error) {
            reject(error);
        };
    });
}

/**
 * Verify if the ability exists.
 * @param {Event} event - The event
 */
export function verifyAbility(event)
{
    const target = event.target;
    const value = event.target.value;

    if (abilities.indexOf(value) === -1) {
        target.setCustomValidity('The ability you entered doesn\'t exist');
    }
    else {
        target.setCustomValidity('');
    }

    target.reportValidity();
}

/**
 * Verify if the type exists.
 * @param {Event} event - The event
 */
export function verifyType(event)
{
    const target = event.target;
    const value = event.target.value;

    if (type1Input.value === type2Input.value) {
        target.setCustomValidity('You can\'t choose the same type twice');
    }
    else if (types.indexOf(value) === -1) {
        target.setCustomValidity('The type you entered doesn\'t exist');
    }
    else {
        target.setCustomValidity('');
    }

    target.reportValidity();
}