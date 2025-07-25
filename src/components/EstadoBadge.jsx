import React from 'react';

const EstadoBadge = ({ estado }) => {
  const color = {
    'leído': 'bg-green-200 text-green-800',
    'por leer': 'bg-yellow-200 text-yellow-800',
    'abandonado': 'bg-red-200 text-red-800'
  }[estado] || 'bg-gray-200 text-gray-800';

  return (
    <span className={`inline-block px-2 py-1 text-xs rounded ${color}`}>
      {estado}
    </span>
  );
};

export default EstadoBadge;
