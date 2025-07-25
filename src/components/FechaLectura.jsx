// FechaLectura.jsx
import React, { useEffect, useState } from 'react';

const generarDias = () => Array.from({ length: 31 }, (_, i) => i + 1);
const generarMeses = () => Array.from({ length: 12 }, (_, i) => i + 1);
const generarAnios = () => {
  const anioActual = new Date().getFullYear();
  return Array.from({ length: 100 }, (_, i) => anioActual - i);
};

// Extrae partes de la fecha "DD/MM/YYYY"
const parsearFecha = (fecha) => {
  if (!fecha || !fecha.includes('/')) return { dia: '', mes: '', anio: '' };
  const [dia, mes, anio] = fecha.split('/');
  return {
    dia: dia.padStart(2, '0'),
    mes: mes.padStart(2, '0'),
    anio,
  };
};

const FechaLectura = ({ fecha, onChange }) => {
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');

  // Inicializa valores cuando recibís una fecha
  useEffect(() => {
    const { dia, mes, anio } = parsearFecha(fecha);
    setDia(dia);
    setMes(mes);
    setAnio(anio);
  }, [fecha]);

  const handleChange = (nuevoDia, nuevoMes, nuevoAnio) => {
    setDia(nuevoDia);
    setMes(nuevoMes);
    setAnio(nuevoAnio);

    if (nuevoDia && nuevoMes && nuevoAnio) {
      const fechaFormateada = `${nuevoDia}/${nuevoMes}/${nuevoAnio}`;
      onChange(fechaFormateada);
    } else {
      onChange('');
    }
  };

  return (
    <div>
      <label className="block mb-1 text-white">Fecha de lectura:</label>
      <div className="flex gap-2">
        <select
          value={dia}
          onChange={(e) => handleChange(e.target.value, mes, anio)}
          className="p-2 rounded-md text-black"
        >
          <option value="">Día</option>
          {generarDias().map((d) => {
            const valor = String(d).padStart(2, '0');
            return (
              <option key={valor} value={valor}>
                {valor}
              </option>
            );
          })}
        </select>

        <select
          value={mes}
          onChange={(e) => handleChange(dia, e.target.value, anio)}
          className="p-2 rounded-md text-black"
        >
          <option value="">Mes</option>
          {generarMeses().map((m) => {
            const valor = String(m).padStart(2, '0');
            return (
              <option key={valor} value={valor}>
                {valor}
              </option>
            );
          })}
        </select>

        <select
          value={anio}
          onChange={(e) => handleChange(dia, mes, e.target.value)}
          className="p-2 rounded-md text-black"
        >
          <option value="">Año</option>
          {generarAnios().map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FechaLectura;
