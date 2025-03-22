'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
        console.error('❌ Error al obtener clientes:', err);
      }
    };

    fetchClientes();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-700">Listado de Clientes 🌿</h1>
        <Link
          href="/clientes/nuevo"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
        >
          ➕ Registrar nuevo
        </Link>
      </div>

      <table className="w-full border border-gray-300 text-left text-sm">
        <thead className="bg-green-100">
          <tr>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Correo</th>
            <th className="p-2 border">Teléfono</th>
            <th className="p-2 border">Tipo Cliente</th>
            <th className="p-2 border">Red Social</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="hover:bg-green-50">
              <td className="p-2 border">{cliente.name}</td>
              <td className="p-2 border">{cliente.email}</td>
              <td className="p-2 border">{cliente.telefono || '-'}</td>
              <td className="p-2 border">{cliente.tipo_cliente || '-'}</td>
              <td className="p-2 border">{cliente.red_social || '-'}</td>
              <td className="p-2 border text-blue-600 hover:underline">
                <Link href={`/clientes/editar/${cliente.id}`}>
                  ✏️ Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

