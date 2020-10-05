const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buildingSchema = new Schema({
    building_admin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    capacity: {
        type: Number
    },
    floor_list: {
        type : [Schema.Types.ObjectId],
        ref: 'Floor',
        required: true
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