
import readCSV from "./worker";
// Connect to MongoDB and create test database.
// Worker mode.
console.log("Prepare database");
readCSV("https://www.fhwa.dot.gov/bridge/nbi/2024/delimited/PA24.txt");