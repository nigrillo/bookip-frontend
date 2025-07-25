import React from 'react';

const EstadoLibroSelect = ({ value, onChange }) => {
  return (
    <div className="flex gap-4 items-center">
      <label>Estado:</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="text-black p-2 rounded-md"
      >
        <option value="leído">Leído</option>
        <option value="por leer">Por leer</option>
        <option value="abandonado">Abandonado</option>
      </select>
    </div>
  );
};

export default EstadoLibroSelect;
