const button = document.getElementById("get-location");
const resetButton = document.getElementById("reset-location");
const latText = document.getElementById("latitude");
const longText = document.getElementById("longitude");

button.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    latText.innerText = lat.toFixed(7);
    longText.innerText = long.toFixed(7);
  });
});

resetButton.addEventListener("click", () => {
  latText.innerText = 0;
  longText.innerText = 0;
});
