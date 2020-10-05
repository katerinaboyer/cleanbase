const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deskSchema = new Schema({
    room_id: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
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