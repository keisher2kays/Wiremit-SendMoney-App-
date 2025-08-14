// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Login = ({ onLogin }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     // Get stored users from localStorage
//     const storedUsers = JSON.parse(localStorage.getItem('wiremit_users') || '[]');
    
//     // Find matching user
//     const user = storedUsers.find(u => 
//       u.email === formData.email && u.password === formData.password
//     );

//     setTimeout(() => {
//       if (user) {
//         onLogin(user);
//       } else {
//         setError('Invalid email or password');
//       }
//       setLoading(false);
//     }, 1000);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <div className="auth-header">
//           <h1>Wiremit</h1>
//           <h2>Welcome Back</h2>
//           <p>Sign in to send money to your loved ones</p>
//         </div>

//         <form onSubmit={handleSubmit} className="auth-form">
//           {error && <div className="error-message">{error}</div>}
          
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               placeholder="Enter your password"
//             />
//           </div>

//           <button type="submit" disabled={loading} className="auth-button">
//             {loading ? 'Signing In...' : 'Sign In'}
//           </button>
//         </form>

//         <div className="auth-footer">
//           <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Get stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('wiremit_users') || '[]');
    
    // --- CONSOLE TRACING START ---
    console.log('--- LOGIN ATTEMPT ---');
    console.log('Stored Users:', storedUsers); // Shows all users from local storage
    console.log('Form Data:', formData); // Shows the email and password the user entered
    // --- CONSOLE TRACING END ---

    // Find matching user
    const user = storedUsers.find(u => 
      u.email === formData.email && u.password === formData.password
    );

    // --- CONSOLE TRACING START ---
    console.log('Found User:', user); // Logs the user object if found, otherwise 'undefined'
    // --- CONSOLE TRACING END ---

    setTimeout(() => {
      if (user) {
        onLogin(user);
        navigate('/dashboard'); // Use the navigate hook here for redirection
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Wiremit</h1>
          <h2>Welcome Back</h2>
          <p>Sign in to send money to your loved ones</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;