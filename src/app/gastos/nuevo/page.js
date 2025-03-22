'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistrarGastoPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    concept: '',
    amount: '',
    type: 'fijo',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al registrar gasto');

      setSuccess(true);
      setTimeout(() => {
        router.push('/gastos/listado');
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-green-700 mb-6">➕ Registrar nuevo gasto</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Concepto</label>
          <input
            name="concept"
            value={form.concept}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Ej. Empaque ecológico"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Monto</label>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Ej. 700"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Tipo de gasto</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="fijo">Fijo</option>
            <option value="variable">Variable</option>
          </select>
        </div>

        {error && <p className="text-red-500">❌ {error}</p>}
        {success && <p className="text-green-600">✅ Gasto registrado</p>}

        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Guardar gasto
        </button>
      </form>
    </div>
  );
}
