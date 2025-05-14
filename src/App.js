import './App.css';
import { useEffect, useState } from 'react';
import Customer from './Customer';

function App() {
  const [showEditor, setShowEditor] = useState(false);

  const [idTypes, setIdTypes] = useState([]);
  const [selectedIdType, setSelectedIdType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    fetch('https://demos.issatec.com/Lobby-API-ACS/api/Customer/GetIdTypes/true')
      .then(res => res.json())
      .then(data => setIdTypes(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      Id: 0,
      Sex: 0,
      IdTypeId: parseInt(selectedIdType),
      EMail: "",
      DOB: "0001-01-01T00:00:00",
      IsActive: true,
      LastName: lastName,
      FirstName: firstName,
      PersonalId: documentNumber,
      TelNumber1: "",
      TelNumber2: "",
      CustomerLevelId: 0,
      ExtRef: ""
    };

    fetch("https://demos.issatec.com/Lobby-API-ACS/api/Customer/UpdateCustomer", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(() => alert("Cliente creado correctamente"))
      .catch(() => alert("Error al crear cliente"));
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => setShowEditor(false)} style={{ margin: '20px' }}>Crear</button>
      <button onClick={() => setShowEditor(true)} style={{ margin: '20px' }}>Editar cliente</button>

      {!showEditor ? (
        <>
          <h2>Formulario de documento</h2>
          <form onSubmit={handleSubmit}>
            <label>Tipo de documento:</label> <br />
            <select
              value={selectedIdType}
              onChange={(e) => setSelectedIdType(e.target.value)}
            >
              <option value="">Seleccione un tipo de documento</option>
              {idTypes.map((type) => (
                <option key={type.Id} value={type.Id}>{type.Description}</option>
              ))}
            </select>
            <br /><br />

            <label>Número de documento:</label> <br />
            <input
              type="text"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
            />
            <br /><br />

            <label>Nombre:</label> <br />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br /><br />

            <label>Apellido:</label> <br />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <br /><br />

            <button type="submit">Guardar</button>
          </form>
        </>
      ) : (
        <Customer />
      )}
    </div>
  );
}

export default App;
