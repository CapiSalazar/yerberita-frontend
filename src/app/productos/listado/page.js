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

        const res = await fetch('https://yerberita-backend-production.up.railway.app/api/products', {
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
    <th className="p-2 border">Nombre</th>
    <th className="p-2 border">Precio</th>
    <th className="p-2 border">Costo Producción</th> {/* Nuevo */}
    <th className="p-2 border">Acciones</th>
  </tr>
</thead>
<tbody>
  {productos.map((producto) => (
    <tr key={producto.id} className="hover:bg-green-50">
      <td className="p-2 border">{producto.name}</td>
      <td className="p-2 border">${parseFloat(producto.price).toFixed(2)}</td>
      <td className="p-2 border">${parseFloat(producto.costo_produccion).toFixed(2)}</td> {/* Nuevo */}
      <td className="p-2 border">
        {/* tus acciones */}
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
}
