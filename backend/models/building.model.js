const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buildingSchema = new Schema({
    building_admin: {
        type: Schema.Types.ObjectId,
    },
    num_floors: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number
    },
    address: {
        type: String,
        required: true
    },
    workers: {
        type: Array
    }
}, {
  timestamps: true,
});

const Building = mongoose.model('Building', buildingSchema);

module.exports = Building;