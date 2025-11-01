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
import {
  Bar,
  Pie,
  Line,
  Doughnut,
  Bubble,
  PolarArea,
  Radar,
  Scatter,
} from "react-chartjs-2";

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
      const response = await fetch("https://glynne-ecosistem.onrender.com/procesar-csv", {
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
    if (!rows || rows.length === 0)
      return <p className="text-gray-500">Sin datos</p>;
    const columns = Object.keys(rows[0]);
    return (
      <div className="overflow-x-auto border border-gray-300 rounded-xl shadow-lg bg-white h-full">
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 text-gray-900 sticky top-0 z-10">
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 border border-gray-200 text-sm font-semibold text-center"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className="px-4 py-3 border border-gray-100 text-sm text-center text-gray-700"
                    >
                      {row[col] ?? ""}
                    </td>
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
    if (!data || !data.tablas)
      return {
        bubble: { datasets: [] },
        doughnut: { labels: [], datasets: [] },
        pie: { labels: [], datasets: [] },
        line: { labels: [], datasets: [] },
        mixed: { labels: [], datasets: [] },
        polar: { labels: [], datasets: [] },
        radar: { labels: [], datasets: [] },
        scatter: { datasets: [] },
      };

    const numericRows = data.tablas.numericas || [];
    const nonNumericRows = data.tablas.no_numericas || [];
    const columns = numericRows.length ? Object.keys(numericRows[0]) : ["N/A"];
    const labels = columns;
    return {
      bubble: {
        datasets: columns.map((col) => ({
          label: col,
          data: numericRows.map((row, i) => ({
            x: i + 1,
            y: parseFloat(row[col]) || 0,
            r: 5 + Math.random() * 10,
          })),
          backgroundColor: "rgba(30, 60, 200, 0.5)",
        })),
      },
      doughnut: {
        labels: nonNumericRows.length
          ? Object.keys(nonNumericRows[0])
          : ["N/A"],
        datasets: [
          {
            label: "Doughnut",
            data: nonNumericRows.length
              ? nonNumericRows.map((_, i) => i + 1)
              : [1],
            backgroundColor: [
              "#3B82F6",
              "#F97316",
              "#60A5FA",
              "#BFDBFE",
              "#1D4ED8",
            ],
          },
        ],
      },
      pie: {
        labels: nonNumericRows.length
          ? Object.keys(nonNumericRows[0])
          : ["N/A"],
        datasets: [
          {
            label: "Pie",
            data: nonNumericRows.length
              ? nonNumericRows.map((_, i) => i + 1)
              : [1],
            backgroundColor: [
              "#3B82F6",
              "#F97316",
              "#60A5FA",
              "#BFDBFE",
              "#1D4ED8",
            ],
          },
        ],
      },
      line: {
        labels,
        datasets: columns.map((col) => ({
          label: col,
          data: numericRows.map((row) => parseFloat(row[col]) || 0),
          borderColor: "#1D4ED8",
          backgroundColor: "rgba(59, 130, 246,0.2)",
          fill: true,
          tension: 0.4,
        })),
      },
      mixed: {
        labels,
        datasets: [
          ...columns.map((col) => ({
            type: "bar",
            label: col,
            data: numericRows.map((row) => parseFloat(row[col]) || 0),
            backgroundColor: "rgba(59, 130, 246,0.5)",
          })),
          ...columns.map((col) => ({
            type: "line",
            label: col + " Línea",
            data: numericRows.map((row) => parseFloat(row[col]) || 0),
            borderColor: "#1E40AF",
            backgroundColor: "rgba(59, 130, 246,0.2)",
            fill: false,
          })),
        ],
      },
      polar: {
        labels,
        datasets: [
          {
            label: "Polar Area",
            data: numericRows.map(
              (row) => parseFloat(row[columns[0]]) || 0
            ),
            backgroundColor: [
              "#3B82F6",
              "#60A5FA",
              "#BFDBFE",
              "#1E40AF",
              "#93C5FD",
            ],
          },
        ],
      },
      radar: {
        labels,
        datasets: [
          {
            label: "Radar",
            data: numericRows.map(
              (row) => parseFloat(row[columns[0]]) || 0
            ),
            backgroundColor: "rgba(59,130,246,0.2)",
            borderColor: "#3B82F6",
            pointBackgroundColor: "#1D4ED8",
          },
        ],
      },
      scatter: {
        datasets: columns.map((col) => ({
          label: col,
          data: numericRows.map((row, i) => ({
            x: i + 1,
            y: parseFloat(row[col]) || 0,
          })),
          backgroundColor: "#3B82F6",
        })),
      },
    };
  };

  const chartData = getChartData();
  const options = { responsive: true, maintainAspectRatio: false };

  const highlightText = (text) => {
    return text
      .replace(/(\d+(\.\d+)?%?)/g, "<b>$1</b>")
      .replace(/\b(promedio|media|varianza|desviación estándar|máximo|mínimo|tendencia|distribución|análisis|dataset|valores|columna|resultado|datos)\b/gi, "<b>$1</b>");
  };

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
    <div className="flex min-h-screen w-full bg-white">
      {/* Panel Izquierdo */}
      <div className="w-[25vw] min-w-[300px] bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
        <div>
          <div className="text-center mb-6">
            <img src="/logo2.png" alt="Logo" className="mx-auto w-16 h-auto" />
            <p className="text-gray-700 text-sm mt-2">
              Sube tu archivo CSV y agrega una descripción
            </p>
          </div>

          <input
            type="text"
            value={descripcion}
            onChange={handleDescripcionChange}
            placeholder="Que quieres saber de esta DB?"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none"
          />

          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="w-full px-4 py-3 mb-4 border-2 border-dashed border-gray-300 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-gray-100"
          />

          <button
            onClick={handleAnalyze}
            disabled={!file || !descripcion || loading}
            className="w-full py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 disabled:bg-gray-400 transition-all"
          >
            {loading ? "Analizando..." : "Analizar CSV"}
          </button>

          {file && (
            <p className="mt-3 text-gray-700 text-sm">
              Archivo seleccionado: <b>{file.name}</b>
            </p>
          )}
          {error && (
            <p className="mt-3 text-red-600 text-sm font-medium">❌ {error}</p>
          )}
        </div>
      </div>

      {/* Panel Derecho */}
      <div className="w-[75vw] p-6 flex flex-col bg-white">
        <div className="border-b border-gray-300 mb-6">
          <div className="flex gap-2">
            {["informe", "tablas", "graficas"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-5 py-3 rounded-xl font-semibold transition-all ${
                  view === v
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {view === "informe" && (
            <div className="text-gray-700 text-left leading-relaxed">
              {data?.informe_ejecutivo ? (
                data.informe_ejecutivo.split(". ").map((sentence, idx) => (
                  <p
                    key={idx}
                    className="mb-4 text-justify indent-8"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(sentence + "."),
                    }}
                  />
                ))
              ) : (
                <p className="text-gray-500">Sin información disponible</p>
              )}
            </div>
          )}

          {view === "tablas" && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="font-bold mb-2">Columnas Numéricas</h2>
                {renderTable(data?.tablas?.numericas || [])}
              </div>
              <div>
                <h2 className="font-bold mb-2">Columnas No Numéricas</h2>
                {renderTable(data?.tablas?.no_numericas || [])}
              </div>
            </div>
          )}

          {view === "graficas" && (
            <div className="flex flex-col h-full">
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "bubble",
                  "doughnut",
                  "pie",
                  "line",
                  "mixed",
                  "polar",
                  "radar",
                  "scatter",
                ].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedChart(c)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                      selectedChart === c
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>
              <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                {renderSelectedChart()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
