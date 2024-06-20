import React, { useEffect, useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';

import './App.css'
import axios from 'axios';
import CustomBarChart from './components/CustomBarChart';
const App = () => {
  const [month, setMonth] = useState(2); // 0 represents January, 1 represents February, etc.

  const [data,setdata]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5001/api/transactions")
    .then((response)=>{
      setdata(response.data);
        console.log(response.data);
       
    })
  },[])

  const [search ,setsearch]=useState("");

  const [priceRangeData, setPriceRangeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/pricerange'); // Adjust the URL to your API endpoint
        setPriceRangeData(response.data); // Assuming the API returns an array of data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
     
      
      <div className="circle">
         <h2>Transactions</h2>
      </div>
    

      <div className="search">
              <div className="search_info">

        <input type="text" placeholder='Search Transactions' value={search} onChange={(e)=>setsearch(e.target.value)} />
        <label>
        Select Month:
        <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
          <option value={0}>January</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>June</option>
          <option value={6}>July</option>
          <option value={7}>August</option>
          <option value={8}>September</option>
          <option value={9}>October</option>
          <option value={10}>November</option>
          <option value={11}>December</option>
        </select>
      </label>
      </div>
      </div>
      
      <hr />
      <TransactionsTable data={data} month={month}  search={search}/>
      <hr />
      <Statistics data={data} month={month}/>
      <hr />
    
      <CustomBarChart  month={month}/>
    </div>
  );
};

export default App;
