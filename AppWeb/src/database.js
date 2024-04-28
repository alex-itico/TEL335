const mongoose = require('mongoose');

const connectToDatabase = () => {
    console.log('Intentando conectar a MongoDB...');

    mongoose.connect('mongodb://mongo:27017/databaseCanchas', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Conexión a MongoDB establecida');
    }).catch(err => {
        console.error('No se pudo conectar a MongoDB:', err);
    });
};

module.exports = connectToDatabase;

