const mongoose = require("mongoose");
const requestSchema = require("./schemas/request");

const connection = mongoose.createConnection(
  `mongodb+srv://admin:${process.env.DB_PASSWORD}@csda-final-project.qmddv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = {
  RequestModel: connection.model("RequestModel", requestSchema),
};
