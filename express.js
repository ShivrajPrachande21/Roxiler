// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors'; // Import the cors package

const app = express();

// Use the cors middleware with specific origin
app.use(cors({ origin: 'http://localhost:5173' }));

const API_url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

app.get('/api/transactions', async (req, res) => {
    try {
        const response = await axios.get(API_url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching the data:', error.message);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
