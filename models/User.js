const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  Id: {
    type: Types.ObjectId,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  Orders: [
    {
      type: Types.ObjectId,
      ref: 'Order',
    },
  ],
  token: {
    type: String,
  },
});

module.exports = model('User', schema);
