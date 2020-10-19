const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const floorSchema = new Schema({
    floor_number: {
        type: Number,
        required: true
    },
    room_list :{
        type: [Schema.Types.ObjectId],
        ref: 'Room',
        required: true
    },
    building_id: {
        type: String
    },
    capacity: {
        type: Number
    }
}, {
  timestamps: true,
});

const Floor = mongoose.model('Floor', floorSchema);

module.exports = Floor;