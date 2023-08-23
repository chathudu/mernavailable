const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  bod: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },  
  postedDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imagenic: {
    type: String,
    required: true,
  },
  imagepass: {
    type: String,
    required: true,
  },
  cloudinaryID: {
    type: String,
    required: true,
  },
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
