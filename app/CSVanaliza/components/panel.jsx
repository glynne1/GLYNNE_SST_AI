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
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [view, setView] = useState("informe");
  const [selectedChart, setSelectedChart] = useState("bubble");

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleDescripcionChange = (e) => setDescripcion(e.target.value);

  const handleAnalyze = async () => {
    if (!file) {
      setError("Debes seleccionar un archivo CSV.");
      return;
    }

    if (!descripcion.trim()) {
      setError("Debes ingresar una descripción del dataset.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("descripcion", descripcion);

      const response = await fetch("https://gly-csv-v2.onrender.com/procesar-csv", {
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
          
          <div className="mb-3">
            <img src="/logo2.png" alt="Logo" className="mx-auto w-12 h-auto" />
          </div>
          <p className="text-gray-700 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Sube tu archivo CSV, agrega una descripción y obtén análisis detallado
          </p>
        </div>

       {/* Inputs: descripción arriba, CSV debajo + botón */}
<div className="relative rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8 flex flex-col gap-4 w-full max-w-2xl mx-auto">
  {/* Input de descripción */}
  <div className="relative flex-1">
    <input
      type="text"
      value={descripcion}
      onChange={handleDescripcionChange}
      placeholder="Ej. Datos de accidentes de tránsito 2024"
      className="w-full px-4 py-4 rounded-full text-lg bg-white outline-none relative z-10"
      style={{ border: "2px solid transparent", backgroundClip: "padding-box" }}
    />
    <span
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        background: "linear-gradient(90deg, #4ade80, #3b82f6, #facc15, #ec4899)",
        backgroundSize: "300% 300%",
        animation: "shine 2.5s linear infinite",
        borderRadius: "9999px",
        padding: "2px",
        zIndex: 0,
      }}
    />
  </div>

  {/* Selector de CSV + Botón */}
<div className="w-full flex flex-col gap-4">
  <label className="block text-sm font-medium text-gray-900">
    Selecciona tu archivo CSV
  </label>

  <input
    type="file"
    accept=".csv"
    onChange={handleFileChange}
    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-900 hover:file:bg-gray-100"
  />

  <button
    onClick={handleAnalyze}
    disabled={!file || !descripcion || loading}
    className="w-full px-6 lg:px-8 py-3 lg:py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100 transition-all duration-200 shadow-lg"
  >
    {loading ? "Analizando..." : "Analizar CSV"}
  </button>

  {file && (
    <p className="mt-2 text-gray-700">
      Archivo seleccionado: <b>{file.name}</b>
    </p>
  )}

  {error && (
    <p className="mt-2 text-orange-700 font-medium">❌ {error}</p>
  )}
</div>

</div>



        {/* Results */}
        {data && (
          <div className="flex-1 bg-white rounded-2xl shadow-xl border border-gray-300 overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-300">
              <div className="flex flex-wrap gap-2 p-4 lg:p-6">
                {["informe","tablas","graficas"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`flex-1 sm:flex-none px-4 lg:px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center ${
                      view === v ? "bg-black text-white shadow-lg transform scale-105" : "bg-gray-50 text-gray-900 hover:bg-gray-100 hover:scale-105"
                    }`}
                  >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
<div className="p-4 sm:p-6 lg:p-8 h-[calc(100vh-200px)] overflow-y-auto">
  {view === "informe" && (
    <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-inner border border-gray-300 h-full overflow-y-auto text-gray-700">
      {data.informe_ejecutivo.split(". ").map((sentence, idx) => {
        // Resaltar palabras clave y cifras
        const highlighted = sentence.replace(
          /(\d{1,3}(?:\.\d{3})*(?:,\d+)?|\bBitcoin\b|\bvolatilidad\b|\binversores\b|\bmercado\b|\bcapitalización\b|\briesgos\b)/gi,
          "<strong>$1</strong>"
        );

        // Retornar cada oración como párrafo
        return (
          <p key={idx} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: highlighted }} />
        );
      })}
    </div>
  )}

{view === "tablas" && (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
    {/* Tabla Numéricas */}
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg border border-gray-300 overflow-hidden">
      <h2 className="text-2xl font-bold mb-3 p-4 bg-gray-50 text-gray-900 border-b border-gray-200">
         Columnas Numéricas
      </h2>
      <div className="flex-1 overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-900 sticky top-0 z-10">
            <tr>
              {data.tablas?.numericas && Object.keys(data.tablas.numericas[0] || {}).map((col, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 border border-gray-200 text-sm font-semibold text-center whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.tablas?.numericas?.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-gray-50 transition-colors duration-200">
                {Object.keys(row).map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-4 py-3 border border-gray-100 text-sm text-center text-gray-700 whitespace-nowrap"
                  >
                    {row[col] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Tabla No Numéricas */}
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg border border-gray-300 overflow-hidden">
      <h2 className="text-2xl font-bold mb-3 p-4 bg-gray-50 text-gray-700 border-b border-gray-200">
        Columnas No Numéricas
      </h2>
      <div className="flex-1 overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-900 sticky top-0 z-10">
            <tr>
              {data.tablas?.no_numericas && Object.keys(data.tablas.no_numericas[0] || {}).map((col, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 border border-gray-200 text-sm font-semibold text-center whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.tablas?.no_numericas?.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-gray-50 transition-colors duration-200">
                {Object.keys(row).map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-4 py-3 border border-gray-100 text-sm text-center text-gray-700 whitespace-nowrap"
                  >
                    {row[col] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}


              {view === "graficas" && (
                <div className="flex flex-col h-full">
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
