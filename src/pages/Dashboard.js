import React from 'react';
import SendMoneySection from './SendMoneySection';
import MockAdsSection from './MockAdsSection';
import TransactionHistory from './TransactionHistory';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </header>
      <div className="dashboard-content">
        <SendMoneySection />
        <MockAdsSection />
        <TransactionHistory />
      </div>
    </div>
  );
};

export default Dashboard;