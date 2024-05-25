const cancha = require('../models/cancha.js');

const nuevasCanchas = () => [
  { name: "Cancha 1", site: "outdoor" },
  { name: "Cancha 2", site: "outdoor" },
  { name: "Cancha Tenis", site: "outdoor" },
  { name: "Cancha Multiuso", site: "indoor" },
  { name: "Gimnasio", site: "indoor" },
  { name: "Cancha Beach Volley", site: "outdoor" },
];

const setUpCanchas = async () => {
  try {
    const canchasExist = await cancha.find().limit(1).exec();
    if (canchasExist.length === 0) {
      await cancha.insertMany(nuevasCanchas());
      console.log('Nuevas canchas insertadas.');
    } else {
      console.log('Canchas ya existentes en la base de datos.');
    }
  } catch (error) {
    console.error('Error al configurar las canchas:', error);
  }
};

setUpCanchas();