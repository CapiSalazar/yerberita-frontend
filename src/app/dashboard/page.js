'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [balanceData, setBalanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para validar el token y obtener el resumen
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
const res = await fetch('https://yerberita-backend-production.up.railway.app/api/reports/balance', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'No autorizado');
        }

        setBalanceData(data);
      } catch (err) {
        console.error(err);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <div className="text-center mt-20 text-gray-600">Cargando datos del dashboard...</div>;

  if (!balanceData) return <div className="text-center mt-20 text-red-500">Error al cargar información.</div>;

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-8">Dashboard Yerberita 🌱</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card title="Ingresos Totales" value={`$${balanceData.total_income}`} color="bg-green-200" />
        <Card title="Gastos Totales" value={`$${balanceData.total_expenses}`} color="bg-red-200" />
        <Card title="Balance" value={`$${balanceData.balance}`} color={balanceData.status === 'ganancia' ? 'bg-green-300' : 'bg-red-300'} />
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`p-6 rounded-lg shadow-md ${color}`}>
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl font-bold mt-2 text-gray-900">{value}</p>
    </div>
  );
}
