import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [converted, setConverted] = useState("");
  

  useEffect(() => {
    async function convert() {
      try {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        if (data.rates && data.rates[toCurrency]) {
          setConverted(data.rates[toCurrency]);
        } else {
          setConverted('Error');
        }
      } catch (error) {
        console.error('Conversion error:', error);
        setConverted('Error');
      }
    }
    convert();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="app">
      <h1>Currency Converter</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        <option value="INR">INR</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        {/* Add more currencies as needed */}
      </select>
      <span> to </span>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        <option value="INR">INR</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        {/* Add more currencies as needed */}
      </select>
      <h2>{converted} {toCurrency}</h2>
    </div>
  );
}

export default App;
