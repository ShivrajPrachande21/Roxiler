import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomBarChart = ({ month }) => {
    const [barData, setBarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const fetchBarData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5001/api/transactions');
            const data = response.data;
            
            // Filter data based on the selected month
            const filteredData = data.filter(item => {
                const saleDate = new Date(item.dateOfSale);
                return saleDate.getMonth() === month;
            });

            // Calculate the number of items in each price range
            const priceRanges = [
                { range: '0-100', count: 0 },
                { range: '101-200', count: 0 },
                { range: '201-300', count: 0 },
                { range: '301-400', count: 0 },
                { range: '401-500', count: 0 },
                { range: '501-600', count: 0 },
                { range: '601-700', count: 0 },
                { range: '701-800', count: 0 },
                { range: '801-900', count: 0 },
                { range: '901-above', count: 0 }
            ];

            filteredData.forEach(item => {
                if (item.price >= 0 && item.price <= 100) priceRanges[0].count++;
                else if (item.price > 100 && item.price <= 200) priceRanges[1].count++;
                else if (item.price > 200 && item.price <= 300) priceRanges[2].count++;
                else if (item.price > 300 && item.price <= 400) priceRanges[3].count++;
                else if (item.price > 400 && item.price <= 500) priceRanges[4].count++;
                else if (item.price > 500 && item.price <= 600) priceRanges[5].count++;
                else if (item.price > 600 && item.price <= 700) priceRanges[6].count++;
                else if (item.price > 700 && item.price <= 800) priceRanges[7].count++;
                else if (item.price > 800 && item.price <= 900) priceRanges[8].count++;
                else if (item.price > 900) priceRanges[9].count++;
            });

            setBarData(priceRanges);
        } catch (err) {
            setError('Error fetching bar chart data');
            console.error('Error fetching bar chart data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBarData();
    }, [month]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <h1 style={{ marginLeft: "50px", marginBottom: "50px" }}>
                Bar Chart Stats - {monthNames[month]}
            </h1>
            <BarChart
                width={1000}
                height={500}
                data={barData}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </>
    );
};

export default CustomBarChart;
