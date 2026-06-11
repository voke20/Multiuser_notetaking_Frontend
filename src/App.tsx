import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Auth/LoginPage'
import Register from './Pages/Auth/RegisterPage'
import Dashboard from './Pages/Dashbard/Dashboard'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import MyNotes from './Pages/Notes/MyNote/MyNotes'
import CreateNote from './Pages/Notes/CreateNote/CreateNote'
import EditNote from './Pages/Notes/EditNote/EditNote'
import SharedNotes from './Pages/Notes/SharedNotes/SharedNote'
import MySharedNotes from './Pages/Notes/MySharedNotes/MyShared'

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

        <Route path="/notes" element={
          <ProtectedRoute>
            <MyNotes />
          </ProtectedRoute>
        } />

        <Route path="/" element={
          <ProtectedRoute>
            <EditNote />
          </ProtectedRoute>
        } />

        <Route path="/notes/myshared" element={
          <ProtectedRoute>
            <MySharedNotes />
          </ProtectedRoute>
        } />

        <Route path="/notes/shared" element={
          <ProtectedRoute>
            <SharedNotes />
          </ProtectedRoute>
        } />
      </Routes>

      
    </Router>
  );
}

export default App;