/**
 * Gets an item and if it's an array returns it, otherwise puts it inside an array.
 * @param item {Any}
 * @returns []
 */
const getAsArray = (item) => (Array.isArray(item)) ? item : [item];

export default getAsArray;