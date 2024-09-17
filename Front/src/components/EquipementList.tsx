import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Equipment {
  _id: string;
  name: string;
  type: string;
  status: string;
  location: string;
  acquisitionDate: string;
}

const EquipmentList: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null); // Para manejar el equipo seleccionado
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/equipment', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEquipments(response.data.data);
      } catch (error) {
        console.error('Error fetching equipment data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, [token]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/equipment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEquipments(equipments.filter((equip) => equip._id !== id));
      alert('Equipo eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el equipo:', error);
      alert('Error al eliminar el equipo');
    }
  };

  const handleDetails = (equipment: Equipment) => {
    setSelectedEquipment(equipment); // Mostrar el equipo seleccionado en el pop-up
  };

  const closePopup = () => {
    setSelectedEquipment(null); // Cerrar el pop-up
  };

  const handleLogout = () => {
    // Eliminar token y rol del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Redirigir a la página de inicio de sesión
    navigate('/login');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Equipos</h2>
      {/* Botón para cerrar sesión */}
      <button onClick={handleLogout}>Cerrar Sesión</button>
      
      {role === 'admin' && (
        <button onClick={() => navigate('/AddEquipment')}>Agregar Equipo</button>
      )}
      <h3>Lista de Equipos</h3>
      <ul>
        {equipments.map((equip) => (
          <li key={equip._id}>
            {equip.name} - {equip.type}
            <button onClick={() => handleDetails(equip)}>Detalles</button>
            {role === 'admin' && (
              <button onClick={() => handleDelete(equip._id)}>Eliminar</button>
            )}
          </li>
        ))}
      </ul>

      {/* Pop-up para mostrar los detalles */}
      {selectedEquipment && (
        <div style={popupOverlayStyle} onClick={closePopup}>
          <div style={popupStyle} onClick={(e) => e.stopPropagation()}>
            <h3>{selectedEquipment.name}</h3>
            <p style={{ color: 'black' }}><strong>Tipo:</strong> {selectedEquipment.type}</p>
            <p style={{ color: 'black' }}><strong>Estado:</strong> {selectedEquipment.status}</p>
            <p style={{ color: 'black' }}><strong>Ubicacion:</strong> {selectedEquipment.location}</p>
            <p style={{ color: 'black' }}><strong>Fecha de adquisicion:</strong> {selectedEquipment.acquisitionDate}</p>
            <button onClick={closePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Estilos en línea para el pop-up y su overlay
const popupOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const popupStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'left',
  color: 'black', // Asegurar que todo el texto dentro del pop-up sea negro
};

export default EquipmentList;
