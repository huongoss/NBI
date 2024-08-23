import axios from 'axios';
import mongoose, { Document } from 'mongoose';
import csv from 'csv-parser';

// Define an interface for the dynamic model
interface DynamicDocument extends Document {
    [key: string]: any;
}

// Function to create a Mongoose schema from a CSV file URL and save data to MongoDB
async function createSchemaAndSaveDataFromURL(url: string): Promise<void> {
    const headers: { [key: string]: any } = {};
    const dataRows: string[] = [];

    try {
        // Fetch CSV data from the public URL
        // Test Auth
        const test = await axios.get("https://www.fhwa.dot.gov/bridge/nbi/disclaim.cfm?nbiYear=2022/delimited&nbiState=PA22");
        console.log(test.data);
        const response = await axios.get(url, { responseType: 'stream' });

        // Use the response stream to parse CSV
        return new Promise((resolve, reject) => {
            response.data
                .pipe(csv())
                .on('headers', (headerList: string[]) => {
                    headerList.forEach(header => {
                        headers[header] = { type: String }; // Defaulting to String type for simplicity
                    });
                })
                .on('data', (row: string) => {
                    console.log(row);
                    dataRows.push(row);
                })
                .on('end', async () => {
                    try {
                        // Create Mongoose schema using the extracted headers
                        const dynamicSchema = new mongoose.Schema(headers);

                        // Create Mongoose model
                        const DynamicModel = mongoose.model<DynamicDocument>('DynamicModel', dynamicSchema);

                        // Save all rows to the database
                        await DynamicModel.insertMany(dataRows);
                        console.log('All data saved to MongoDB');

                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                })
                .on('error', (error: any) => reject(error));
        });
    } catch (error) {
        console.error('Error fetching or processing the CSV:', error);
    }
}

// Example usage
export default async function readCSV(url: string) {
    try {
        await createSchemaAndSaveDataFromURL(url);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.connection.close();
    }
}
