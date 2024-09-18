import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../public/EquipmentList.css'; // Importa el CSS personalizado

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
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null); 
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
    setSelectedEquipment(equipment); 
  };

  const closePopup = () => {
    setSelectedEquipment(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="equipment-container">
      <h2>Equipos</h2>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      
      {role === 'admin' && (
        <button 
          className="add-equipment-btn" 
          onClick={() => navigate('/AddEquipment')}
        >
          Agregar Equipo
        </button>
      )}
      <h3>Lista de Equipos</h3>
      <ul className="equipment-list">
        {equipments.map((equip) => (
          <li key={equip._id}>
            {equip.name} - {equip.type}
            <div>
              <button onClick={() => handleDetails(equip)}>Detalles</button>
              {role === 'admin' && (
                <button onClick={() => handleDelete(equip._id)}>Eliminar</button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {selectedEquipment && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedEquipment.name}</h3>
            <p><strong>Tipo:</strong> {selectedEquipment.type}</p>
            <p><strong>Estado:</strong> {selectedEquipment.status}</p>
            <p><strong>Ubicacion:</strong> {selectedEquipment.location}</p>
            <p><strong>Fecha de adquisicion:</strong> {selectedEquipment.acquisitionDate}</p>
            <button onClick={closePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentList;
