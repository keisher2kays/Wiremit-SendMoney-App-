

// import React, { useState, useEffect } from 'react';

// const mockAds = [
//   {
//     title: "Earn 5% Cashback on All Transfers!",
//     description: "Get rewarded for every transaction. Limited time offer."
//   },
//   {
//     title: "Invite a Friend, Get a $10 Bonus",
//     description: "Share the love! Both you and your friend get a bonus when they make their first transfer."
//   },
//   {
//     title: "First Transfer is Fee-Free!",
//     description: "Sending money for the first time? We'll waive the transfer fee."
//   }
// ];

// const MockAdsSection = () => {
//   const [currentAdIndex, setCurrentAdIndex] = useState(0);

//   useEffect(() => {
//     // Automatically transition to the next ad every 5 seconds
//     const interval = setInterval(() => {
//       setCurrentAdIndex((prevIndex) => (prevIndex + 1) % mockAds.length);
//     }, 5000);

//     return () => clearInterval(interval); // Clean up the interval on unmount
//   }, []);

//   const currentAd = mockAds[currentAdIndex];

//   return (
//     <div className="section-container">
//       <h2>Exclusive Offers</h2>
//       <div className="ads-carousel">
//         <div className="ad-card">
//           <h3>{currentAd.title}</h3>
//           <p>{currentAd.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MockAdsSection;

import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaUserPlus, FaPercent } from 'react-icons/fa';

const mockAds = [
  {
    title: "Earn 5% Cashback on All Transfers!",
    description: "Get rewarded for every transaction. Limited time offer.",
    icon: <FaMoneyBillWave /> 
  },
  {
    title: "Invite a Friend, Get a $10 Bonus",
    description: "Share the love! Both you and your friend get a bonus when they make their first transfer.",
    icon: <FaUserPlus />
  },
  {
    title: "First Transfer is Fee-Free!",
    description: "Sending money for the first time? We'll waive the transfer fee.",
    icon: <FaPercent />
  }
];

const MockAdsSection = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % mockAds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentAd = mockAds[currentAdIndex];

  return (
    <div className="section-container">
      <h2>Exclusive Offers</h2>
      <div className="ads-carousel">
        <div className="ad-card">
          <div className="ad-icon">
            {currentAd.icon}
          </div>
          <div className="ad-content">
            <h3>{currentAd.title}</h3>
            <p>{currentAd.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockAdsSection;