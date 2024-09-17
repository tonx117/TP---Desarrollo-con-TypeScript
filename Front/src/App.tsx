import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/Protectedroute';
import Inventory from './components/Inventory';
import EquipmentList from './components/EquipementList';
import AddEquipment from './components/AddEquipement';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redirigir la raíz ("/") a la página de login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        {/* Nueva ruta para el registro */}
        <Route path="/register" element={<Register />} />

        <Route path="/EquipmentList" element={
          <ProtectedRoute>
            <EquipmentList />
          </ProtectedRoute>
        } />

        <Route path="/AddEquipment" element={
          <ProtectedRoute>
            <AddEquipment />
          </ProtectedRoute>
        } />

        {/* Otras rutas protegidas */}
        <Route path="/inventory" element={
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
