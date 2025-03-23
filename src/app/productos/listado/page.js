'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ListadoProductosPage() {
  const [productos, setProductos] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setProductos(data.products || []);
      } catch (error) {
        console.error('❌ Error al obtener productos:', error.message);
      }
    };

    fetchProductos();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este producto?");
    if (!confirmDelete) return;

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al eliminar producto');

      alert('✅ Producto eliminado correctamente');
      setProductos(productos.filter(p => p.id !== id)); // Actualizar vista sin recargar
    } catch (error) {
      console.error(`❌ Error al eliminar:`, error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-green-700 mb-6">📦 Lista de productos</h1>
      <div className="mb-4 text-right">
        <Link href="/productos/nuevo" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
          ➕ Agregar nuevo
        </Link>
      </div>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-green-100">
          <tr>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Costo Producción</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((product) => (
            <tr key={product.id} className="hover:bg-green-50">
              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">${parseFloat(product.price).toFixed(2)}</td>
              <td className="p-2 border">
                {product.costo_produccion !== null ? `$${parseFloat(product.costo_produccion).toFixed(2)}` : '-'}
              </td>
              <td className="p-2 border text-blue-600 space-x-4">
                {/* Puedes agregar editar aquí en el futuro */}
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:underline"
                >
                  🗑 Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
