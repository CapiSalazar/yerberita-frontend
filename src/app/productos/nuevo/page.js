'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NuevoProductoPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [costoProduccion, setCostoProduccion] = useState('');
  const [msg, setMsg] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price, costo_produccion: costoProduccion }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al crear producto');

      setMsg('🎉 Producto creado con éxito');
      setName('');
      setPrice('');
      setCostoProduccion('');
      router.push('/productos/listado'); // o donde se redireccione
    } catch (error) {
      setMsg(`❌ ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Nuevo Producto 🍯</h1>
      {msg && <p className="mb-4 text-sm text-center">{msg}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre del producto</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Precio de venta ($)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Costo de producción ($)</label>
          <input
            type="number"
            step="0.01"
            value={costoProduccion}
            onChange={(e) => setCostoProduccion(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Guardar producto
        </button>
      </form>
    </div>
  );
}
