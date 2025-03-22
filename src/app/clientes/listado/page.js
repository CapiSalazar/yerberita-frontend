'use client';
import { useEffect, useState } from 'react';

export default function ListadoClientesPage() {
  const [clientes, setClientes] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    const fetchClientes = async () => {
      try {
const res = await fetch('https://yerberita-backend-production.up.railway.app/api/customers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setClientes(data.customers || []);
      } catch (err) {
        console.error('Error al obtener clientes:', err);
      }
    };

    fetchClientes();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Listado de Clientes 🌿</h1>

      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-green-100">
          <tr>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Correo</th>
            <th className="p-2 border">Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="hover:bg-green-50">
              <td className="p-2 border">{cliente.name}</td>
              <td className="p-2 border">{cliente.email}</td>
              <td className="p-2 border">{cliente.telefono || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
