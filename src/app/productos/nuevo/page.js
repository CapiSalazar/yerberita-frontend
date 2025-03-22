'use client';

import { useState } from 'react';

export default function NuevoProductoPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      return setMensaje({ tipo: 'error', texto: 'Todos los campos son obligatorios' });
    }

    try {
      const token = localStorage.getItem('token'); // Asegúrate de tener el token almacenado

      const res = await fetch('https://yerberita-backend-production.up.railway.app/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al crear producto');
      }

      setMensaje({ tipo: 'exito', texto: 'Producto creado correctamente ✅' });
      setName('');
      setPrice('');
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-green-700 mb-4">➕ Registrar nuevo producto</h1>

      {mensaje && (
        <div
          className={`p-2 mb-4 rounded ${
            mensaje.tipo === 'exito' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Nombre del producto</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Miel Orgánica 500g"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Precio</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ej. 120"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Guardar producto
        </button>
      </form>
    </div>
  );
}
