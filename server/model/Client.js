// TODO update this and define a Mongoose schema and model!
const mongoose = require("mongoose");
const ClientSchema = new mongoose.Schema( {
  _id: { type: String},
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true},
});
const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;