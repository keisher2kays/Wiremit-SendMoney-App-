import React, { useState
  } from 'react';

const mockTransactions = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  date: `2025-08-${String(25 - i).padStart(2, '0')}`,
  amountSent: (Math.random() * 500 + 50).toFixed(2),
  currencySent: 'USD',
  amountReceived: (Math.random() * 500 * (i % 2 === 0 ? 0.74 : 17.75)).toFixed(2),
  currencyReceived: i % 2 === 0 ? 'GBP' : 'ZAR',
  recipient: i % 2 === 0 ? 'Jane Doe' : 'John Smith'
}));

const ITEMS_PER_PAGE = 10;

const TransactionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockTransactions.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTransactions = mockTransactions.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="section-container">
      <h2>Transaction History</h2>
      
      {mockTransactions.length > 0 ? (
        <>
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount Sent</th>
                <th>Amount Received</th>
                <th>Recipient</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map(tx => (
                <tr key={tx.id}>
                  <td>{tx.date}</td>
                  <td>{tx.amountSent} {tx.currencySent}</td>
                  <td>{tx.amountReceived} {tx.currencyReceived}</td>
                  <td>{tx.recipient}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={currentPage === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionHistory;