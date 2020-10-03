const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buildingSchema = new Schema({
    building_admin: {
        type: String
    },
    capacity: {
        type: Number
    },
    num_floors: {
        type: Number
    },
    address: {
        type: String
    },
    workers: {
        type: Array
    }
}, {
  timestamps: true,
});

const Building = mongoose.model('Building', buildingSchema);

module.exports = Building;