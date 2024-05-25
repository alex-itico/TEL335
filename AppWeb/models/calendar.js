const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    id_schedule: {  //i.e 1231;12
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
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Schedule', scheduleSchema);