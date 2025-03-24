'use client';

import { useEffect, useState } from 'react';

export default function ListadoOrdenesPage() {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const fetchOrdenes = async () => {
    try {
      const res = await fetch('https://yerberita-backend-production.up.railway.app/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al obtener órdenes');

      setOrdenes(data);
      setCargando(false);
    } catch (err) {
      setError(err.message);
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchOrdenes();
  }, []);

  const marcarEntregada = async (id) => {
    try {
      const res = await fetch(`https://yerberita-backend-production.up.railway.app/api/orders/entregar/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_delivered: true }),
      });
  
      if (!res.ok) throw new Error('Error al marcar como entregada');
      fetchOrdenes(); // Refresh
    } catch (err) {
      alert(err.message);
    }
  };
  
  const marcarPagada = async (id) => {
    try {
      const res = await fetch(`https://yerberita-backend-production.up.railway.app/api/orders/pagar/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_paid: true }),
      });
  
      if (!res.ok) throw new Error('Error al marcar como pagada');
      fetchOrdenes(); // Refresh
    } catch (err) {
      alert(err.message);
    }
  };
  

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
              <th className="text-left p-2 border-b">🏭 Costo Producción</th>
              <th className="text-left p-2 border-b">🚚 Entregada</th>
              <th className="text-left p-2 border-b">💳 Pagada</th>
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
                  ${parseFloat(order.total_price || 0).toFixed(2)}
                </td>
                <td className="p-2 border-b">
                  ${parseFloat(order.total_costo_produccion || 0).toFixed(2)}
                </td>
                <td className="p-2 border-b">
                  {order.is_delivered ? (
                    <span className="text-green-700">
                      ✅ {new Date(order.delivered_at).toLocaleDateString()}
                    </span>
                  ) : (
                    <button
                      onClick={() => marcarEntregada(order.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Marcar como entregada
                    </button>
                  )}
                </td>
                <td className="p-2 border-b">
                  {order.is_paid ? (
                    <span className="text-green-700">
                      ✅ {new Date(order.paid_at).toLocaleDateString()}
                    </span>
                  ) : (
                    <button
                      onClick={() => marcarPagada(order.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Marcar como pagada
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
