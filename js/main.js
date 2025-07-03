//! select elements !\\
const bgv = document.getElementById("bgv");
const loading = document.getElementById("loading");
const allow = document.getElementById("allow");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const currentCity = document.getElementById("city");
const currentDay = document.getElementById("currentDay");
const currentDate = document.getElementById("currentDate");
const currentTemp = document.getElementById("currentTemp");
const currentIcon = document.getElementById("currentIcon");
const currentDisc = document.getElementById("currentDisc");

const secondDay = document.getElementById("secondDay");
const secondIcon = document.getElementById("secondIcon");
const secondTemp = document.getElementById("secondTemp");
const secondDisc = document.getElementById("secondDisc");

const thirdDay = document.getElementById("thirdDay");
const thirdIcon = document.getElementById("thirdIcon");
const thirdTemp = document.getElementById("thirdTemp");
const thirdDisc = document.getElementById("thirdDisc");

// display the three days
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dateNow = new Date();

currentDay.innerHTML = weekDays[dateNow.getDay()]; // setting day name in html

currentDate.innerHTML = `${dateNow.getFullYear()} / ${
  dateNow.getMonth() + 1
} / ${dateNow.getDate()}`;

secondDay.innerHTML = weekDays[dateNow.getDay() + 1];

thirdDay.innerHTML = weekDays[dateNow.getDay() + 2];

async function getForcast(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=6d3ec228f80b400ba2c154933250107&q=${city}&days=3`
  );
  loading.classList.remove("d-none");
  if (response.ok) {
    let forecastData = await response.json();

    let day1Forecast = forecastData.forecast.forecastday[0];
    let condDisc = day1Forecast.hour[9].condition.text;
    let tempC = day1Forecast.hour[9].temp_c;
    let tempIcon = day1Forecast.hour[9].condition.icon;
    currentCity.innerHTML = forecastData.location.name;
    currentTemp.innerHTML = `${tempC}°C`;
    currentDisc.innerHTML = condDisc;
    currentIcon.setAttribute("src", `${tempIcon}`);
    bgv.setAttribute("src", `./imgs&video/${condDisc}.mp4`);

    let day2Forecast = forecastData.forecast.forecastday[1];
    let condDiscDay2 = day2Forecast.hour[9].condition.text;
    let tempCDay2 = day2Forecast.hour[9].temp_c;
    let tempIconDay2 = day2Forecast.hour[9].condition.icon;
    secondTemp.innerHTML = `${tempCDay2}°C`;
    secondDisc.innerHTML = condDiscDay2;
    secondIcon.setAttribute("src", `${tempIconDay2}`);

    let day3Forecast = forecastData.forecast.forecastday[2];
    let condDiscDay3 = day3Forecast.hour[9].condition.text;
    let tempCDay3 = day3Forecast.hour[9].temp_c;
    let tempIconDay3 = day3Forecast.hour[9].condition.icon;
    thirdTemp.innerHTML = `${tempCDay3}°C`;
    thirdDisc.innerHTML = condDiscDay3;
    thirdIcon.setAttribute("src", `${tempIconDay3}`);
    loading.classList.add("d-none");
    allow.classList.add("d-none");
  }
}
// display current location function
function findCurrentLocation() {
  // send a messege to the user to share it's location (callback what to do if accept,callback what to do if reject)
  navigator.geolocation.getCurrentPosition(success, error);
  // reseve the location from the getCurrentPosation argument and save it in the posation parameter for my success function
  async function success(location) {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    let response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    if (response.ok) {
      let data = await response.json();
      let currentCity = data.city;
      currentCity.innerHTML = data.city;
      getForcast(currentCity);
    }
  }
  // sharing the location rejected from the user so we function what to do and sent it to getCurrentPosation argument and save it in the posation parameter for my error function
  function error() {
    currentCity.innerHTML = "Allow Location Please";
    bgv.setAttribute("src", `./imgs&video/Sunny.mp4`);
    loading.classList.remove("d-none");
    allow.classList.remove("d-none");
  }
}
findCurrentLocation();

// display search location function
searchInput.addEventListener("input", function () {
  let searchValue = searchInput.value.trim();
  if (searchValue === "") {
    findCurrentLocation();
  } else getForcast(searchValue);
});
