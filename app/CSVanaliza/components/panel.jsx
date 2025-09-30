'use client';

import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie, Line, Doughnut, Bubble, PolarArea, Radar, Scatter } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

export default function CSVAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [view, setView] = useState("informe");
  const [selectedChart, setSelectedChart] = useState("bubble");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("http://localhost:8000/procesar-csv", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const renderTable = (rows) => {
    if (!rows || rows.length === 0) return <p className="text-gray-500">Sin datos</p>;
    const columns = Object.keys(rows[0]);
    return (
      <div className="overflow-x-auto border border-gray-300 rounded-xl shadow-lg bg-white h-full">
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 text-gray-900 sticky top-0 z-10">
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} className="px-4 py-3 border border-gray-200 text-sm font-semibold text-center">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50 transition-colors duration-200">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-4 py-3 border border-gray-100 text-sm text-center text-gray-700">{row[col] ?? ""}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const getChartData = () => {
    if (!data || !data.tablas) return {};

    const numericRows = data.tablas.numericas || [];
    const nonNumericRows = data.tablas.no_numericas || [];
    const columns = numericRows.length ? Object.keys(numericRows[0]) : ["N/A"];
    const labels = columns;

    return {
      bubble: {
        datasets: columns.map((col, idx) => ({
          label: col,
          data: numericRows.map((row, i) => ({ x: i + 1, y: parseFloat(row[col]) || 0, r: 5 + Math.random() * 10 })),
          backgroundColor: `rgba(30, 60, 200, 0.5)`,
        })),
      },
      doughnut: {
        labels: nonNumericRows.length ? Object.keys(nonNumericRows[0]) : ["N/A"],
        datasets: [{
          label: "Doughnut",
          data: nonNumericRows.length ? nonNumericRows.map((row, i) => i + 1) : [1],
          backgroundColor: ["#3B82F6", "#F97316", "#60A5FA", "#BFDBFE", "#1D4ED8"],
        }],
      },
      pie: {
        labels: nonNumericRows.length ? Object.keys(nonNumericRows[0]) : ["N/A"],
        datasets: [{
          label: "Pie",
          data: nonNumericRows.length ? nonNumericRows.map((row, i) => i + 1) : [1],
          backgroundColor: ["#3B82F6", "#F97316", "#60A5FA", "#BFDBFE", "#1D4ED8"],
        }],
      },
      line: {
        labels,
        datasets: columns.map((col, idx) => ({
          label: col,
          data: numericRows.map((row) => parseFloat(row[col]) || 0),
          borderColor: `#1D4ED8`,
          backgroundColor: `rgba(59, 130, 246,0.2)`,
          fill: true,
          tension: 0.4,
        })),
      },
      mixed: {
        labels,
        datasets: [
          ...columns.map((col, idx) => ({
            type: "bar",
            label: col,
            data: numericRows.map((row) => parseFloat(row[col]) || 0),
            backgroundColor: `rgba(59, 130, 246,0.5)`,
          })),
          ...columns.map((col, idx) => ({
            type: "line",
            label: col + " Línea",
            data: numericRows.map((row) => parseFloat(row[col]) || 0),
            borderColor: "#1E40AF",
            backgroundColor: `rgba(59, 130, 246,0.2)`,
            fill: false,
          })),
        ],
      },
      polar: {
        labels,
        datasets: [{
          label: "Polar Area",
          data: numericRows.map((row) => parseFloat(row[columns[0]]) || 0),
          backgroundColor: ["#3B82F6", "#60A5FA", "#BFDBFE", "#1E40AF", "#93C5FD"],
        }],
      },
      radar: {
        labels,
        datasets: [{
          label: "Radar",
          data: numericRows.map((row) => parseFloat(row[columns[0]]) || 0),
          backgroundColor: "rgba(59,130,246,0.2)",
          borderColor: "#3B82F6",
          pointBackgroundColor: "#1D4ED8",
        }],
      },
      scatter: {
        datasets: columns.map((col, idx) => ({
          label: col,
          data: numericRows.map((row, i) => ({ x: i + 1, y: parseFloat(row[col]) || 0 })),
          backgroundColor: "#3B82F6",
        })),
      },
    };
  };

  const chartData = getChartData();
  const options = { responsive: true, maintainAspectRatio: false };

  const renderSelectedChart = () => {
    switch (selectedChart) {
      case "bubble": return <Bubble data={chartData.bubble} options={options} />;
      case "doughnut": return <Doughnut data={chartData.doughnut} options={options} />;
      case "pie": return <Pie data={chartData.pie} options={options} />;
      case "line": return <Line data={chartData.line} options={options} />;
      case "mixed": return <Bar data={chartData.mixed} options={options} />;
      case "polar": return <PolarArea data={chartData.polar} options={options} />;
      case "radar": return <Radar data={chartData.radar} options={options} />;
      case "scatter": return <Scatter data={chartData.scatter} options={options} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-3 sm:px-6 py-4 lg:py-8">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-3 lg:mb-2">
            Analiza tus Datos
          </h1>
          {/* Logo debajo del título */}
          <div className="mb-3">
            <img src="/logo2.png" alt="Logo" className="mx-auto w-12 h-auto" />
          </div>
          <p className="text-gray-700 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Sube tu archivo CSV y obtén análisis detallados, visualizaciones interactivas y reportes ejecutivos
          </p>
        </div>

       {/* Upload */}
<div className="relative rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8">
  {/* Borde animado de 2px con colores cambiando */}
  <div className="absolute inset-0 rounded-2xl pointer-events-none">
    <div
      className="w-full h-full rounded-2xl border border-transparent"
      style={{
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '1rem', // igual que rounded-2xl
        borderImage: 'linear-gradient(90deg, #f97316, #facc15, #4ade80, #3b82f6, #9333ea, #f97316) 1',
        animation: 'borderColors 4s linear infinite',
      }}
    />
  </div>

  {/* Contenido */}
  <div className="relative bg-white rounded-2xl shadow-xl h-full">
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="flex-1 w-full">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Selecciona tu archivo CSV
        </label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-900 hover:file:bg-gray-100"
        />
      </div>
      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100 transition-all duration-200 shadow-lg"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Analizando...
          </div>
        ) : "Analizar CSV"}
      </button>
    </div>
    {file && (
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-700 font-medium flex items-center">
          <span className="text-lg mr-2">✅</span> Archivo seleccionado:{" "}
          <span className="font-bold ml-1">{file.name}</span>
        </p>
      </div>
    )}
    {error && (
      <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
        <p className="text-orange-700 font-medium flex items-center">
          <span className="text-lg mr-2">❌</span> {error}
        </p>
      </div>
    )}
  </div>
</div>

{/* Animación CSS */}
<style jsx>{`
  @keyframes borderColors {
    0% { border-image: linear-gradient(90deg, #f97316, #facc15, #4ade80, #3b82f6, #9333ea, #f97316) 1; }
    25% { border-image: linear-gradient(90deg, #4ade80, #3b82f6, #facc15, #f97316, #9333ea, #4ade80) 1; }
    50% { border-image: linear-gradient(90deg, #3b82f6, #facc15, #f97316, #4ade80, #9333ea, #3b82f6) 1; }
    75% { border-image: linear-gradient(90deg, #facc15, #4ade80, #3b82f6, #f97316, #9333ea, #facc15) 1; }
    100% { border-image: linear-gradient(90deg, #f97316, #facc15, #4ade80, #3b82f6, #9333ea, #f97316) 1; }
  }
`}</style>


        {/* Results */}
        {data && (
          <div className="flex-1 bg-white rounded-2xl shadow-xl border border-gray-300 overflow-hidden">
            {/* Main Tabs */}
            <div className="border-b border-gray-300">
              <div className="flex flex-wrap gap-2 p-4 lg:p-6">
                <button
                  onClick={() => setView("informe")}
                  className={`flex-1 sm:flex-none px-4 lg:px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center ${
                    view === "informe" ? "bg-black text-white shadow-lg transform scale-105" : "bg-gray-50 text-gray-900 hover:bg-gray-100 hover:scale-105"
                  }`}
                >
                  Informe
                </button>
                <button
                  onClick={() => setView("tablas")}
                  className={`flex-1 sm:flex-none px-4 lg:px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center ${
                    view === "tablas" ? "bg-black text-white shadow-lg transform scale-105" : "bg-gray-50 text-gray-900 hover:bg-gray-100 hover:scale-105"
                  }`}
                >
                  Tablas
                </button>
                <button
                  onClick={() => setView("graficas")}
                  className={`flex-1 sm:flex-none px-4 lg:px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center ${
                    view === "graficas" ? "bg-black text-white shadow-lg transform scale-105" : "bg-gray-50 text-gray-900 hover:bg-gray-100 hover:scale-105"
                  }`}
                >
                  Gráficas
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 lg:p-8 h-[calc(100vh-200px)] overflow-y-auto">
              {view === "informe" && <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-inner border border-gray-300 h-full overflow-y-auto text-gray-700">{data.informe_ejecutivo}</div>}
              {view === "tablas" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                  <div>
                    <h2 className="text-2xl font-bold mb-3 text-gray-900">📈 Columnas Numéricas</h2>
                    {renderTable(data.tablas?.numericas)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3 text-gray-700">📝 Columnas No Numéricas</h2>
                    {renderTable(data.tablas?.no_numericas)}
                  </div>
                </div>
              )}
              {view === "graficas" && (
                <div className="flex flex-col h-full">
                  {/* Chart selector */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["bubble","doughnut","pie","line","mixed","polar","radar","scatter"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedChart(c)}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                          selectedChart===c?"bg-black text-white shadow-lg":"bg-gray-50 text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-300 flex-1 p-4">
                    {renderSelectedChart()}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
