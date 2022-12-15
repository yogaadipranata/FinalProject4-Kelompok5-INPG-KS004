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

let searchCity = document.getElementById("searchCity");
let searchBtn = document.getElementById("btnSearch");
var city = document.getElementById("city");
var icon = document.getElementById("icon");
var temp = document.getElementById("temp");
var desc = document.getElementById("desc");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");
var feelTemp = document.getElementById("feelTemp");

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

    .catch((err) => alert("Wrong city name!"));
});

searchBtn.addEventListener("click", function () {
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity.value + "&appid=a22fcfa23906b08e1118cb3b65c641fe&units=metric")
    .then((response) => response.json())
    .then((data) => {
      var dt1 = data["list"][6]["dt_txt"];

      var id1 = data["list"][6]["weather"][0]["id"];

      var temp1 = data["list"][6]["main"]["temp"];

      var desc1 = data["list"][6]["weather"][0]["description"];

      if (id1 == 800) {
        icon.src = "asset/icon/clear.png";
      } else if (id1 >= 200 && id1 <= 232) {
        icon.src = "asset/icon/storm.png";
      } else if (id1 >= 600 && id1 <= 622) {
        icon.src = "asset/icon/snow.png";
      } else if (id1 >= 701 && id1 <= 781) {
        icon.src = "asset/icon/haze.png";
      } else if (id1 >= 801 && id1 <= 804) {
        icon.src = "asset/icon/cloud.png";
      } else if ((id1 >= 300 && id1 <= 321) || (id1 >= 500 && id1 <= 531)) {
        icon.src = "asset/icon/rain.png";
      }

      timePrediction1.innerHTML = dt1;

      tempPrediction1.innerHTML = temp1 + "°C";

      descPrediction1.innerHTML = desc1;
    });
});
