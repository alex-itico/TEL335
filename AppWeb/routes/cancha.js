const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const canchaSchema = new Schema({
    name: {         //i.e 20241201
        type: String,
        required: true
    },
    site: {         //i.e 12
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
    versionKey: false
});



module.exports = mongoose.model('Cancha', canchaSchema);