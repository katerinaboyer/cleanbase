const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const floorSchema = new Schema({
    room_list :{
        type: Array
    },
    building_id: {
        type: String
    },
    desk_list: {
        type: Array
    },
    capacity: {
        type: Number
    }
}, {
  timestamps: true,
});

const Floor = mongoose.model('Floor', floorSchema);

module.exports = Floor;