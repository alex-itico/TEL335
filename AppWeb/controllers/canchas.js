const cancha_model = require('../models/cancha.js');

const getCanchas = async (req, res) => {
  try {
    const canchas = await cancha_model.find({});
    res.json(canchas);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener las canchas' });
  }
};

module.exports = { getCanchas };