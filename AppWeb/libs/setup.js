const cancha = require('../models/cancha.js')

const nuevasCanchas = () =>
    [
      { name: "Cancha1", site: "outdoor" },
      { name: "Cancha2", site: "outdoor" },
      { name: "CanchaTenis", site: "outdoor" },
      { name: "CanchaMultiuso", site: "indoor" },
    ];
  
  const setUpCanchas = async () => {
    await cancha.insertMany(nuevasCanchas());
  };

cancha.find().limit(1).exec((err, results) => {
if (err) {
    console.error(err);
    return;
} 
if (results.length > 0) {
    console.log('Canchas ya existentes');
    return;
}
setUpCanchas();
});
