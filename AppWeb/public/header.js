
document.addEventListener("DOMContentLoaded", function() {
  fetch("index.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;
      setUserName();
    });
});

function toggleMenu() {
  var subMenu = document.getElementById('subMenu');
  subMenu.classList.toggle('open-menu');
}

  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.href = '/login';

  }

  function setUserName() {
    console.log(localStorage);
    const userName = localStorage.getItem('name');
    if (userName) {
      document.getElementById('userName').textContent = `${userName}`;
    } else {
      window.location.href = '/login';
    }
  }
  
  function toggleAlert(){
    var subMenu = document.getElementById('alertMenu');
    subMenu.classList.toggle('open-alert');
  }
