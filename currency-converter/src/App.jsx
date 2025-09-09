import React, { useEffect } from 'react'
import './App.css'
import { useState } from 'react';
import './api/api';
import { getCurrencies, convertCurrency } from './api/api';

function App() {
const [amount, setAmount] = useState('');
const [result, setResult] = useState(null);
const[fromCurrency, setFromCurrency] = useState('NPR');
const[toCurrency, setToCurrency] = useState('USD');
const [currencies, setCurrencies] = useState([]);


useEffect(() => {
  const fetchCurrencies = async () => {
    const currencyList = await getCurrencies();
    setCurrencies(currencyList);
  };
  fetchCurrencies();
}, []);

// console.log('Current currencies state:', currencies);


// getCurrencies();
  return(
    <>
    <title>Currency Converter</title>

    <h1 className='header'>Currency Converter</h1>

    <div className='container'>

      <input className='input-box' type="number" placeholder='Enter the amount you want converted' value = {amount} onChange={async(e)=>{
      setAmount(e.target.value);
      if(e.target.value){
      const data = await convertCurrency(e.target.value, fromCurrency, toCurrency);
      setResult(data);
      }
     }
    } />

      <select name="fromCurrency" className='currency-select' value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
      {currencies.map((currency) => {
        return <option className='option-select' key={currency} value= {currency} > {currency}</option>
      })}
    </select>

    <select name="toCurrency" className='currency-select' value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
      {currencies.map((currency) => {
        return <option key={currency} value= {currency} > {currency}</option>
      })}
    </select>

  

    {result && <p>{amount} {fromCurrency} = {result} {toCurrency}</p>}
    </div>

    </>


  );
}

export default App;
