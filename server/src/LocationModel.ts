import mongoose from "mongoose";

// Define a schema
const LocationSchema = new mongoose.Schema({
  STRUCTURE_NUMBER_008: String,
  LAT_016: String,
  LONG_017: String
}, { strict: false });

// Create a dynamic model
const LocationModel = mongoose.model('LocationModel', LocationSchema, 'nbi');

export default LocationModel;