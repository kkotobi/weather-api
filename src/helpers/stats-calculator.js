// Local
import isItemInArray from './is-item-in-array';
import measurementStore from '../data-store/measurement-model';

/**
 * Takes in the metric and stat arrays originally from the req.query in the /stats? endpoint
 * and it iterates over both arrays to create an object that looks like
 * {
 *   temperature: { min: 0, max: 0, average: 0 },
 *   dewPoint: { min: 0, max: 0, average: 0 },
 *   precipitation: { min: 0, max: 0, average: 0 }
 * }
 * @param metrics {Array}
 * @param stats {Array}
 * @returns {{}}
 * @private
 */
const _buildTempResponseObj = (metrics, stats) => {
  const tempResponseObj = {};
  metrics.forEach((metricName) => {
    stats.forEach((statName) => {
      if (!tempResponseObj[metricName]) {
        tempResponseObj[metricName] = Object.assign({}, { [statName]: null, totalSeen: 0 });
      } else {
        tempResponseObj[metricName][statName] = null;
      }
    });
  });
  return tempResponseObj;
};

/**
 * Takes in the filtered store (Map) along with metric and stat array and calculates min,max,avg on passed in metrics
 * @param filteredStore {Map} of Map objects (measurements)
 * @param metrics {Array} of strings which contain the name of the measurements to gather e.g: dewPoint, temperature
 * @param stats {Array} of strings which contain the statistics e.g: min, max, avg
 * @returns {Object} which looks like:
 * {
 *   "temperature": {
 *       "min": 27.1,
 *       "max": 27.1,
 *       "average": "27.0"
 *   },
 *   "dewPoint": {
 *       "min": 16.7,
 *       "max": 16.7,
 *       "average": "17.0"
 *   },
 *   "precipitation": {
 *       "min": 0,
 *       "max": 0,
 *       "average": "0.0"
 *  }
}
 * @private
 */
const _getMinMaxAvgForMetrics = (filteredStore, metrics, stats) => {
  const MIN = 'min';
  const MAX = 'max';
  const AVERAGE = 'average';
  const TIMESTAMP = 'timestamp';

  const filteredStoreEntries = filteredStore.entries();
  const filteredStoreSize = filteredStore.size;
  let mapIteratorIndex = 0;
  let isLastIteration = false;
  const tempMetricsObj = _buildTempResponseObj(metrics, stats);

  const calculateMin = isItemInArray(stats, MIN);
  const calculateMax = isItemInArray(stats, MAX);
  const calculateAvg = isItemInArray(stats, AVERAGE);
  let tempMapValueEntries;

  for (const [key, value] of filteredStoreEntries) {
    tempMapValueEntries = Object.entries(value);
    ++mapIteratorIndex;
    isLastIteration = (mapIteratorIndex === filteredStoreSize);
    for (const [objInMapKey, objInMapValue] of tempMapValueEntries) {
      if (objInMapKey === TIMESTAMP) {
        continue;
      }

      // Min metric calculation
      if (calculateMin && tempMetricsObj[objInMapKey]) {
        tempMetricsObj[objInMapKey][MIN] = (tempMetricsObj[objInMapKey][MIN] === null) ? objInMapValue : Math.min(objInMapValue, tempMetricsObj[objInMapKey][MIN]);
      }
      // Max metric calculation
      if (calculateMax && tempMetricsObj[objInMapKey]) {
        tempMetricsObj[objInMapKey][MAX] = (tempMetricsObj[objInMapKey][MAX] === null) ? objInMapValue : Math.max(objInMapValue, tempMetricsObj[objInMapKey][MAX]);
      }
      // Average metric aggregation
      if (calculateAvg && tempMetricsObj[objInMapKey]) {
        tempMetricsObj[objInMapKey][AVERAGE] += objInMapValue;
        tempMetricsObj[objInMapKey].totalSeen += 1;
      }
      // Average metric calculation based on previously aggregated value(s), we do this on the last iteration
      if (isLastIteration && calculateAvg && tempMetricsObj[objInMapKey]) {
        tempMetricsObj[objInMapKey][AVERAGE] = Number((tempMetricsObj[objInMapKey][AVERAGE] / tempMetricsObj[objInMapKey].totalSeen).toFixed(1));
      }
      // Cleanup on last iteration
      if (isLastIteration && tempMetricsObj[objInMapKey]) {
        delete tempMetricsObj[objInMapKey].totalSeen;
      }
    }
  }
  return tempMetricsObj;
};

/**
 * Takes in the req.body object from GET /stats and uses it to gather the data we need to make our calculations.
 * @param reqQueryObj {Object}
 * @returns {Object} from storage.measurements map
 */
const statsCalculator = (reqQueryObj) => {
  const { metric, stat, fromDateTime, toDateTime } = reqQueryObj;
  // Gets the store filtered by date
  const filteredStore = measurementStore.queryStoreByDateRange(fromDateTime, toDateTime);
  return (filteredStore.size) ? _getMinMaxAvgForMetrics(filteredStore, metric, stat) : {};
};

export default statsCalculator;