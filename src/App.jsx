import React from "react";
import { useState } from "react";
import { currencyConverter } from "./api/postApi";

const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [convertedAmount, setconvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleConvert = async ()=>{
    setLoading(true)
    setError(null)
    try {
     const res =  await currencyConverter(fromCurrency, toCurrency, amount)
     const {conversion_result} = await res.data
      setconvertedAmount(conversion_result)
      
    } catch (error) {
      setError("Error fetching conversion rate")
      console.error(error);
      
      
    }

    setLoading(false)

  }


  return (
    <section className="">
      <div className="">
        <h1>Currency Converter</h1>
        <label htmlFor="amount">
          Amount
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <div>
          <label htmlFor="fromCurrency">
            From
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="PKR">PKR</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
              <option value="CAD">CAD</option>
              <option value="SGD">SGD</option>
              <option value="CHF">CHF</option>
              <option value="MYR">MYR</option>
              <option value="JPY">JPY</option>
              <option value="CNY">CNY</option>
              <option value="NZD">NZD</option>
            </select>
          </label>
        </div>
        <div>
          <label
            htmlFor="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            To
            <select id="toCurrency">
              <option value="PKR">PKR</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
              <option value="SGD">SGD</option>
              <option value="CHF">CHF</option>
              <option value="MYR">MYR</option>
              <option value="USD">USD</option>
              <option value="AUD">AUD</option>
              <option value="JPY">JPY</option>
              <option value="CNY">CNY</option>
              <option value="NZD">NZD</option>
            </select>
          </label>
        </div>
        <button disabled={loading || amount <=0} onClick={handleConvert}>
          {loading ? "Converting..." : "Convert"}
        </button>
        {convertedAmount && (
          <p>
            {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
          </p>
        )}
        {error && <p>{error}</p>}
      </div>
    </section>
  );
};

export default App;
