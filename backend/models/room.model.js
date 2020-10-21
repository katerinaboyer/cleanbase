const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    room_number: {
        type: String,
        required: true
    },
    floor_id: {
        type: Schema.Types.ObjectId,
        ref: 'Floor',
        required: true
    },
    capacity: {
        type: Number
    },
    // desk_list: {
    //     type: [Schema.Types.ObjectId],
    //     ref: 'Desk'
    // },
    room_type:{
        type: String
    },
    is_available: {
        type: Boolean
    },
    is_clean: {
        type: Boolean
    }
}, {
  timestamps: true,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;