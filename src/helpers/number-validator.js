/**
 * Takes an input and determines if it's a number or not, Int or Float
 * @param numParam {Number}
 * @returns {boolean}
 */
const numberValidator = (numParam) => (typeof numParam === 'number');

export default numberValidator;