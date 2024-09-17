import React, { useEffect, useState } from 'react';
import api from '../api';

const Inventory: React.FC = () => {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const fetchEquipos = async () => {
      const response = await api.get('/equipos'); // Suponiendo que este es tu endpoint de equipos
      setEquipos(response.data);
    };

    fetchEquipos();
  }, []);

  return (
    <div>
      <h1>Inventario de Equipos</h1>
      <ul>
        {equipos.map((equipo) => (
          <li key={equipo.id}>{equipo.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
