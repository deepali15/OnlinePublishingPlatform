const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'online-publishing-platform',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

