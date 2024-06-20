import axios from 'axios';

const API_url = 'http://localhost:5001/api/transactions';

export const fetchtransactions = async () => {
    try {
        const response = await axios.get(API_url);
        console.log(response.data); 
        return response.data;
    } catch (error) {
        console.error("Error fetching the data:", error);
    }
};

fetchtransactions();
