import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Auth/LoginPage'
import Register from './Pages/Auth/RegisterPage'
import Dashboard from './Pages/Dashbard/Dashboard'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
          } />
        
      </Routes>
    </Router>
  );
}

export default App;