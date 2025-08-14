
// import React, { useState, useEffect } from 'react';

// const SendMoneySection = () => {
//   const [formData, setFormData] = useState({
//     amount: '',
//     recipientCountry: 'UK' // Default to UK
//   });
//   const [fxRates, setFxRates] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [finalAmount, setFinalAmount] = useState(null);

//   const FX_API_URL = 'https://68976304250b078c2041c7fc.mockapi.io/api/wiremit/InterviewAPIS';

//   useEffect(() => {
//     const fetchFxRates = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(FX_API_URL);
//         const data = await response.json();
//         // Extracting GBP and ZAR rates from the nested array structure
//         const rates = data.reduce((acc, obj) => ({ ...acc, ...obj }), {});
//         setFxRates(rates);
//       } catch (e) {
//         setError('Failed to fetch FX rates.');
//       }
//       setLoading(false);
//     };

//     fetchFxRates();
//   }, []);

//   useEffect(() => {
//     // Recalculate final amount whenever form data or FX rates change
//     if (formData.amount && fxRates.GBP && fxRates.ZAR) {
//       const amountUSD = parseFloat(formData.amount);
//       if (isNaN(amountUSD) || amountUSD <= 0) {
//         setError('Please enter a valid amount.');
//         setFinalAmount(null);
//         return;
//       }
      
//       const fee = formData.recipientCountry === 'UK' ? 0.10 : 0.20;
//       const currencyRate = formData.recipientCountry === 'UK' ? fxRates.GBP.rate : fxRates.ZAR.rate; // Note: accessing the rate property
//       const feeAmount = amountUSD * fee;
      
//       const convertedAmount = (amountUSD - feeAmount) * currencyRate;
//       const roundedAmount = Math.ceil(convertedAmount); // Round UP
      
//       setFinalAmount(roundedAmount);
//       setError('');
//     }
//   }, [formData, fxRates]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // New function to handle the "Send Money" action
//   const handleSendMoney = () => {
//     if (finalAmount !== null) {
//       alert(`Transaction successful! Sending ${formData.amount} USD to ${formData.recipientCountry}. Recipient will receive approximately ${finalAmount} ${formData.recipientCountry === 'UK' ? 'GBP' : 'ZAR'}.`);
//     } else {
//       alert("Please enter a valid amount to send.");
//     }
//   };

//   return (
//     <div className="section-container">
//       <h2>Send Money</h2>
//       <p>Send money to the UK or South Africa</p>
      
//       <form className="send-money-form" onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
//         <div className="form-group">
//           <label htmlFor="amount">Amount in USD</label>
//           <input
//             type="number"
//             id="amount"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             required
//             min="1"
//             placeholder="Enter amount to send"
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="recipientCountry">Recipient Country</label>
//           <select
//             id="recipientCountry"
//             name="recipientCountry"
//             value={formData.recipientCountry}
//             onChange={handleChange}
//           >
//             <option value="UK">UK (GBP)</option>
//             <option value="South Africa">South Africa (ZAR)</option>
//           </select>
//         </div>
        
//         {/* The new "Send Money" button */}
//         <button 
//           type="button" // Use type="button" to prevent form submission
//           onClick={handleSendMoney}
//           disabled={loading || finalAmount === null}
//           className="auth-button"
//         >
//           Send Money
//         </button>

//       </form>
      
//       {loading && <div className="loading-message">Fetching exchange rates...</div>}
//       {error && <div className="error-message">{error}</div>}
      
//       {finalAmount !== null && (
//         <div className="transaction-summary">
//           <h3>Summary</h3>
//           <p>Recipient will receive: 
//             <strong> {finalAmount} {formData.recipientCountry === 'UK' ? 'GBP' : 'ZAR'}</strong>
//           </p>
//           <p>Transaction Fee: 
//             <strong> {formData.recipientCountry === 'UK' ? '10%' : '20%'}</strong>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SendMoneySection;
import React, { useState, useEffect } from 'react';
import Alert from './Alert'; // <-- Import the new Alert component

const SendMoneySection = () => {
  const [formData, setFormData] = useState({
    amount: '',
    recipientCountry: 'UK'
  });
  const [fxRates, setFxRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [finalAmount, setFinalAmount] = useState(null);
  const [alertMessage, setAlertMessage] = useState(''); // <-- New state for the alert message

  const FX_API_URL = 'https://68976304250b078c2041c7fc.mockapi.io/api/wiremit/InterviewAPIS';

  useEffect(() => {
    const fetchFxRates = async () => {
      setLoading(true);
      try {
        const response = await fetch(FX_API_URL);
        const data = await response.json();
        const rates = data.reduce((acc, obj) => ({ ...acc, ...obj }), {});
        setFxRates(rates);
      } catch (e) {
        setError('Failed to fetch FX rates.');
      }
      setLoading(false);
    };

    fetchFxRates();
  }, []);

  useEffect(() => {
    if (formData.amount && fxRates.GBP && fxRates.ZAR) {
      const amountUSD = parseFloat(formData.amount);
      if (isNaN(amountUSD) || amountUSD <= 0) {
        setError('Please enter a valid amount.');
        setFinalAmount(null);
        return;
      }
      
      const fee = formData.recipientCountry === 'UK' ? 0.10 : 0.20;
      const currencyRate = formData.recipientCountry === 'UK' ? fxRates.GBP.rate : fxRates.ZAR.rate;
      const feeAmount = amountUSD * fee;
      
      const convertedAmount = (amountUSD - feeAmount) * currencyRate;
      const roundedAmount = Math.ceil(convertedAmount);
      
      setFinalAmount(roundedAmount);
      setError('');
    }
  }, [formData, fxRates]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendMoney = () => {
    if (finalAmount !== null) {
      // Instead of an alert(), set the state with the new message
      setAlertMessage(`Transaction successful! Sending ${formData.amount} USD to ${formData.recipientCountry}. Recipient will receive approximately ${finalAmount} ${formData.recipientCountry === 'UK' ? 'GBP' : 'ZAR'}.`);
    } else {
      setAlertMessage("Please enter a valid amount to send.");
    }
  };

  // New function to close the alert
  const handleCloseAlert = () => {
    setAlertMessage('');
  };

  return (
    <>
      <div className="section-container">
        <h2>Send Money</h2>
        <p>Send money to the UK or South Africa</p>
        
        <form className="send-money-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="amount">Amount in USD</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="1"
              placeholder="Enter amount to send"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="recipientCountry">Recipient Country</label>
            <select
              id="recipientCountry"
              name="recipientCountry"
              value={formData.recipientCountry}
              onChange={handleChange}
            >
              <option value="UK">UK (GBP)</option>
              <option value="South Africa">South Africa (ZAR)</option>
            </select>
          </div>
          
          <button 
            type="button"
            onClick={handleSendMoney}
            disabled={loading || finalAmount === null}
            className="auth-button"
          >
            Send Money
          </button>

        </form>
        
        {loading && <div className="loading-message">Fetching exchange rates...</div>}
        {error && <div className="error-message">{error}</div>}
        
        {finalAmount !== null && (
          <div className="transaction-summary">
            <h3>Summary</h3>
            <p>Recipient will receive: 
              <strong> {finalAmount} {formData.recipientCountry === 'UK' ? 'GBP' : 'ZAR'}</strong>
            </p>
            <p>Transaction Fee: 
              <strong> {formData.recipientCountry === 'UK' ? '10%' : '20%'}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Render the new Alert component here */}
      <Alert message={alertMessage} onClose={handleCloseAlert} />
    </>
  );
};

export default SendMoneySection;