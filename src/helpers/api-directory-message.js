// Local
import config from "../config/config";
import PORT from "./get-api-port";

const apiDirectoryMessage = () => {
  const servingUrl = (process.env.NODE_ENV) === 'LIVE' ? config.LIVE_URL : config.LOCAL_URL;
  (typeof console.clear === 'function' && console.clear());

  const tableDisplayData = {
    [config.SERVER_UP_MSG]: `${servingUrl}:${PORT}`,
    'POST => /measurements': `${servingUrl}:${PORT}${config.MEASUREMENTS_POST}`,
    'GET => /measurements/:timestamp': `${servingUrl}:${PORT}${config.MEASUREMENTS_POST}/2015-09-01T16:00:00.000Z`,
    'GET => /stats?stat&metric&fromDateTime=&toDateTime': `${servingUrl}:${PORT}${config.STATS_GET}?stat=...`,
  };

  console.table(tableDisplayData);
};

export default apiDirectoryMessage;
