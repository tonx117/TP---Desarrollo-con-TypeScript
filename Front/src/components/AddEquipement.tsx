import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const AddEquipment: React.FC = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [acquisitionDate, setAcquisitionDate] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/equipment', {
        name,
        type,
        status,
        location,
        acquisitionDate
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Producto agregado correctamente');
     // Redirigir a la lista de equipos

    } catch (error) {
      setError('Error al agregar el equipo');
    }
  };

  return (
    <div>
      <button onClick={() => navigate('/EquipmentList')}>Volver a la lista</button> {/* Redirección */}
      <h2>Agregar Equipo</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Tipo:</label>
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
        </div>
        <div>
          <label>Estado:</label>
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
        </div>
        <div>
          <label>Ubicación:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div>
          <label>Fecha de Adquisición:</label>
          <input type="date" value={acquisitionDate} onChange={(e) => setAcquisitionDate(e.target.value)} required />
        </div>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddEquipment;
