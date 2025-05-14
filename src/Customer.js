import './App.css';
import { useEffect, useState } from 'react';

function Customer() {
  const [idTypes, setIdTypes] = useState([]);
  const [selectedIdType, setSelectedIdType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch('https://demos.issatec.com/Lobby-API-ACS/api/Customer/GetIdTypes/true')
      .then(res => res.json())
      .then(data => setIdTypes(data));
  }, []);

  const handleSearch = () => {
    if (!selectedIdType || !documentNumber) return;

    const url = `https://demos.issatec.com/Lobby-API-ACS/api/Customer/GetCustomerByIdTypeId/${documentNumber}/${selectedIdType}`;
    fetch(url)
      .then(res => res.json())
      .then(data => setCustomer(data));
  };

  const handleUpdate = () => {
    const payload = {
      Id: customer.Id,
      Sex: customer.Sex,
      IdTypeId: parseInt(selectedIdType),
      EMail: customer.EMail,
      DOB: customer.DOB,
      IsActive: customer.IsActive,
      LastName: customer.LastName,
      FirstName: customer.FirstName,
      PersonalId: customer.PersonalId,
      TelNumber1: customer.TelNumber1,
      TelNumber2: customer.TelNumber2,
      CustomerLevelId: customer.CustomerLevelId,
      ExtRef: customer.ExtRef
    };

    fetch('https://demos.issatec.com/Lobby-API-ACS/api/Customer/UpdateCustomer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(() => alert('Cliente actualizado correctamente'))
      .catch(() => alert('Error al actualizar cliente'));
  };

  return (
    <div style={{ padding: '20px 10px',   maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Editar cliente</h2>

      <div style={{ marginBottom: '15px' }}>
        <label>Tipo de documento:</label><br />
        <select
          value={selectedIdType}
          onChange={(e) => setSelectedIdType(e.target.value)}
          style={{ width: '100%' }}
        >
          <option value="">Seleccione un tipo de documento</option>
          {idTypes.map(t => (
            <option key={t.Id} value={t.Id}>{t.Description}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Número de documento:</label><br />
        <input
          type="text"
          placeholder="Número de documento"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <button onClick={handleSearch} style={{ marginBottom: '20px' }}>Buscar</button>

      {customer && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>Editar datos</h3>

          <div style={{ marginBottom: '10px' }}>
            <label>Nombre:</label><br />
            <input
              type="text"
              value={customer.FirstName}
              onChange={(e) => setCustomer({ ...customer, FirstName: e.target.value })}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Apellido:</label><br />
            <input
              type="text"
              value={customer.LastName}
              onChange={(e) => setCustomer({ ...customer, LastName: e.target.value })}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Correo:</label><br />
            <input
              type="email"
              value={customer.EMail}
              onChange={(e) => setCustomer({ ...customer, EMail: e.target.value })}
              style={{ width: '100%' }}
            />
          </div>

          <button onClick={handleUpdate} style={{ width: '100%' }}>Guardar cambios</button>
        </div>
      )}
    </div>
  );
}

export default Customer;
