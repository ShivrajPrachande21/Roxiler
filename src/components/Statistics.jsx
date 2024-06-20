import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/statistics.css'

const Statistics = ({ month }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await axios.get('http://localhost:5001/api/transactions');
      setTransactions(response.data);
    };

    fetchTransactions();
  }, [month]);

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.dateOfSale);
    return transactionDate.getMonth() === month;
  });

  const totalSaleAmount = filteredTransactions.reduce((total, transaction) => total + transaction.price, 0);
  const totalSoldItems = filteredTransactions.length;
  const totalNotSoldItems = transactions.length - totalSoldItems;


  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];


  return (
   <div className="container">
    <h1 style={{marginBottom:"20px"}}>Statistics - {monthNames[month]}</h1>
    <div className="content">
    <table cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <td>Total Sale Amount :</td>
          <td>{totalSaleAmount}</td>
          
        </tr>
        <tr>
        <td>Total Sold Items :</td>
        <td>{totalSoldItems}</td>
        
        </tr>
        <tr>
        <td>Total Not Sold Items:</td>
        <td>{totalNotSoldItems}</td>
        
        </tr>
      </tbody>
    </table>
    </div>
   </div>
  );
};

export default Statistics;
