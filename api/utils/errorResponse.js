const ERRORCODES = require('./codes');

const errorResponse = (status, code, msg = '') => ({
  error: true,
  status,
  code,
  message: msg || ERRORCODES[code],
});

module.exports = errorResponse;
