'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function EditarCliente() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [msg, setMsg] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    if (!id) return;

    console.log("🧠 ID del cliente:", id);

    fetch(`https://yerberita-backend-production.up.railway.app/api/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
        {['name', 'email', 'telefono', 'tipo_cliente', 'red_social'].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 capitalize">{field.replace('_', ' ')}</label>
            <input
              type="text"
              name={field}
              value={cliente[field] || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required={field === 'name' || field === 'email'}
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
