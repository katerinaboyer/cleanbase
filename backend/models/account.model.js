const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  business_name: {
      type: String,
      required: true
  },
  office_manager: {
      type: [Schema.Types.ObjectId]
  },
  employees: {
      type: [Schema.Types.ObjectId]
  },
  floors_assigned: {
      type: [Schema.Types.ObjectId]
  }
}, {
  timestamps: true,
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;