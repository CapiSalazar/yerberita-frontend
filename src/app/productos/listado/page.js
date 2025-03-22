'use client';

import { useEffect, useState } from 'react';

export default function ListadoProductosPage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await fetch('http://localhost:5000/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Error al obtener productos');

        setProductos(data.products);
        setCargando(false);
      } catch (err) {
        setError(err.message);
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-green-700 mb-6">📦 Lista de productos</h1>

      {cargando && <p className="text-gray-500">Cargando productos...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}

      {!cargando && productos.length === 0 && (
        <p className="text-gray-600">No hay productos registrados.</p>
      )}

      {!cargando && productos.length > 0 && (
        <table className="w-full border border-gray-200">
          <thead className="bg-green-100">
            <tr>
              <th className="text-left p-2 border-b">🛍 Producto</th>
              <th className="text-left p-2 border-b">💰 Precio</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id} className="hover:bg-green-50">
                <td className="p-2 border-b">{p.name}</td>
                <td className="p-2 border-b">${parseFloat(p.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
