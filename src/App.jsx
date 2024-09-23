import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import MonthlyView from './pages/MonthlyView/MonthlyView';
import KanbanBoard from './pages/KanbanBoard/KanbanBoard';
import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

  React.useEffect(() => {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [authToken]);

  return (
    <>
      <div className="app-container">
        <BrowserRouter>
          {/* Conditional Header based on authToken */}
          <Header authToken={authToken} setAuthToken={setAuthToken} />
          <main className="main-content">
            <Routes>
              {/* Show LandingPage only if user is not logged in */}
            <Route path="/" element={authToken ? <Navigate to="/calendar" /> : <LandingPage />} />
            <Route path="/login" element={<LoginPage setAuthToken={setAuthToken} />} />
            <Route path="/signup" element={<SignupPage setAuthToken={setAuthToken} />} />

            {/* Protected Routes */}
            <Route path="/calendar" element={authToken ? <MonthlyView /> : <Navigate to="/" />} />
            <Route path="/board" element={authToken ? <KanbanBoard /> : <Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;
