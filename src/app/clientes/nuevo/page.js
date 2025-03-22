'use client';
import { useState } from 'react';

export default function NuevoClientePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [msg, setMsg] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      const res = await fetch('http://localhost:5000/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, telefono })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al crear cliente');

      setMsg('🎉 Cliente registrado correctamente');
      setName('');
      setEmail('');
      setTelefono('');
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
