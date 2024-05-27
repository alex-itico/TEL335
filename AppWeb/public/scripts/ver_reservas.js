const dict_hours_calendar = {'12':'1-2','34':'3-4','56':'5-6','78':'7-8','910':'9-10','1112':'11-12','1314':'13-14','1516':'15-16'};

document.addEventListener("DOMContentLoaded", async () => {
    const userEmail = localStorage.getItem('email'); // Asegúrate de almacenar el nombre de usuario en localStorage cuando el usuario inicie sesión
    if (!userEmail) {
      alert('No se ha encontrado información del usuario. Por favor, inicia sesión.');
      return;
    }
  
    try {
      const userResponse = await fetch(`/usuarios/${userEmail}`);
      if (!userResponse.ok) {
        throw new Error('Error al obtener el usuario');
      }
      const user = await userResponse.json();
      const reservasResponse = await fetch(`/reservas/${user._id}`);
      if (!reservasResponse.ok) {
        throw new Error('Error al obtener las reservas');
      }
      const reservas = await reservasResponse.json();
      const tbody = document.getElementById('reservas-body');
      tbody.innerHTML = ''; // Limpiar cualquier contenido anterior
  
      reservas.forEach(reserva => {
        reserva.date = `${reserva.date}`
        const tr = document.createElement('tr');
        const tdFecha = document.createElement('td');
        tdFecha.textContent = `${reserva.date.substring(6,8)}/${reserva.date.substring(4,6)}/${reserva.date.substring(0,4)}`;
  
        const tdHora = document.createElement('td');
        tdHora.textContent = dict_hours_calendar[reserva.hour];
  
        const tdCancha = document.createElement('td');
        tdCancha.textContent = reserva.cancha.name;
  
        const tdAcciones = document.createElement('td');
        const btnEdit = document.createElement('button');
        btnEdit.className = 'btn-action edit';
        btnEdit.textContent = 'Editar';
        btnEdit.addEventListener('click', () => {
          // Aquí puedes agregar la lógica para editar la reserva
          alert('Editar reserva');
        });
  
        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn-action delete';
        btnDelete.textContent = 'Cancelar';
        btnDelete.addEventListener('click', async () => {
          if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
            try {
              const deleteResponse = await fetch(`/reservas/${reserva._id}`, {
                method: 'DELETE',
              });
              if (deleteResponse.ok) {
                tr.remove();
                alert('Reserva cancelada con éxito');
              } else {
                alert('Error al cancelar la reserva');
              }
            } catch (error) {
              console.error('Error al cancelar la reserva:', error);
              alert('Error al cancelar la reserva');
            }
          }
        });
  
        tdAcciones.appendChild(btnEdit);
        tdAcciones.appendChild(btnDelete);
  
        tr.appendChild(tdFecha);
        tr.appendChild(tdHora);
        tr.appendChild(tdCancha);
        tr.appendChild(tdAcciones);
  
        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
      alert('Error al obtener las reservas');
    }
  });
  