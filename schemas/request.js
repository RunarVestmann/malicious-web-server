const { Schema } = require("mongoose");

module.exports = new Schema({
  agent: { type: String },
  ip: { type: String },
  date: { type: Date, default: () => new Date() },
});
