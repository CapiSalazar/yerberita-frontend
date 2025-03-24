'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [balanceData, setBalanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/balance`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'No autorizado');
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

  const {
    ingresos_reales = 0,
    ingresos_por_cobrar = 0,
    total_expenses = 0,
    balance = 0,
    total_production_cost = 0,
    net_profit = 0,
    utilidad_esperada = 0
  } = balanceData;

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-8">Dashboard Yerberita 🌱</h1>

      {/* Fila 1 */}
      <div className="grid grid-cols-5 gap-6 max-w-6xl mx-auto mb-6">
        <Card title="💰 Ingresos Reales" value={`$${ingresos_reales.toFixed(2)}`} color="bg-green-200" />
        <Card title="💎 Gastos" value={`$${total_expenses.toFixed(2)}`} color="bg-red-200" />
        <Card title="📊 Balance (Caja)" value={`$${balance.toFixed(2)}`} color="bg-blue-100" />
        <Card title="📈 Utilidad Neta" value={`$${net_profit.toFixed(2)}`} color="bg-blue-200" />
        <Card title="💸 Costo Producción" value={`$${total_production_cost.toFixed(2)}`} color="bg-yellow-200" />
      </div>

      {/* Fila 2 */}
      <div className="grid grid-cols-5 gap-6 max-w-6xl mx-auto">
        <Card title="⏳ Por Cobrar" value={`$${ingresos_por_cobrar.toFixed(2)}`} color="bg-yellow-100" />
        <EmptyCard />
        <EmptyCard />
        <EmptyCard />
        <Card title="📦 Utilidad Esperada" value={`$${utilidad_esperada.toFixed(2)}`} color="bg-green-100" />
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`p-6 rounded-lg shadow-md ${color}`}>
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl font-bold mt-2 text-gray-900">{value}</p>
    </div>
  );
}

function EmptyCard() {
  return <div className="p-6 rounded-lg shadow-md bg-transparent" />;
}
