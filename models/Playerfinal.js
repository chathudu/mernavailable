const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlayerSchemafinal = new Schema({
  userID: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  namewithinitial: {
    type: String,
    required: true,
  },
  bod: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  currentoc: {
    type: String,
    required: true,
  },
  previosoc: {
    type: String,
    required: true,
  },
  qulificationyear: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },  
  watsapp: {
    type: String,
    required: true,
  },  
  email: {
    type: String,
    required: true,
  },  
  nic: {
    type: String,
    required: true,
  },  
  passport: {
    type: String,
    required: true,
  },  
  currentstatus: {
    type: String,
    required: true,
  },  
  previosclub: {
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

const Playerfinal = mongoose.model("Playerfinal", PlayerSchemafinal);

module.exports = Playerfinal;
