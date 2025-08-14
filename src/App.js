// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/LoginComponent';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
 

// function App() {
//   const [user, setUser] = useState(null);

//   const handleLogin = (loggedInUser) => {
//     setUser(loggedInUser);
//   };

//   const handleLogout = () => {
//     setUser(null);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login onLogin={handleLogin} />} />
//           <Route
//             path="/dashboard"
//             element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
//           />
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginComponent';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import './App.css'


function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;