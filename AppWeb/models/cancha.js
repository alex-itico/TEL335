const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const canchaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    site: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Cancha', canchaSchema);