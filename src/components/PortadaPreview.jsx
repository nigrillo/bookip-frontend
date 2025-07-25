import React from 'react';

const PortadaPreview = ({ url }) => {
  if (!url) return null;

  return (
    <div className="flex justify-center">
      <img
        src={url}
        alt="Portada del libro"
        className="w-32 h-auto rounded-md shadow-md"
      />
    </div>
  );
};

export default PortadaPreview;
