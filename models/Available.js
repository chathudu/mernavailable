const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AvailableSchema = new Schema({
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
  surename: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  confirmpaticipation: {
    type: String,
    required: true,
  },
  dateparticipation: {
    type: String,
    required: true,
  },
  accommodation : {
    type: String,
    required: true,
  }, 
  accommodationdate : {
    type: String,
    required: true,
  },  
  attendweight : {
    type: String,
    required: true,
  },
  role : {
    type: String,
    required: true,
  },
  letter : {
    type: String,
    required: true,
  },
  letteryes : {
    type: String,
    required: true,
  },
  food : {
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
  cloudinaryID: {
    type: String,
    required: true,
  },
});

const Available = mongoose.model("Available", AvailableSchema);

module.exports = Available;
