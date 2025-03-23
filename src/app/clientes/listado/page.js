'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ListadoClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('name');
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

  // 🔍 Filtrado por búsqueda
  const clientesFiltrados = clientes
    .filter((c) => {
      const query = busqueda.toLowerCase();
      return (
        c.name?.toLowerCase().includes(query) ||
        c.email?.toLowerCase().includes(query) ||
        c.empresa?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      return (a[orden] || '').localeCompare(b[orden] || '');
    });

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-green-700">Listado de Clientes 🌿</h1>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="🔍 Buscar cliente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border border-gray-300 rounded p-2 w-60"
          />
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="name">Ordenar por Nombre</option>
            <option value="empresa">Ordenar por Empresa</option>
            <option value="tipo_cliente">Ordenar por Tipo</option>
          </select>
          <Link
            href="/clientes/nuevo"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
          >
            ➕ Registrar nuevo
          </Link>
        </div>
      </div>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-green-100">
          <tr>
            <th className="p-2 border">Tipo Cliente</th>
            <th className="p-2 border">Giro</th>
            <th className="p-2 border">Empresa</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Correo</th>
            <th className="p-2 border">Teléfono</th>
            <th className="p-2 border">Red Social</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id} className="hover:bg-green-50">
              <td className="p-2 border">{cliente.tipo_cliente || '-'}</td>
              <td className="p-2 border">{cliente.giro_empresa || '-'}</td>
              <td className="p-2 border">{cliente.empresa || '-'}</td>
              <td className="p-2 border">{cliente.name}</td>
              <td className="p-2 border">{cliente.email}</td>
              <td className="p-2 border">{cliente.telefono || '-'}</td>
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
