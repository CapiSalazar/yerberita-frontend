'use client';
import { useState } from 'react';

export default function NuevoClientePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoCliente, setTipoCliente] = useState('');
  const [redSocial, setRedSocial] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [giroEmpresa, setGiroEmpresa] = useState('');
  const [msg, setMsg] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const girosDisponibles = [
    "Cafetería",
    "Restaurante",
    "Tienda Natural",
    "Herbolaria",
    "Veterinaria",
    "Corporativo",
    "Gimnasio",
    "Spa",
    "Distribuidora",
    "Otro"
  ];

  console.log('📤 Enviando datos:', {
    name,
    email,
    telefono,
    tipo_cliente: tipoCliente,
    red_social: redSocial,
    empresa: tipoCliente === 'B2B' ? empresa : null,
    giro_empresa: tipoCliente === 'B2B' ? giroEmpresa : null
  });
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    const telefonoValido = /^\d{10}$/.test(telefono);
    if (telefono && !telefonoValido) {
      setMsg('❌ El teléfono debe tener exactamente 10 dígitos (México)');
      return;
    }

    try {
      const res = await fetch('https://yerberita-backend-production.up.railway.app/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email,
          telefono,
          tipo_cliente: tipoCliente,
          red_social: redSocial,
          empresa: tipoCliente === 'B2B' ? empresa : null,
          giro_empresa: tipoCliente === 'B2B' ? giroEmpresa : null
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al crear cliente');

      setMsg('🎉 Cliente registrado correctamente');
      setName('');
      setEmail('');
      setTelefono('');
      setTipoCliente('');
      setRedSocial('');
      setEmpresa('');
      setGiroEmpresa('');
    } catch (error) {
      setMsg(`❌ ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Registrar Cliente 🌿</h1>

      {msg && <p className="mb-4 text-sm text-center">{msg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Correo electrónico</label>
          <input
            type="email"
            className="w-full border border-gray-300 p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Teléfono</label>
          <input
            type="tel"
            className="w-full border border-gray-300 p-2 rounded"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700">Tipo de Cliente</label>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={tipoCliente}
            onChange={(e) => setTipoCliente(e.target.value)}
          >
            <option value="">Selecciona uno</option>
            <option value="B2B">B2B</option>
            <option value="B2C">B2C</option>
          </select>
        </div>

        {tipoCliente === 'B2B' && (
          <>
            <div>
              <label className="block text-gray-700">Nombre de la Empresa</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700">Giro de la Empresa</label>
              <select
                className="w-full border border-gray-300 p-2 rounded"
                value={giroEmpresa}
                onChange={(e) => setGiroEmpresa(e.target.value)}
              >
                <option value="">Selecciona un giro</option>
                {girosDisponibles.map((giro) => (
                  <option key={giro} value={giro}>
                    {giro}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block text-gray-700">Red Social</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={redSocial}
            onChange={(e) => setRedSocial(e.target.value)}
            placeholder="@cliente_insta"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Guardar cliente
        </button>
      </form>
    </div>
  );
}
