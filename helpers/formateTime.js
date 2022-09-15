function createUTSdateforISO(date) {
  const change = new Date().getTimezoneOffset();
  const data = Date.parse(date) - change * 60 * 1000;
  const dataString = new Date(data).toISOString();
  return dataString;
}

module.exports = createUTSdateforISO;
