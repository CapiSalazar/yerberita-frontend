'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [openClientes, setOpenClientes] = useState(false);
  const [openProductos, setOpenProductos] = useState(false);
  const [openOrdenes, setOpenOrdenes] = useState(false);
  const [openGastos, setOpenGastos] = useState(false);

  return (
    <nav className="bg-green-600 p-4 text-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold">
          Yerberita 🌿
        </Link>

        <ul className="flex gap-6 relative">
          <li>
            <Link href="/dashboard" className="hover:underline">
              🧭 Dashboard
            </Link>
          </li>

          {/* CLIENTES */}
          <li className="relative">
            <button
              onClick={() => {
                setOpenClientes(!openClientes);
                setOpenProductos(false);
                setOpenOrdenes(false);
                setOpenGastos(false);
              }}
              className="hover:underline focus:outline-none"
            >
              👥 Clientes ⮟
            </button>
            {openClientes && (
              <ul
                className="absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded"
                onMouseLeave={() => setOpenClientes(false)}
              >
                <li>
                  <Link href="/clientes/listado" className="block px-4 py-2 hover:bg-green-100">
                    👀 Visualizar todos
                  </Link>
                </li>
                <li>
                  <Link href="/clientes/nuevo" className="block px-4 py-2 hover:bg-green-100">
                    ➕ Registrar nuevo
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* PRODUCTOS */}
          <li className="relative">
            <button
              onClick={() => {
                setOpenProductos(!openProductos);
                setOpenClientes(false);
                setOpenOrdenes(false);
                setOpenGastos(false);
              }}
              className="hover:underline focus:outline-none"
            >
              📦 Productos ⮟
            </button>
            {openProductos && (
              <ul
                className="absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded"
                onMouseLeave={() => setOpenProductos(false)}
              >
                <li>
                  <Link href="/productos/listado" className="block px-4 py-2 hover:bg-green-100">
                    👀 Visualizar todos
                  </Link>
                </li>
                <li>
                  <Link href="/productos/nuevo" className="block px-4 py-2 hover:bg-green-100">
                    ➕ Registrar nuevo
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* ÓRDENES */}
          <li className="relative">
            <button
              onClick={() => {
                setOpenOrdenes(!openOrdenes);
                setOpenClientes(false);
                setOpenProductos(false);
                setOpenGastos(false);
              }}
              className="hover:underline focus:outline-none"
            >
              📋 Órdenes ⮟
            </button>
            {openOrdenes && (
              <ul
                className="absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded"
                onMouseLeave={() => setOpenOrdenes(false)}
              >
                <li>
                  <Link href="/ordenes/listado" className="block px-4 py-2 hover:bg-green-100">
                    👀 Ver historial
                  </Link>
                </li>
                <li>
                  <Link href="/ordenes/nuevo" className="block px-4 py-2 hover:bg-green-100">
                    ➕ Crear nueva
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* GASTOS */}
          <li className="relative">
            <button
              onClick={() => {
                setOpenGastos(!openGastos);
                setOpenClientes(false);
                setOpenProductos(false);
                setOpenOrdenes(false);
              }}
              className="hover:underline focus:outline-none"
            >
              💸 Gastos ⮟
            </button>
            {openGastos && (
              <ul
                className="absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded"
                onMouseLeave={() => setOpenGastos(false)}
              >
                <li>
                  <Link href="/gastos/listado" className="block px-4 py-2 hover:bg-green-100">
                    📊 Ver todos
                  </Link>
                </li>
                <li>
                  <Link href="/gastos/nuevo" className="block px-4 py-2 hover:bg-green-100">
                    ➕ Registrar nuevo
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

