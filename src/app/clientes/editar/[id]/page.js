'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function EditarCliente() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
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

  useEffect(() => {
    if (!id) return;

    fetch(`https://yerberita-backend-production.up.railway.app/api/customers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCliente(data.customer))
      .catch(() => setMsg('❌ Error al obtener datos del cliente'));
  }, [id]);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      const res = await fetch(`https://yerberita-backend-production.up.railway.app/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cliente),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al actualizar cliente');

      setMsg('✅ Cliente actualizado correctamente');
    } catch (error) {
      setMsg(`❌ ${error.message}`);
    }
  };

  if (!cliente) return <p className="text-center mt-10">Cargando cliente...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Editar Cliente 📝</h1>
      {msg && <p className="mb-4 text-sm text-center">{msg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            value={cliente.name || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={cliente.email || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-gray-700">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={cliente.telefono || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* Tipo de cliente - dropdown */}
        <div>
          <label className="block text-gray-700">Tipo de Cliente</label>
          <select
            name="tipo_cliente"
            value={cliente.tipo_cliente || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Selecciona uno</option>
            <option value="B2B">B2B</option>
            <option value="B2C">B2C</option>
          </select>
        </div>

        {/* Campos solo si es B2B */}
        {cliente.tipo_cliente === 'B2B' && (
          <>
            <div>
              <label className="block text-gray-700">Nombre de la Empresa</label>
              <input
                type="text"
                name="empresa"
                value={cliente.empresa || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700">Giro de la Empresa</label>
              <select
                name="giro_empresa"
                value={cliente.giro_empresa || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Selecciona un giro</option>
                {girosDisponibles.map((giro) => (
                  <option key={giro} value={giro}>{giro}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Red social */}
        <div>
          <label className="block text-gray-700">Red Social</label>
          <input
            type="text"
            name="red_social"
            value={cliente.red_social || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
