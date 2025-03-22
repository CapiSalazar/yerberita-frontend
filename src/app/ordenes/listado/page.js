'use client';

import { useEffect, useState } from 'react';

export default function ListadoOrdenesPage() {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrdenes = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await fetch('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        console.log('🧾 Órdenes recibidas:', data); // <-- Aquí

        if (!res.ok) throw new Error(data.error || 'Error al obtener órdenes');

        setOrdenes(data); // ahora es un array de objetos { order, products }
        setCargando(false);
      } catch (err) {
        setError(err.message);
        setCargando(false);
      }
    };

    fetchOrdenes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-green-700 mb-6">📋 Historial de órdenes</h1>

      {cargando && <p className="text-gray-500">Cargando órdenes...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}
      {!cargando && ordenes.length === 0 && (
        <p className="text-gray-600">No hay órdenes registradas.</p>
      )}

      {!cargando && ordenes.length > 0 && (
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-green-100">
            <tr>
              <th className="text-left p-2 border-b">👤 Cliente</th>
              <th className="text-left p-2 border-b">🗓 Fecha</th>
              <th className="text-left p-2 border-b">📦 Productos</th>
              <th className="text-left p-2 border-b">💰 Total</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map(({ order, products }) => (
              <tr key={order.id} className="hover:bg-green-50 align-top">
                <td className="p-2 border-b">{order.customer}</td>
                <td className="p-2 border-b">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="p-2 border-b">
                  <ul className="list-disc pl-4 text-gray-700">
                    {products.map((p, i) => (
                      <li key={i}>
                        {p.name} x {p.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-2 border-b font-semibold">
                  ${parseFloat(order.total_price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
