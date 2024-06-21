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
   <div className="container mt-5 ">
    <h1 style={{marginBottom:"20px"} } className="mb-4 text-success">Statistics - {monthNames[month]}</h1>
    <div className="row">
      <div className="col-4">
      <div class="card" >
          <ul class="list-group list-group-flush">
               <li class="list-group-item"><h5>Total Sale Amount</h5> </li>
               <li class="list-group-item"><h5>Total Sold Items :</h5></li>
               
               <li class="list-group-item"><h5>Total Not Sold Items:</h5></li>
         </ul>
        </div>
      </div>
      <div className="col-3">
      <div class="card" >
          <ul class="list-group list-group-flush">
               <li class="list-group-item">Rs. {totalSaleAmount}</li>
               <li class="list-group-item">{totalSoldItems}</li>
               <li class="list-group-item">{totalNotSoldItems}</li>
         </ul>
        </div>
      </div>
      <div className="col-4"></div>
    </div>
         
   
   </div>

  );
};

export default Statistics;
