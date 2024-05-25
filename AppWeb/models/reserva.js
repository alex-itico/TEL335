const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservaSchema = new Schema({
    id_reserva: {  //i.e 1231;12
        type: String,
        required: true
    },
    date: {         //i.e 20241201
        type: Number,
        required: true
    },
    hour: {         //i.e 12
        type: Number,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cancha:{
        type: Schema.Types.ObjectId,
        ref: 'Cancha',
        required: true
    },
    phone:{
        type: String,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Reserva', reservaSchema);