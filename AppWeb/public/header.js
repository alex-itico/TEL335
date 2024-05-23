
document.addEventListener("DOMContentLoaded", function() {
  fetch("index.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;
    });
});
