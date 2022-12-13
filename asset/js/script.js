function dateTime() {
  var now = new Date();
  var day = now.getDay();
  var date = now.getDate();
  var month = now.getMonth();
  var year = now.getFullYear();
  var hour = now.getHours();
  var minute = now.getMinutes();
  period = "AM";

  if (hour >= 12) {
    period = "PM";
  }
  if (hour == 0) {
    hour = 12;
  }
  if (hour > 12) {
    hour = hour - 12;
  }

  Number.prototype.pad = function (digits) {
    for (var n = this.toString(); n.length < digits; n = 0 + n);
    return n;
  };

  var months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  var week = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  var ids = ["hari", "tanggal", "bulan", "tahun", "jam", "menit", "periode"];
  var values = [week[day], date.pad(2), months[month], year, hour.pad(2), minute.pad(2), period];

  for (var i = 0; i < ids.length; i++) document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

function initClock() {
  dateTime();
  window.setInterval(dateTime, 1);
}
