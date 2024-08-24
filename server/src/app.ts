import express from "express";
import * as Api from "./api";
import mongoose from "mongoose";
const cors = require('cors');


// Create an Express.js app
const app = express();

// Connect to MongoDB.
mongoose.connect('mongodb://localhost:27017/nbi');

// Enable CORS Requests for dev purposes.
app.use(cors());
// Define a route to return the list of bridge locations
app.get("/nbi/location", Api.locationHandler);

// Start the server
const port = 3001; // Choose a port number
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});