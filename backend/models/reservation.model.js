const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    title: {
        type: String,
    },
    room_id: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
    },
    room: {
        type: String
    },
    desk_id: {
        type: Schema.Types.ObjectId
    },
    desk: {
        type: String
    },
    start_time: {
        type: String,
    },
    end_time: {
        type: String,
    },
    date: {
        type: Date,
    },
    attendees: {
        type: [Schema.Types.ObjectId],
    }
}, {
  timestamps: true,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;