const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deskSchema = new Schema({
    building_id: {
        type: String
    },
    floor_id: {
        type: String
    },
    room_id: {
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

const Desk = mongoose.model('Desk', deskSchema);

module.exports = Desk;