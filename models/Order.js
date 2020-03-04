const { Schema, model } = require("mongoose");

const schema = new Schema({
  Id: {
    type: String,
    required: true
    // unique: true,
  },
  serviceName: {
    type: String,
    required: true
  },
  targetUrl: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  serviceActions: [
    {
      actionName: {
        type: String
      },
      Count: {
        type: String
      }
    }
  ]
});

module.exports = model("Order", schema);
