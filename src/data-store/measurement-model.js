// NPM
import Moment from 'moment';
import { extendMoment } from 'moment-range';

// Local
import store from './measurement-store';

const moment = extendMoment(Moment);

/**
 * Either initializes or returns the <Map> store.measurements
 * @returns {Map}
 * @private
 */
const _getStore = () => {
  return (store.measurements === null)
    ? store.init().measurements
    : store.measurements;
};

/**
 *
 * @param key {String} - key for the map
 * @param measurement {Object} - measurement to be added
 * @returns {boolean|*}
 */
const add = (key, measurement) => {
  const measurementsStore = _getStore();
  try {
    return measurementsStore.set(key, measurement);
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * Get existing measurement by key
 * @param key {String} - date ISO 8601 of when measurement was taken
 * @returns {Measurement} measurement for the particular date
 */
const get = (key) => {
  const measurementsStore = _getStore();
  return measurementsStore.get(key);
};

/**
 * Gets a date range (excluding ending date) and returns the items inside the store that match it.
 * @param from {ISO8601}
 * @param to {ISO8601}
 * @returns {Map} with the filtered values
 */
const queryStoreByDateRange = (from, to) => {
  const responseMap = new Map();
  const storeEntries = _getStore().entries();
  const tempFromDate = Date.parse(from);
  const tempToDate = Date.parse(to);
  const range = moment.range(tempFromDate, tempToDate);

  for (const [dateKey, value] of storeEntries) {
    if (range.contains(Date.parse(dateKey), { excludeEnd: true })) {
      responseMap.set(dateKey, value);
    }
  }
  return responseMap;
};

export default {
  add,
  get,
  queryStoreByDateRange,
};