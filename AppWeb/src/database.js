const mongoose = require('mongoose');

const connectToDatabase = () => {
    console.log('Intentando conectar a MongoDB...');

    mongoose.connect('mongodb://db:27017/canchas', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log('Conexión a MongoDB establecida');
    }).catch(err => {
        console.error('No se pudo conectar a MongoDB:', err);
    });
};

module.exports = connectToDatabase;
