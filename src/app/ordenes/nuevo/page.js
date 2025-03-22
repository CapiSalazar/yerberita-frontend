'use client';

import { useEffect, useState } from 'react';

export default function NuevaOrdenPage() {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [items, setItems] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      const [resClientes, resProductos] = await Promise.all([
        fetch('https://yerberita-backend-production.up.railway.app/api/customers', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('https://yerberita-backend-production.up.railway.app/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const dataClientes = await resClientes.json();
      const dataProductos = await resProductos.json();

      setClientes(dataClientes.customers || []);
      setProductos(dataProductos.products || []);
    };

    fetchData();
  }, []);

  const handleAddItem = () => {
    setItems([...items, { product_id: '', quantity: 1 }]);
  };

  const handleItemChange = (index, field, value) => {
    const nuevosItems = [...items];
    nuevosItems[index][field] = field === 'quantity' ? parseInt(value) : value;
    setItems(nuevosItems);
  };

  const calcularTotal = () => {
    return items.reduce((total, item) => {
      const producto = productos.find((p) => p.id === parseInt(item.product_id));
      return total + (producto ? producto.price * item.quantity : 0);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
const res = await fetch('https://yerberita-backend-production.up.railway.app/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customer_id: clienteSeleccionado,
          products: items,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al crear orden');

      setMensaje({ tipo: 'exito', texto: 'Orden creada con éxito ✅' });
      setClienteSeleccionado('');
      setItems([]);
    } catch (err) {
      setMensaje({ tipo: 'error', texto: err.message });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-green-700 mb-4">➕ Crear nueva orden</h1>

      {mensaje && (
        <div
          className={`p-2 mb-4 rounded ${
            mensaje.tipo === 'exito' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-1">Cliente</label>
          <select
            value={clienteSeleccionado}
            onChange={(e) => setClienteSeleccionado(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Selecciona un cliente --</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold">Productos</label>
          {items.map((item, index) => (
            <div key={index} className="flex gap-4">
              <select
                value={item.product_id}
                onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                className="flex-1 p-2 border rounded"
              >
                <option value="">-- Producto --</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                className="w-24 p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddItem}
            className="text-sm text-green-700 hover:underline"
          >
            ➕ Agregar otro producto
          </button>
        </div>

        <div className="text-right text-lg font-semibold text-green-700">
          Total: ${calcularTotal().toFixed(2)}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Guardar orden
        </button>
      </form>
    </div>
  );
}
