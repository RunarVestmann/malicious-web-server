const { Schema } = require("mongoose");

module.exports = new Schema({
  email: { type: String },
  password: { type: String },
  ip: { type: String },
  agent: { type: String },
});
