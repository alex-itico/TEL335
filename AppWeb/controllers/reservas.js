const reserva_model = require('../models/reserva.js');

const getReservas = async (req, res) => {
  try {
    const { canchaId } = req.query;  // Obtener el id de la cancha de la query si es necesario
    const reservas = await reserva_model.find({ cancha: canchaId });  // Filtrar por cancha si es necesario
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener las reservas' });
  }
};

const createReserva = async (req, res) => {
  try {
    const { date, hour, user, cancha, phone } = req.body;

    // Validación básica (puedes agregar más validaciones según tus necesidades)
    if (!date || !hour || !user || !cancha || !phone) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const nuevaReserva = new Reserva({
      id_reserva: `${date};${hour}`, // o cualquier lógica que necesites para generar el id_reserva
      date,
      hour,
      user,
      cancha,
      phone
    });

    await nuevaReserva.save();
    res.status(201).json({ message: 'Reserva creada con éxito', reserva: nuevaReserva });
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    res.status(500).json({ message: 'Error al crear la reserva', error });
  }
};



module.exports = { getReservas , createReserva};