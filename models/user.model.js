const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  business_account_id: {
    type: Schema.Types.ObjectId
  }
},
{
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
