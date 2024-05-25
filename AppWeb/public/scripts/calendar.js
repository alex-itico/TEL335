const $ = (select) => document.querySelector(select);
const $$ = (select) => document.querySelectorAll(select);

let cancha = 0;
const $form = $('#form');
const $cols = $('#cols');
const DAYS = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
const HOURS = ['1-2', '3-4', '5-6', '7-8', '9-10','11-12','13-14','15-16'];
const HOURS_ID = ['12','34','56','78','910','1112','1314','1516'];

function getWeekDates() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const distanceToMonday = (dayOfWeek + 6) % 7; // Distance from today to Monday
    const monday = new Date(now); // Create a copy of the current date
    monday.setDate(now.getDate() - distanceToMonday);

    const dates = [];
    for (let i = 0; i < 5; i++) { // Monday to Friday
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        const formattedDate = `${date.getFullYear()}${date.getMonth() + 1<10? `0${date.getMonth() + 1}`: date.getMonth() + 1}${date.getDate()<10? `0${date.getDate()}`: date.getDate()}`;
        dates.push(formattedDate);
    }
    return dates;
}

const weekDates = getWeekDates();

function fnRenderScheduler() {
    DAYS.forEach((day, indexDay) => {
        console.log(day);
        const col = document.createElement('div');
        const title = document.createElement('h5');
        title.className = 'hour__title';
        title.innerText = day;
        col.className = "hour__col";
        col.appendChild(title);
        HOURS.forEach((hour,indexHour) => {
            const radioBtn = document.createElement("input");
            radioBtn.type = "checkbox";
            radioBtn.disabled = true;
            radioBtn.name = `${day};${hour}`;
            radioBtn.id = `${weekDates[indexDay]};${HOURS_ID[indexHour]}`;
            radioBtn.value = `${weekDates[indexDay]};${HOURS_ID[indexHour]}`;
            radioBtn.style.display = "none";
            console.log(radioBtn.id);
            const radioBtnLabel = document.createElement("label");
            radioBtnLabel.className = 'hour__label';
            const radioBtnContent = document.createElement("span");
            radioBtnContent.className = 'hour__label-content';
            radioBtnContent.innerText = hour;

            radioBtnLabel.appendChild(radioBtn);
            radioBtnLabel.appendChild(radioBtnContent);
            col.appendChild(radioBtnLabel);

            // Agrega el event listener para cambiar la clase del label
            radioBtn.addEventListener('change', function () {
                if (radioBtn.checked) {
                    radioBtnLabel.classList.add('selected');
                } else {
                    radioBtnLabel.classList.remove('selected');
                }
            });
        });

        $cols.appendChild(col);
    });
    getDaysFromDatabase();
}

function getDaysFromDatabase() {
  // cuando se haga el fetch, se va a enviar el id de la cancha que quiero
  ['20240520;12', '20240520;34', '20240524;34', '20240522;1112'].forEach((day) => {
      const checkbox = document.getElementById(day);
      if (checkbox) {
          checkbox.checked = true;
          checkbox.dispatchEvent(new Event('change'));
      }
  });
}

document.addEventListener("DOMContentLoaded", function () {
    fnRenderScheduler();
    
});

$form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData($form);
    formData.forEach((value, key) => {
        console.log(value);
    });
});
