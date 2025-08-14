// import axios from 'axios';

// const API_BASE_URL = 'https://68976304250b078c2041c7fc.mockapi.io/api/wiremit/InterviewAPIS';

// // Create axios instance with default config
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add request interceptor for logging
// apiClient.interceptors.request.use(
//   (config) => {
//     console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error('Request error:', error);
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor for error handling
// apiClient.interceptors.response.use(
//   (response) => {
//     console.log('API Response received:', response.status);
//     return response;
//   },
//   (error) => {
//     console.error('Response error:', error);
    
//     if (error.code === 'ECONNABORTED') {
//       throw new Error('Request timeout - please check your connection');
//     }
    
//     if (error.response?.status === 404) {
//       throw new Error('API endpoint not found');
//     }
    
//     if (error.response?.status >= 500) {
//       throw new Error('Server error - please try again later');
//     }
    
//     throw new Error('Network error - please check your connection');
//   }
// );

// /**
//  * Fetch exchange rates from the API
//  * @returns {Promise<Object>} Exchange rates object
//  */
// export const fetchExchangeRates = async () => {
//   try {
//     console.log('Fetching exchange rates...');
//     const response = await apiClient.get('');
    
//     // Log the raw response for debugging
//     console.log('Raw API response:', response.data);
    
//     // Transform the array response to a flat object
//     const ratesArray = response.data;
//     const ratesObject = {};
    
//     ratesArray.forEach(rateItem => {
//       const currency = Object.keys(rateItem)[0];
//       const rate = rateItem[currency];
//       ratesObject[currency] = rate;
//     });
    
//     console.log('Processed exchange rates:', ratesObject);
    
//     // Validate that we have the required currencies
//     if (!ratesObject.GBP || !ratesObject.ZAR) {
//       console.warn('Missing required currencies in API response');
//     }
    
//     return ratesObject;
    
//   } catch (error) {
//     console.error('Error fetching exchange rates:', error.message);
    
//     // Return fallback rates if API fails
//     const fallbackRates = {
//       USD: 1,
//       GBP: 0.74,
//       ZAR: 17.75,
//       USDT: 1
//     };
    
//     console.log('Using fallback rates:', fallbackRates);
//     return fallbackRates;
//   }
// };

// /**
//  * Validate exchange rates object
//  * @param {Object} rates - Exchange rates object
//  * @returns {boolean} Whether rates are valid
//  */
// export const validateExchangeRates = (rates) => {
//   if (!rates || typeof rates !== 'object') {
//     return false;
//   }
  
//   const requiredCurrencies = ['USD', 'GBP', 'ZAR'];
//   return requiredCurrencies.every(currency => 
//     currency in rates && 
//     typeof rates[currency] === 'number' && 
//     rates[currency] > 0
//   );
// };

// /**
//  * Get specific exchange rate
//  * @param {Object} rates - All exchange rates
//  * @param {string} currency - Target currency
//  * @returns {number} Exchange rate or 1 if not found
//  */
// export const getExchangeRate = (rates, currency) => {
//   return rates[currency] || 1;
// };

// export default {
//   fetchExchangeRates,
//   validateExchangeRates,
//   getExchangeRate
// };

import axios from 'axios';

const API_BASE_URL = 'https://68976304250b078c2041c7fc.mockapi.io/api/wiremit/InterviewAPIS';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error);

    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - please check your connection');
    }

    if (error.response?.status === 404) {
      throw new Error('API endpoint not found');
    }

    if (error.response?.status >= 500) {
      throw new Error('Server error - please try again later');
    }

    throw new Error('Network error - please check your connection');
  }
);

/**
 * Fetch exchange rates from the API
 * @returns {Promise<Object>} Exchange rates object
 */
export const fetchExchangeRates = async () => {
  try {
    console.log('Fetching exchange rates...');
    const response = await apiClient.get('');

    // Log the raw response for debugging
    console.log('Raw API response:', response.data);

    // Transform the array response to a flat object
    const ratesArray = response.data;
    const ratesObject = {};

    ratesArray.forEach(rateItem => {
      const currency = Object.keys(rateItem)[0];
      const rate = rateItem[currency];
      ratesObject[currency] = rate;
    });

    console.log('Processed exchange rates:', ratesObject);

    // Validate that we have the required currencies
    if (!ratesObject.GBP || !ratesObject.ZAR) {
      console.warn('Missing required currencies in API response');
    }

    return ratesObject;

  } catch (error) {
    console.error('Error fetching exchange rates:', error.message);

    // Return fallback rates if API fails
    const fallbackRates = {
      USD: 1,
      GBP: 0.74,
      ZAR: 17.75,
      USDT: 1
    };

    console.log('Using fallback rates:', fallbackRates);
    return fallbackRates;
  }
};

/**
 * Validate exchange rates object
 * @param {Object} rates - Exchange rates object
 * @returns {boolean} Whether rates are valid
 */
export const validateExchangeRates = (rates) => {
  if (!rates || typeof rates !== 'object') {
    return false;
  }

  const requiredCurrencies = ['USD', 'GBP', 'ZAR'];
  return requiredCurrencies.every(currency =>
    currency in rates &&
    typeof rates[currency] === 'number' &&
    rates[currency] > 0
  );
};

/**
 * Get specific exchange rate
 * @param {Object} rates - All exchange rates
 * @param {string} currency - Target currency
 * @returns {number} Exchange rate or 1 if not found
 */
export const getExchangeRate = (rates, currency) => {
  return rates[currency] || 1;
};

// ✅ Named export object to satisfy ESLint
const apiExports = {
  fetchExchangeRates,
  validateExchangeRates,
  getExchangeRate
};

export default apiExports;
