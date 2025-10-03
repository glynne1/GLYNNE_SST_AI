'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import SaveAudit from './saveJSON';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

export default function AuditAlert({ onClose, userId }) {
  const [openResult, setOpenResult] = useState(false);
  const [auditoria, setAuditoria] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tempJson, setTempJson] = useState(null);

  // 🔥 nuevo: estado para nodos y edges
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const pdfRef = useRef();

  const generarAuditoria = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://gly-chat-v1-2.onrender.com/generar_auditoria?user_id=${userId}`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Error al generar la auditoría");

      const data = await res.json();
      setAuditoria(data);
      setOpenResult(true);

      const temporal = {
        userId: userId || 'desconocido',
        timestamp: new Date().toISOString(),
        contenido: {
          texto: data.auditoria,
          logo: "/logo2.png",
          sello: "/celloGLY.png",
          firma: "/firma.png",
        },
      };
      setTempJson(temporal);
      console.log("✅ JSON temporal generado:", temporal);

      // 🔥 fetch adicional para traer el ecosistema de nodos
      const ecoRes = await fetch(`https://gly-chat-v1-2.onrender.com/generar_ecosistema?user_id=${userId}`);
      if (ecoRes.ok) {
        const ecoData = await ecoRes.json();
        console.log("🌐 Ecosistema recibido:", ecoData);

        // se espera que el backend retorne algo como { nodes: [...], edges: [...] }
        setNodes(ecoData.nodes || []);
        setEdges(ecoData.edges || []);
      } else {
        console.warn("⚠️ No se pudo obtener el ecosistema de nodos");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Hubo un problema generando la auditoría");
    } finally {
      setLoading(false);
    }
  };

  const formatText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  // --------------------------
  // Componente AuditPDF embebido
  const AuditPDF = ({ userId }) => {
    const [loadingPDF, setLoadingPDF] = useState(false);

    const descargarPDF = async () => {
      setLoadingPDF(true);
      try {
        const jsonData = tempJson;
        if (!jsonData) throw new Error("No hay datos para generar el PDF");

        let texto = jsonData.contenido?.texto || JSON.stringify(jsonData, null, 2);
        texto = texto.replace(/\\n/g, '\n');

        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        const margin = 40;
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        let y = margin;

        // TÍTULO
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text('Informe de Auditoría', pageWidth / 2, y, { align: 'center' });
        y += 30;

        // LOGO más pequeño
        const logoSrc = jsonData.contenido?.logo || '/logo2.png';
        if (logoSrc) {
          const logo = new Image();
          logo.src = logoSrc;
          await new Promise((resolve) => {
            logo.onload = () => {
              const imgWidth = 60; // más pequeño
              const imgHeight = (logo.height / logo.width) * imgWidth;
              doc.addImage(logo, 'PNG', (pageWidth - imgWidth) / 2, y, imgWidth, imgHeight);
              y += imgHeight + 20;
              resolve(true);
            };
          });
        }

        // TEXTO DE AUDITORÍA
        doc.setFontSize(12);
        const parrafos = texto.split(/\n+/).filter(p => p.trim() !== '');
        for (let parrafo of parrafos) {
          const partes = parrafo.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
          for (let parte of partes) {
            let isBold = false;
            let textoParte = parte;
            const match = parte.match(/^\*\*(.+)\*\*$/);
            if (match) {
              textoParte = match[1];
              isBold = true;
            }
            doc.setFont('helvetica', isBold ? 'bold' : 'normal');
            const lines = doc.splitTextToSize(textoParte, pageWidth - margin * 2);
            for (let line of lines) {
              if (y > pageHeight - margin - 150) {
                doc.addPage();
                y = margin;
              }
              doc.text(line, margin, y);
              y += 18;
            }
          }
          y += 18;
        }

        // PÁRRAFO GLYNNE
        const glText = `GLYNNE TECH S.A.S. ...`;
        const glLines = doc.splitTextToSize(glText, pageWidth - margin * 2);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        glLines.forEach(line => {
          if (y > pageHeight - margin - 150) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin, y);
          y += 14;
        });
        y += 30;

        // SELLO y FIRMA (igual que tu código original)
        // ...

        doc.save(`GLYNNE_ANALISIS_NEGOCIO_${userId}.pdf`);
      } catch (err) {
        console.error('❌ Error generando PDF:', err);
      } finally {
        setLoadingPDF(false);
      }
    };

    return (
      <div className="p-4">
        <button
          onClick={descargarPDF}
          disabled={loadingPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loadingPDF ? 'Generando PDF...' : 'Descargar PDF'}
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Modal inicial */}
      {/* ... (idéntico al tuyo) */}

      {/* Modal con resultado */}
      {openResult && auditoria && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-[60]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            {/* Botón X */}
            <button
              onClick={() => setOpenResult(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-lg"
            >
              ×
            </button>

            <div ref={pdfRef} className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-center border-b pb-2">
                Informe de Auditoría
              </h2>

              {/* 🔥 Auditoría textual */}
              <div
                className="text-gray-700 whitespace-pre-line leading-relaxed text-justify mb-10"
                dangerouslySetInnerHTML={{ __html: formatText(auditoria.auditoria) }}
              />

              {/* 🔥 Visualización del ecosistema */}
              {nodes.length > 0 && (
                <div className="h-[400px] border rounded-lg mb-10">
                  <ReactFlow nodes={nodes} edges={edges} fitView>
                    <Background />
                    <Controls />
                  </ReactFlow>
                </div>
              )}

              {/* Firma, sello, PDF, SaveAudit */}
              <AuditPDF userId={userId} />
              <SaveAudit userId={userId} tempJson={tempJson} />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
