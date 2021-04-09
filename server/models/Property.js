const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  propertyId:{
    type: String,
    required: true
  },
  typeProperty: {
    type: String,
  },
  Street: {
    type: String,
  },
  House: {
    type: String,
  },
  Apartaments: {
    type: String,
  },
  fulladdres: {
    type: String,
  },
  countApartment: {
    type: String,
  },
  Space: {
    type: String,
  },
  Place: {
    type: String,
  },
  Title: {
    type: String,
  },
  last_name: {
    type: String,
  },
  first_name: {
    type: String,
  },
  user_image: {
    type: String,
  },
  phone: {
    type: String,
  },
  sketch3D: {
    type: String,
  },
  video: {
    type: String,
  },
  uploadedFile: {
    type: Object,
  },
  user_id:{
    type: String,
  },
  status:{
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Property = mongoose.model("Propertys", PropertySchema);
