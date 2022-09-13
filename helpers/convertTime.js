function convertTime(dt) {
  const date = new Date(dt * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();

  return hours + ":" + minutes.substring(-2) + ":" + seconds.substring(-2);
}

module.exports = convertTime;
