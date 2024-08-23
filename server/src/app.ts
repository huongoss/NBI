import mongoose from "mongoose";
import readCSV from "./prepare";
// Connect to MongoDB and run the script
mongoose.connect('mongodb://localhost:27017/your-database', {})
    .then(() => {
        console.log('Connected to MongoDB');

        readCSV("https://www.fhwa.dot.gov/bridge/nbi/2022/delimited/PA22.txt");
        //readCSV("https://google.com");
    })
    .catch((err: any) => console.error('Could not connect to MongoDB', err));