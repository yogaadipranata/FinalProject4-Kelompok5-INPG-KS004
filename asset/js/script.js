if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  Swal.fire({
    icon: "error",
    title: "Wrong City Name!",
    text: "Please enter the city name correctly",
    confirmButtonColor: "#0d6efd",
    iconColor: "#dc3545",
  });
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  console.log(lat, lon);
  generateWeatherByLatLon(lat, lon);
  generateWeatherForecastByLatLon(lat, lon);
  generateMap(lat, lon);
}

function generateWeatherByLatLon(lat, lon) {
  fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=a22fcfa23906b08e1118cb3b65c641fe&units=metric")
    .then((response) => response.json())
    .then((data) => {
      var nameValue = data["name"];
      var countryValue = data["sys"]["country"];
      let countryName = new Intl.DisplayNames(["EN"], { type: "region" });
      let country = countryName.of(countryValue);
      var id = data["weather"][0]["id"];
      var tempValue = data["main"]["temp"];
      var descValue = data["weather"][0]["description"];
      var humidityValue = data["main"]["humidity"];
      var windValue = data["wind"]["speed"];
      var feelTempValue = data["main"]["feels_like"];

      if (id == 800) {
        icon.src = "asset/icon/clear.png";
      } else if (id >= 200 && id <= 232) {
        icon.src = "asset/icon/storm.png";
      } else if (id >= 600 && id <= 622) {
        icon.src = "asset/icon/snow.png";
      } else if (id >= 701 && id <= 781) {
        icon.src = "asset/icon/haze.png";
      } else if (id >= 801 && id <= 804) {
        icon.src = "asset/icon/cloud.png";
      } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
        icon.src = "asset/icon/rain.png";
      }

      city.innerHTML = nameValue + ", " + country;
      temp.innerHTML = tempValue + "°C";
      desc.innerHTML = descValue;
      humidity.innerHTML = humidityValue + "%";
      wind.innerHTML = windValue + " m/s";
      feelTemp.innerHTML = feelTempValue + "°C";
    })

    .catch((err) =>
      Swal.fire({
        icon: "error",
        title: "Wrong City Name!",
        text: "Please enter the city name correctly",
        confirmButtonColor: "#0d6efd",
        iconColor: "#dc3545",
      })
    );
}

function generateWeatherForecastByLatLon(lat, lon) {
  fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=a22fcfa23906b08e1118cb3b65c641fe&units=metric")
    .then((response) => response.json())
    .then((data) => {
      var weekPrediction = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      var monthsPredicition = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
      //Daily Forecast 1
      //Konfigurasi Hari
      let dt1 = data["list"][7]["dt"];
      var x1 = new Date(dt1 * 1000);
      var day1 = weekPrediction[x1.getDay()];
      var date1 = x1.getDate();
      var month1 = monthsPredicition[x1.getMonth()];
      var year1 = x1.getFullYear();
      var time1 = day1 + ", " + date1 + " " + month1 + " " + year1;

      //Konfigurasi Prakiraan Cuaca
      var id1 = data["list"][7]["weather"][0]["id"];
      var temp1 = data["list"][7]["main"]["temp"];
      var desc1 = data["list"][7]["weather"][0]["description"];

      //Konfigurasi Custom Icon
      if (id1 == 800) {
        iconPrediction1.src = "asset/icon/clear.png";
      } else if (id1 >= 200 && id1 <= 232) {
        iconPrediction1.src = "asset/icon/storm.png";
      } else if (id1 >= 600 && id1 <= 622) {
        iconPrediction1.src = "asset/icon/snow.png";
      } else if (id1 >= 701 && id1 <= 781) {
        iconPrediction1.src = "asset/icon/haze.png";
      } else if (id1 >= 801 && id1 <= 804) {
        iconPrediction1.src = "asset/icon/cloud.png";
      } else if ((id1 >= 300 && id1 <= 321) || (id1 >= 500 && id1 <= 531)) {
        iconPrediction1.src = "asset/icon/rain.png";
      }

      //Tampilkan di HTML
      timePrediction1.innerHTML = time1;
      tempPrediction1.innerHTML = temp1 + "°C";
      descPrediction1.innerHTML = desc1;

      //Daily Forecast 2
      //Konfigurasi Hari
      let dt2 = data["list"][15]["dt"];
      var x2 = new Date(dt2 * 1000);
      var day2 = weekPrediction[x2.getDay()];
      var date2 = x2.getDate();
      var month2 = monthsPredicition[x2.getMonth()];
      var year2 = x2.getFullYear();
      var time2 = day2 + ", " + date2 + " " + month2 + " " + year2;

      //Konfigurasi Prakiraan Cuaca
      var id2 = data["list"][15]["weather"][0]["id"];
      var temp2 = data["list"][15]["main"]["temp"];
      var desc2 = data["list"][15]["weather"][0]["description"];

      //Konfigurasi Custom Icon
      if (id2 == 800) {
        iconPrediction2.src = "asset/icon/clear.png";
      } else if (id2 >= 200 && id2 <= 232) {
        iconPrediction2.src = "asset/icon/storm.png";
      } else if (id2 >= 600 && id2 <= 622) {
        iconPrediction2.src = "asset/icon/snow.png";
      } else if (id2 >= 701 && id2 <= 781) {
        iconPrediction2.src = "asset/icon/haze.png";
      } else if (id2 >= 801 && id2 <= 804) {
        iconPrediction2.src = "asset/icon/cloud.png";
      } else if ((id2 >= 300 && id2 <= 321) || (id2 >= 500 && id2 <= 531)) {
        iconPrediction2.src = "asset/icon/rain.png";
      }

      //Tampilkan di HTML
      timePrediction2.innerHTML = time2;
      tempPrediction2.innerHTML = temp2 + "°C";
      descPrediction2.innerHTML = desc2;

      //Daily Forecast 3
      //Konfigurasi Hari
      let dt3 = data["list"][23]["dt"];
      var x3 = new Date(dt3 * 1000);
      var day3 = weekPrediction[x3.getDay()];
      var date3 = x3.getDate();
      var month3 = monthsPredicition[x3.getMonth()];
      var year3 = x3.getFullYear();
      var time3 = day3 + ", " + date3 + " " + month3 + " " + year3;

      //Konfigurasi Prakiraan Cuaca
      var id3 = data["list"][23]["weather"][0]["id"];
      var temp3 = data["list"][23]["main"]["temp"];
      var desc3 = data["list"][23]["weather"][0]["description"];

      //Konfigurasi Custom Icon
      if (id3 == 800) {
        iconPrediction3.src = "asset/icon/clear.png";
      } else if (id3 >= 200 && id3 <= 232) {
        iconPrediction3.src = "asset/icon/storm.png";
      } else if (id3 >= 600 && id3 <= 622) {
        iconPrediction3.src = "asset/icon/snow.png";
      } else if (id3 >= 701 && id3 <= 781) {
        iconPrediction3.src = "asset/icon/haze.png";
      } else if (id3 >= 801 && id3 <= 804) {
        iconPrediction3.src = "asset/icon/cloud.png";
      } else if ((id3 >= 300 && id3 <= 321) || (id3 >= 500 && id3 <= 531)) {
        iconPrediction3.src = "asset/icon/rain.png";
      }

      //Tampilkan di HTML
      timePrediction3.innerHTML = time3;
      tempPrediction3.innerHTML = temp3 + "°C";
      descPrediction3.innerHTML = desc3;

      //Daily Forecast 4
      //Konfigurasi Hari
      let dt4 = data["list"][31]["dt"];
      var x4 = new Date(dt4 * 1000);
      var day4 = weekPrediction[x4.getDay()];
      var date4 = x4.getDate();
      var month4 = monthsPredicition[x4.getMonth()];
      var year4 = x4.getFullYear();
      var time4 = day4 + ", " + date4 + " " + month4 + " " + year4;

      //Konfigurasi Prakiraan Cuaca
      var id4 = data["list"][31]["weather"][0]["id"];
      var temp4 = data["list"][31]["main"]["temp"];
      var desc4 = data["list"][31]["weather"][0]["description"];

      //Konfigurasi Custom Icon
      if (id4 == 800) {
        iconPrediction4.src = "asset/icon/clear.png";
      } else if (id4 >= 200 && id4 <= 232) {
        iconPrediction4.src = "asset/icon/storm.png";
      } else if (id4 >= 600 && id4 <= 622) {
        iconPrediction4.src = "asset/icon/snow.png";
      } else if (id4 >= 701 && id4 <= 781) {
        iconPrediction4.src = "asset/icon/haze.png";
      } else if (id4 >= 801 && id4 <= 804) {
        iconPrediction4.src = "asset/icon/cloud.png";
      } else if ((id4 >= 300 && id4 <= 321) || (id4 >= 500 && id4 <= 531)) {
        iconPrediction4.src = "asset/icon/rain.png";
      }

      //Tampilkan di HTML
      timePrediction4.innerHTML = time4;
      tempPrediction4.innerHTML = temp4 + "°C";
      descPrediction4.innerHTML = desc4;

      //Daily Forecast 5
      //Konfigurasi Hari
      let dt5 = data["list"][39]["dt"];
      var x5 = new Date(dt5 * 1000);
      var day5 = weekPrediction[x5.getDay()];
      var date5 = x5.getDate();
      var month5 = monthsPredicition[x5.getMonth()];
      var year5 = x5.getFullYear();
      var time5 = day5 + ", " + date5 + " " + month5 + " " + year5;

      //Konfigurasi Prakiraan Cuaca
      var id5 = data["list"][39]["weather"][0]["id"];
      var temp5 = data["list"][39]["main"]["temp"];
      var desc5 = data["list"][39]["weather"][0]["description"];

      //Konfigurasi Custom Icon
      if (id5 == 800) {
        iconPrediction5.src = "asset/icon/clear.png";
      } else if (id5 >= 200 && id5 <= 232) {
        iconPrediction5.src = "asset/icon/storm.png";
      } else if (id5 >= 600 && id5 <= 622) {
        iconPrediction5.src = "asset/icon/snow.png";
      } else if (id5 >= 701 && id5 <= 781) {
        iconPrediction5.src = "asset/icon/haze.png";
      } else if (id5 >= 801 && id5 <= 804) {
        iconPrediction5.src = "asset/icon/cloud.png";
      } else if ((id5 >= 300 && id5 <= 321) || (id5 >= 500 && id5 <= 531)) {
        iconPrediction5.src = "asset/icon/rain.png";
      }

      //Tampilkan di HTML
      timePrediction5.innerHTML = time5;
      tempPrediction5.innerHTML = temp5 + "°C";
      descPrediction5.innerHTML = desc5;
    });
}

function generateMap(lat, lon) {
  // Initialize the map and assign it to a variable for later use
  // there's a few ways to declare a VARIABLE in javascript.
  // you might also see people declaring variables using `const` and `let`
  var map = L.map("map", {
    // Set latitude and longitude of the map center (required)
    center: [lat, lon],
    // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
    zoom: 11,
  });

  // Create a Tile Layer and add it to the map
  var tiles = new L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: "5",
  }).addTo(map);

  var marker = L.marker([lat, lon], {
    draggable: true,
    title: "",
    opacity: 0.75,
  });

  marker.addTo(map);
  marker.on("dragend", function (event) {
    console.log(event);

    let lat = event.target._latlng.lat;
    let lon = event.target._latlng.lng;
    generateWeatherByLatLon(lat, lon);
    generateWeatherForecastByLatLon(lat, lon);
  });
}

function dateTime() {
  var now = new Date();
  var day = now.getDay();
  var date = now.getDate();
  var month = now.getMonth();
  var year = now.getFullYear();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  Number.prototype.pad = function (digits) {
    for (var n = this.toString(); n.length < digits; n = 0 + n);
    return n;
  };

  var months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  var week = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  var ids = ["hari", "tanggal", "bulan", "tahun", "jam", "menit", "detik"];
  var values = [week[day], date.pad(2), months[month], year, hour.pad(2), minute.pad(2), second.pad(2)];

  for (var i = 0; i < ids.length; i++) document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

function initClock() {
  dateTime();
  window.setInterval(dateTime, 1000);
}

//Konfigurasi ID Element HTML (Current Weather)
let searchCity = document.getElementById("searchCity");
let searchBtn = document.getElementById("btnSearch");
var city = document.getElementById("city");
var icon = document.getElementById("icon");
var temp = document.getElementById("temp");
var desc = document.getElementById("desc");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");
var feelTemp = document.getElementById("feelTemp");

//Konfigurasi ID Element HTML (Weather Prediction)
var timePrediction1 = document.getElementById("timePrediction1");
var iconPrediction1 = document.getElementById("iconPrediction1");
var tempPrediction1 = document.getElementById("tempPrediction1");
var descPrediction1 = document.getElementById("descPrediction1");
var timePrediction2 = document.getElementById("timePrediction2");
var iconPrediction2 = document.getElementById("iconPrediction2");
var tempPrediction2 = document.getElementById("tempPrediction2");
var descPrediction2 = document.getElementById("descPrediction2");
var timePrediction3 = document.getElementById("timePrediction3");
var iconPrediction3 = document.getElementById("iconPrediction3");
var tempPrediction3 = document.getElementById("tempPrediction3");
var descPrediction3 = document.getElementById("descPrediction3");
var timePrediction4 = document.getElementById("timePrediction4");
var iconPrediction4 = document.getElementById("iconPrediction4");
var tempPrediction4 = document.getElementById("tempPrediction4");
var descPrediction4 = document.getElementById("descPrediction4");
var timePrediction5 = document.getElementById("timePrediction5");
var iconPrediction5 = document.getElementById("iconPrediction5");
var tempPrediction5 = document.getElementById("tempPrediction5");
var descPrediction5 = document.getElementById("descPrediction5");

searchCity.addEventListener("keyup", function (event) {
  if (event.key == "Enter" && searchCity.value != "") {
    searchBtn.click();
  }
});

searchBtn.addEventListener("click", function () {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchCity.value + "&appid=a22fcfa23906b08e1118cb3b65c641fe&units=metric")
    .then((response) => response.json())
    .then((data) => {
      var nameValue = data["name"];
      var countryValue = data["sys"]["country"];
      let countryName = new Intl.DisplayNames(["EN"], { type: "region" });
      let country = countryName.of(countryValue);
      var id = data["weather"][0]["id"];
      var tempValue = data["main"]["temp"];
      var descValue = data["weather"][0]["description"];
      var humidityValue = data["main"]["humidity"];
      var windValue = data["wind"]["speed"];
      var feelTempValue = data["main"]["feels_like"];

      if (id == 800) {
        icon.src = "asset/icon/clear.png";
      } else if (id >= 200 && id <= 232) {
        icon.src = "asset/icon/storm.png";
      } else if (id >= 600 && id <= 622) {
        icon.src = "asset/icon/snow.png";
      } else if (id >= 701 && id <= 781) {
        icon.src = "asset/icon/haze.png";
      } else if (id >= 801 && id <= 804) {
        icon.src = "asset/icon/cloud.png";
      } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
        icon.src = "asset/icon/rain.png";
      }

      city.innerHTML = nameValue + ", " + country;
      temp.innerHTML = tempValue + "°C";
      desc.innerHTML = descValue;
      humidity.innerHTML = humidityValue + "%";
      wind.innerHTML = windValue + " m/s";
      feelTemp.innerHTML = feelTempValue + "°C";
    })

    .catch((err) =>
      Swal.fire({
        icon: "error",
        title: "Wrong City Name!",
        text: "Please enter the city name correctly",
        confirmButtonColor: "#0d6efd",
        iconColor: "#dc3545",
      })
    );
});

searchBtn.addEventListener("click", function () {
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity.value + "&appid=a22fcfa23906b08e1118cb3b65c641fe&units=metric")
    .then((response) => response.json())
    .then((data) => {
      var weekPrediction = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      var monthsPredicition = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
      //Daily Forecast 1
      //Konfigurasi Hari
      let dt1 = data["list"][7]["dt"];
      var x1 = new Date(dt1 * 1000);
      var day1 = weekPrediction[x1.getDay()];
      var date1 = x1.getDate();
      var month1 = monthsPredicition[x1.getMonth()];
      var year1 = x1.getFullYear();
      var time1 = day1 + ", " + date1 + " " + month1 + " " + year1;

      //Konfigurasi Prakiraan Cuaca
      var id1 = data["list"][7]["weather"][0]["id"];
      var temp1 = data["list"][7]["main"]["temp"];
      var desc1 = data["list"][7]["weather"][0]["description"];

      //Konfigurasi Custom Icon
      if (id1 == 800) {
        iconPrediction1.src = "asset/icon/clear.png";
      } else if (id1 >= 200 && id1 <= 232) {
        iconPrediction1.src = "asset/icon/storm.png";
      } else if (id1 >= 600 && id1 <= 622) {
        iconPrediction1.src = "asset/icon/snow.png";
      } else if (id1 >= 701 && id1 <= 781) {
        iconPrediction1.src = "asset/icon/haze.png";
      } else if (id1 >= 801 && id1 <= 804) {
        iconPrediction1.src = "asset/icon/cloud.png";
      } else if ((id1 >= 300 && id1 <= 321) || (id1 >= 500 && id1 <= 531)) {
        iconPrediction1.src = "asset/icon/rain.png";
      }

      //Tampilkan di HTML
      timePrediction1.innerHTML = time1;
      tempPrediction1.innerHTML = temp1 + "°C";
      descPrediction1.innerHTML = desc1;

      //Daily Forecast 2
      //Konfigurasi Hari
      let dt2 = data["list"][15]["dt"];
      var x2 = new Date(dt2 * 1000);
      var day2 = weekPrediction[x2.getDay()];
      var date2 = x2.getDate();
      var month2 = monthsPredicition[x2.getMonth()];
      var year2 = x2.getFullYear();
      var time2 = day2 + ", " + date2 + " " + month2 + " " + year2;

      //Konfigurasi Prakiraan Cuaca
      var id2 = data["list"][15]["weather"][0]["id"];
      var temp2 = data["list"][15]["main"]["temp"];
      var desc2 = data["list"][15]["weather"][0]["description"];

      //Konfigurasi Custom Icon
      if (id2 == 800) {
        iconPrediction2.src = "asset/icon/clear.png";
      } else if (id2 >= 200 && id2 <= 232) {
        iconPrediction2.src = "asset/icon/storm.png";
      } else if (id2 >= 600 && id2 <= 622) {
        iconPrediction2.src = "asset/icon/snow.png";
      } else if (id2 >= 701 && id2 <= 781) {
        iconPrediction2.src = "asset/icon/haze.png";
      } else if (id2 >= 801 && id2 <= 804) {
        iconPrediction2.src = "asset/icon/cloud.png";
      } else if ((id2 >= 300 && id2 <= 321) || (id2 >= 500 && id2 <= 531)) {
        iconPrediction2.src = "asset/icon/rain.png";
      }

      //Tampilkan di HTML
      timePrediction2.innerHTML = time2;
      tempPrediction2.innerHTML = temp2 + "°C";
      descPrediction2.innerHTML = desc2;

      //Daily Forecast 3
      //Konfigurasi Hari
      let dt3 = data["list"][23]["dt"];
      var x3 = new Date(dt3 * 1000);
      var day3 = weekPrediction[x3.getDay()];
      var date3 = x3.getDate();
      var month3 = monthsPredicition[x3.getMonth()];
      var year3 = x3.getFullYear();
      var time3 = day3 + ", " + date3 + " " + month3 + " " + year3;

      //Konfigurasi Prakiraan Cuaca
      var id3 = data["list"][23]["weather"][0]["id"];
      var temp3 = data["list"][23]["main"]["temp"];
      var desc3 = data["list"][23]["weather"][0]["description"];

      //Konfigurasi Custom Icon
      if (id3 == 800) {
        iconPrediction3.src = "asset/icon/clear.png";
      } else if (id3 >= 200 && id3 <= 232) {
        iconPrediction3.src = "asset/icon/storm.png";
      } else if (id3 >= 600 && id3 <= 622) {
        iconPrediction3.src = "asset/icon/snow.png";
      } else if (id3 >= 701 && id3 <= 781) {
        iconPrediction3.src = "asset/icon/haze.png";
      } else if (id3 >= 801 && id3 <= 804) {
        iconPrediction3.src = "asset/icon/cloud.png";
      } else if ((id3 >= 300 && id3 <= 321) || (id3 >= 500 && id3 <= 531)) {
        iconPrediction3.src = "asset/icon/rain.png";
      }

      //Tampilkan di HTML
      timePrediction3.innerHTML = time3;
      tempPrediction3.innerHTML = temp3 + "°C";
      descPrediction3.innerHTML = desc3;

      //Daily Forecast 4
      //Konfigurasi Hari
      let dt4 = data["list"][31]["dt"];
      var x4 = new Date(dt4 * 1000);
      var day4 = weekPrediction[x4.getDay()];
      var date4 = x4.getDate();
      var month4 = monthsPredicition[x4.getMonth()];
      var year4 = x4.getFullYear();
      var time4 = day4 + ", " + date4 + " " + month4 + " " + year4;

      //Konfigurasi Prakiraan Cuaca
      var id4 = data["list"][31]["weather"][0]["id"];
      var temp4 = data["list"][31]["main"]["temp"];
      var desc4 = data["list"][31]["weather"][0]["description"];

      //Konfigurasi Custom Icon
      if (id4 == 800) {
        iconPrediction4.src = "asset/icon/clear.png";
      } else if (id4 >= 200 && id4 <= 232) {
        iconPrediction4.src = "asset/icon/storm.png";
      } else if (id4 >= 600 && id4 <= 622) {
        iconPrediction4.src = "asset/icon/snow.png";
      } else if (id4 >= 701 && id4 <= 781) {
        iconPrediction4.src = "asset/icon/haze.png";
      } else if (id4 >= 801 && id4 <= 804) {
        iconPrediction4.src = "asset/icon/cloud.png";
      } else if ((id4 >= 300 && id4 <= 321) || (id4 >= 500 && id4 <= 531)) {
        iconPrediction4.src = "asset/icon/rain.png";
      }

      //Tampilkan di HTML
      timePrediction4.innerHTML = time4;
      tempPrediction4.innerHTML = temp4 + "°C";
      descPrediction4.innerHTML = desc4;

      //Daily Forecast 5
      //Konfigurasi Hari
      let dt5 = data["list"][39]["dt"];
      var x5 = new Date(dt5 * 1000);
      var day5 = weekPrediction[x5.getDay()];
      var date5 = x5.getDate();
      var month5 = monthsPredicition[x5.getMonth()];
      var year5 = x5.getFullYear();
      var time5 = day5 + ", " + date5 + " " + month5 + " " + year5;

      //Konfigurasi Prakiraan Cuaca
      var id5 = data["list"][39]["weather"][0]["id"];
      var temp5 = data["list"][39]["main"]["temp"];
      var desc5 = data["list"][39]["weather"][0]["description"];

      //Konfigurasi Custom Icon
      if (id5 == 800) {
        iconPrediction5.src = "asset/icon/clear.png";
      } else if (id5 >= 200 && id5 <= 232) {
        iconPrediction5.src = "asset/icon/storm.png";
      } else if (id5 >= 600 && id5 <= 622) {
        iconPrediction5.src = "asset/icon/snow.png";
      } else if (id5 >= 701 && id5 <= 781) {
        iconPrediction5.src = "asset/icon/haze.png";
      } else if (id5 >= 801 && id5 <= 804) {
        iconPrediction5.src = "asset/icon/cloud.png";
      } else if ((id5 >= 300 && id5 <= 321) || (id5 >= 500 && id5 <= 531)) {
        iconPrediction5.src = "asset/icon/rain.png";
      }

      //Tampilkan di HTML
      timePrediction5.innerHTML = time5;
      tempPrediction5.innerHTML = temp5 + "°C";
      descPrediction5.innerHTML = desc5;
    });
});
