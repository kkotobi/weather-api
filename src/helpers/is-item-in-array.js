/**
 * Looks for the existance of an item inside an given array.
 * @param indexArr {Array}
 * @param itemStr {*}
 * @returns {boolean}
 */
const isItemInArray = (indexArr, itemStr) => (indexArr.indexOf(itemStr) > -1);

export default isItemInArray;