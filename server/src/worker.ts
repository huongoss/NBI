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

    try {
        // Fetch CSV data from the public URL
        const response = await axios.get(url, { responseType: 'stream' });

        // Create Mongoose schema using the extracted headers
        let dynamicSchema: mongoose.Schema;

        // Create Mongoose model
        let DynamicModel: mongoose.Model<DynamicDocument>;

        let counter = 0;
        const rows: any[] = [];
        // Use the response stream to parse CSV
        return new Promise((resolve, reject) => {
            response.data
                .pipe(csv({ quote: '\'' }))
                .on('headers', (headerList: string[]) => {
                    headerList.forEach(header => {
                        headers[header] = { type: String }; // Defaulting to String type for simplicity
                    });
                    dynamicSchema = new mongoose.Schema(headers);
                    DynamicModel = mongoose.model<DynamicDocument>('DynamicModel', dynamicSchema, 'nbi')
                })
                .on('data', async (row: any) => {
                    try {
                        // Save all rows to the database
                        console.log(counter++);
                        if (counter == 6423) {
                            console.log(row);
                        }
                        rows.push(row);
                    } catch (error) {
                        console.log('Error saving data:', error);
                        reject(error);
                    }
                })
                .on('end', async () => {

                    console.log('Writing to database...');
                    await DynamicModel.insertMany(rows);
                    resolve();
                    console.log('CSV file successfully processed');
                })
                .on('error', (error: any) => reject(error));
        });
    } catch (error) {
        console.error('Error fetching or processing the CSV:', error);
    }
}

// Create database from csv url.
export default async function readCSV(url: string) {
    try {
        // Connect to MongoDB.
        await mongoose.connect('mongodb://localhost:27017/nbi');
        // Drop old one for development
        const oldNBI = mongoose.model('nbi', new mongoose.Schema({}), 'nbi');
        oldNBI.collection.drop()
            .then(() => console.log('Collection dropped'))
            .catch((err) => console.error('Error dropping collection', err));
        await createSchemaAndSaveDataFromURL(url);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.connection.close();
    }
}
