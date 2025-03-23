'use client';

export default function TestPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-green-700">🧪 Prueba API URL</h1>
      <p className="mt-4 text-lg">
        API URL actual: <strong>{process.env.NEXT_PUBLIC_API_URL}</strong>
      </p>
    </div>
  );
}
