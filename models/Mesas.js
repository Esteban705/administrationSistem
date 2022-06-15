const {Schema, model } = require('mongoose');


const MesasSchema = Schema({
    number: {
        type: Number,
        require: true
    },
    id: {
        type: Number,
        require: true
    },
    url: {
        type: String,
        require: true
    }
})

module.exports = model('mesas', MesasSchema)