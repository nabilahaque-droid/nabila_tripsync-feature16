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
  "AED", // Dubai / UAE
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
      setError("Conversion failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "30px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px"
      }}
    >
      <h2>Currency Converter</h2>

      {/* FROM */}
      <label>From</label>
      <select value={base} onChange={(e) => setBase(e.target.value)}>
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>

      {/* TO */}
      <label style={{ marginTop: "10px" }}>To</label>
      <select value={target} onChange={(e) => setTarget(e.target.value)}>
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>

      {/* AMOUNT */}
      <label style={{ marginTop: "10px" }}>Amount</label>
      <input
        type="number"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={handleConvert}
        style={{ marginTop: "15px", width: "100%" }}
      >
        Convert
      </button>

      {result && (
        <p style={{ marginTop: "15px" }}>
          Converted Amount: <strong>{result}</strong>
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default CurrencyConverter;
