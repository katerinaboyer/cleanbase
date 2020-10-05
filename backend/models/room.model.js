const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    floor_id: {
        type: String
    },
    capacity: {
        type: Number
    },
    desk_list: {
        type: Array
    },
    room_type:{
        type: String
    },
}, {
  timestamps: true,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;