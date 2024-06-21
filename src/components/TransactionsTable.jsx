import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../components/transactions.css"


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
        transaction.id.toString().includes(searchTerm)||
        transaction.title.toLowerCase().includes(searchTerm) ||
        transaction.description.toLowerCase().includes(searchTerm) ||
        transaction.price.toString().includes(searchTerm) ||
        transaction.category.toString().includes(searchTerm) ||
        transaction.image.toString().includes(searchTerm) ||
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
      
      <div className="container">
      <h2 className='mt-5 mb-4'>Transactions</h2>
      <table class="table">
  <thead>
    <tr>
      <th scope="col" class="table-info">Id</th>
      <th scope="col" class="table-info">Title</th>
      <th scope="col" class="table-info">Description</th>
      <th scope="col" class="table-info">Price</th>
      <th scope="col" class="table-info">Category</th>
      <th scope="col" class="table-info">Image</th>
    </tr>
  </thead>
  <tbody >
    {
      filteredTransactions.map((transactions)=>(
        <tr className='border-bottom border-danger'>
          <td >{transactions.id}</td>
          <td >{transactions.title}</td>
          <td >{transactions.description}</td>
          <td >{transactions.price}</td>
          <td >{transactions.category}</td>
          <td >
            <img src={transactions.image} alt="" />
          </td>
        </tr>
      ))
    }
  
   
  </tbody>
</table>
      
      </div>
      <nav aria-label="...">
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item active" aria-current="page">
      <a class="page-link" href="#">2</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
    </div>
  );
};

export default TransactionsTable;
