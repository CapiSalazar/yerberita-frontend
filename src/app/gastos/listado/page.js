'use client';

import { useEffect, useState } from 'react';

export default function ListadoGastosPage() {
  const [gastos, setGastos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGastos = async () => {
      const token = localStorage.getItem('token');

      try {
const res = await fetch('https://yerberita-backend-production.up.railway.app/api/expenses', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        console.log('🧾 Gastos recibidos:', data); // 👀 Verifica que llegan los datos

        if (!res.ok) throw new Error(data.error || 'Error al obtener gastos');

        setGastos(data.expenses || []); // 🔥 Si no hay gastos, lo dejamos como array vacío
        setCargando(false);
      } catch (err) {
        setError(err.message);
        setCargando(false);
      }
    };

    fetchGastos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-green-700 mb-6">💸 Listado de gastos</h1>

      {cargando && <p className="text-gray-500">Cargando gastos...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}
      {!cargando && gastos.length === 0 && (
        <p className="text-gray-600">No hay gastos registrados.</p>
      )}

      {!cargando && gastos.length > 0 && (
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-green-100">
            <tr>
              <th className="text-left p-2 border-b">📜 Concepto</th>
              <th className="text-left p-2 border-b">💰 Monto</th>
              <th className="text-left p-2 border-b">📌 Tipo</th>
              <th className="text-left p-2 border-b">🗓 Fecha</th>
            </tr>
          </thead>
          <tbody>
            {gastos.map(({ id, concept, amount, type, created_at }) => (
              <tr key={id} className="hover:bg-green-50">
                <td className="p-2 border-b">{concept}</td>
                <td className="p-2 border-b font-semibold">${parseFloat(amount).toFixed(2)}</td>
                <td className="p-2 border-b">{type === 'fijo' ? 'Fijo' : 'Variable'}</td>
                <td className="p-2 border-b">
                  {new Date(created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
