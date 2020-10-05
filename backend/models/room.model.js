const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    floor_id: {
        type: Schema.Types.ObjectId,
        ref: 'Floor',
        required: true
    },
    capacity: {
        type: Number
    },
    desk_list: {
        type: [Schema.Types.ObjectId]
    },
    room_type:{
        type: String
    },
}, {
  timestamps: true,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;