import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/transactions.css';

const TransactionsTable = ({ month, search }) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const fetchTransactions = async (page) => {
    try {
      const response = await axios.get('http://localhost:5001/api/transactions', {
        params: {
          page: page,
          limit: transactionsPerPage,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [month, currentPage]);

  const filteredTransactions = transactions
    .filter((transaction) => {
      const transactionDate = new Date(transaction.dateOfSale);
      return transactionDate.getMonth() === month;
    })
    .filter((transaction) => {
      if (!search) return true;
      const searchTerm = search.toLowerCase();
      return (
        transaction.title.toLowerCase().includes(searchTerm) ||
        transaction.description.toLowerCase().includes(searchTerm) ||
        transaction.price.toString().includes(searchTerm) ||
        new Date(transaction.dateOfSale).toLocaleDateString().includes(searchTerm)
      );
    });

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className='trans'>
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default TransactionsTable;
