import "./CurrencyConverter.css";
import { useState } from "react";
import { convertCurrency } from "../api/currencyApi";

const currencies = [
  "USD", // United States
  "EUR", // Eurozone
  "GBP", // United Kingdom
  "SEK", // Sweden
  "BDT", // Bangladesh
  "INR", // India
  "JPY", // Japan
  "CNY", // China
  "IDR", // Indonesia
  "AED", // UAE
  "KWD", // Kuwait
  "SAR", // Saudi Arabia
  "QAR", // Qatar
  "CAD", // Canada
  "AUD"  // Australia
];

function CurrencyConverter() {
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    try {
      setError("");
      const data = await convertCurrency(base, target, amount);
      setResult(data.convertedAmount);
    } catch (err) {
      setError("Currency conversion failed. Please try again.");
    }
  };

  return (
    <div className="converter-container">
      <h2>Currency Converter</h2>

      <label>From</label>
      <select value={base} onChange={(e) => setBase(e.target.value)}>
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>

      <label>To</label>
      <select value={target} onChange={(e) => setTarget(e.target.value)}>
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>

      <label>Amount</label>
      <input
        type="number"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleConvert}>Convert</button>

      {result && (
        <div className="converter-result">
          Converted Amount: <strong>{result}</strong>
        </div>
      )}

      {error && <div className="converter-error">{error}</div>}
    </div>
  );
}

export default CurrencyConverter;
