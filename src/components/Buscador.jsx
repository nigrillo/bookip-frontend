const Buscador = ({ valor, onChange, onBuscar }) => {
  return (
    <div>
      <input
        type="text"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por título o autor"
      />
      <button onClick={onBuscar}>Buscar</button>
    </div>
  );
};

export default Buscador;
