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
    floor_number: {
        type: String
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
        type: Boolean, 
        default: true
    },
    is_clean: {
        type: Boolean,
        default: false
    }
}, {
  timestamps: true,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;