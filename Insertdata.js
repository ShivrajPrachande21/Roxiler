import axios from "axios";
import { MongoClient } from 'mongodb';

const apiUrl = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
const mongoUrl = 'mongodb+srv://shivrajprachande21:XSFbTtrz0wT1M0Q7@logindb.24hswiy.mongodb.net/?retryWrites=true&w=majority&appName=logindb';
const dbName = 'Seed';
const collectionName = 'Seeddata';

async function fetchData() {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function insertDataIntoMongoDB(data) {
  const client = new MongoClient(mongoUrl);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents were inserted`);

  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
  } finally {
    await client.close();
  }
}

(async () => {
  try {
    const data = await fetchData();
    await insertDataIntoMongoDB(data);
  } catch (error) {
    console.error('Error in main function:', error);
  }
})();
