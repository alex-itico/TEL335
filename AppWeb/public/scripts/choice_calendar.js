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
  $cols.innerHTML = ''; // Limpiar el contenedor de horarios

  DAYS.forEach((day, indexDay) => {
    const col = document.createElement('div');
    const title = document.createElement('h5');
    title.className = 'hour__title';
    title.innerText = day;
    col.className = "hour__col";
    col.appendChild(title);

    HOURS.forEach((hour, indexHour) => {
      const radioBtn = document.createElement("input");
      radioBtn.type = "checkbox";
      radioBtn.name = `${day};${hour}`;
      radioBtn.id = `${weekDates[indexDay]};${HOURS_ID[indexHour]}`;
      radioBtn.value = `${weekDates[indexDay]};${HOURS_ID[indexHour]}`;
      radioBtn.style.display = "none";

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
}


async function getDaysFromDatabase(canchaId) {
  try {
    const response = await fetch(`http://localhost:3000/reservas?canchaId=${canchaId}`);
    if (!response.ok) {
      throw new Error('Error al obtener las reservas');
    }
    const reservas = await response.json();

    // Limpiar checkboxes anteriores
    document.querySelectorAll('.hour__label input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
      checkbox.dispatchEvent(new Event('change'));
    });

    reservas.forEach(reserva => {
      const checkboxId = `${reserva.date};${reserva.hour}`;
      const checkbox = document.getElementById(checkboxId);
      if (checkbox) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change'));
      }
    });
  } catch (error) {
    console.error('Error al cargar las reservas:', error);
  }
}

  

async function loadCanchas() {
  try {
    const response = await fetch('http://localhost:3000/canchas'); // Cambia esta URL si es necesario
    if (!response.ok) {
      throw new Error('Error al obtener las canchas');
    }
    const canchas = await response.json();
    const selectCanchas = document.getElementById('select-canchas');

    // Limpiar el select
    selectCanchas.innerHTML = '';

    canchas.forEach(cancha => {
      const option = document.createElement('option');
      option.value = cancha._id;
      option.textContent = cancha.name;
      selectCanchas.appendChild(option);
    });

    // Agregar el event listener para cambiar de cancha
    selectCanchas.addEventListener('change', function() {
      const selectedCanchaId = selectCanchas.value;
      getDaysFromDatabase(selectedCanchaId);
    });

    // Cargar reservas de la cancha seleccionada por defecto (si existe)
    if (canchas.length > 0) {
      getDaysFromDatabase(canchas[0]._id);
    }
  } catch (error) {
    console.error('Error al cargar las canchas:', error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
    fnRenderScheduler();
    loadCanchas();
});

document.querySelector('button[type="submit"]').addEventListener('click', async function (e) {
  e.preventDefault();

  // Obtener los datos del formulario
  const telefono = $('#telefono').value;
  const canchaId = $('#select-canchas').value;
  const selectedCheckbox = $cols.querySelector('.hour__label input[type="checkbox"]:checked');

  if (!selectedCheckbox) {
    alert('Por favor, selecciona una fecha y hora.');
    return;
  }

  const [date, hour] = selectedCheckbox.value.split(';');

  // Suponiendo que tienes el ID del usuario de alguna forma
  const userId = localStorage.getItem('userId'); // Debes obtener el userId de la manera adecuada

  const reservaData = {
    date: parseInt(date),
    hour: parseInt(hour),
    user: userId,
    cancha: canchaId,
    phone: telefono
  };

  try {
    const response = await fetch('http://localhost:3000/reservas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservaData)
    });

    if (!response.ok) {
      throw new Error('Error al crear la reserva');
    }

    const result = await response.json();
    alert('Reserva creada con éxito');
    // Aquí puedes agregar cualquier lógica adicional que necesites, como actualizar la UI
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    alert('Error al crear la reserva');
  }
});
