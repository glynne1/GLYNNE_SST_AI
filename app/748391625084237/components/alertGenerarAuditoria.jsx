'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import SaveAudit from './saveJSON';
// import MapaRutaAlert from './ecosistemaMapa'; // 🚫 Comentado: componente del mapa

export default function AuditAlert({ onClose, userId }) {
  const [openResult, setOpenResult] = useState(false);
  // const [openStructure, setOpenStructure] = useState(false); // 🚫 Comentado: estado del popup del mapa
  const [auditoria, setAuditoria] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tempJson, setTempJson] = useState(null);
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

        // LOGO
        const logoSrc = jsonData.contenido?.logo || '/logo2.png';
        if (logoSrc) {
          const logo = new Image();
          logo.src = logoSrc;
          await new Promise((resolve) => {
            logo.onload = () => {
              const imgWidth = 60;
              const imgHeight = (logo.height / logo.width) * imgWidth;
              doc.addImage(logo, 'PNG', (pageWidth - imgWidth) / 2, y, imgWidth, imgHeight);
              y += imgHeight + 20;
              resolve(true);
            };
          });
        }

        // TEXTO
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

        // TEXTO FINAL
        const glText = `GLYNNE TECH S.A.S. es una sociedad por acciones simplificada (SAS) constituida bajo la Ley 1258 de 2008...`;
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

        // SELLO y FIRMA
        const selloSrc = jsonData.contenido?.sello || '/celloGLY.png';
        const firmaSrc = jsonData.contenido?.firma || '/firma.png';

        const imgSelloWidth = 140;
        const imgSelloHeight = 140;
        const imgFirmaWidth = 140;
        const imgFirmaHeight = 100;

        if (selloSrc) {
          const sello = new Image();
          sello.src = selloSrc;
          await new Promise((resolve) => {
            sello.onload = () => {
              doc.addImage(sello, 'PNG', margin, y, imgSelloWidth, imgSelloHeight);
              doc.text("Sello de la Empresa", margin + imgSelloWidth / 2, y + imgSelloHeight + 12, { align: 'center' });
              resolve(true);
            };
          });
        }

        if (firmaSrc) {
          const firma = new Image();
          firma.src = firmaSrc;
          await new Promise((resolve) => {
            firma.onload = () => {
              const xFirma = pageWidth - margin - imgFirmaWidth;
              doc.addImage(firma, 'PNG', xFirma, y, imgFirmaWidth, imgFirmaHeight);
              doc.text("Firma Autorizada", xFirma + imgFirmaWidth / 2, y + imgFirmaHeight + 12, { align: 'center' });
              resolve(true);
            };
          });
        }

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
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-md w-full relative"
        >
          {/* Botón X */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-lg"
          >
            ×
          </button>

          <h2 className="text-xl font-semibold mb-4">
            Es momento de realizar la auditoría
          </h2>
          <p className="text-gray-600 mb-6">
            GLYai ya cuenta con información clave para auditarte.  
            ¿Quieres generar la auditoría ahora o continuar chateando?
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={generarAuditoria}
              className="px-4 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? "Generando..." : "Generar Auditoría"}
            </button>

            {/* 🚫 Botón azul de crear mapa comentado
            <button
              onClick={() => setOpenStructure(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Visualizar estructura de negocio
            </button>
            */}

            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Continuar
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal con resultado de auditoría */}
      {openResult && auditoria && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-[60]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto relative"
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

              <div className="flex justify-center mb-8">
                <img src="/logo2.png" alt="Logo" className="h-10" />
              </div>

              <div
                className="text-gray-700 whitespace-pre-line leading-relaxed text-justify mb-10"
                dangerouslySetInnerHTML={{ __html: formatText(auditoria.auditoria) }}
              />

              <div className="text-sm text-gray-600 mb-10">
                <p>
                  GLYNNE TECH S.A.S. es una <strong>sociedad por acciones simplificada (SAS)</strong> 
                  constituida bajo la Ley 1258 de 2008, con domicilio principal en 
                  <strong> Madrid (Cundinamarca)</strong>.
                </p>
                <p className="mt-2">
                  Su objeto social se centra en el <strong>diseño, desarrollo e implementación de soluciones tecnológicas avanzadas</strong>, 
                  con énfasis en <strong>arquitectura de software, automatización e inteligencia artificial</strong>.
                </p>
              </div>

              <div className="mt-8 flex justify-center gap-16">
                <div className="flex flex-col items-center">
                  <img src="/celloGLY.png" alt="Sello" className="h-52 opacity-90" />
                  <div className="mt-2 border-t-2 border-gray-400 w-40 text-center text-sm text-gray-600">
                    Sello de la Empresa
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/firma.png" alt="Firma" className="h-44 opacity-90" />
                  <div className="mt-2 border-t-2 border-gray-400 w-40 text-center text-sm text-gray-600">
                    Firma Autorizada
                  </div>
                  <div className="text-center text-sm text-gray-700 mt-1">
                    Alexander Quiroga <br />
                    CC 1073176755 <br />
                    CEO & Director de GLYNNE
                  </div>
                </div>
              </div>

              {/* Botón de descarga PDF */}
              <div className="mt-8 flex justify-center">
                <AuditPDF userId={userId} />
              </div>
              <SaveAudit userId={userId} tempJson={tempJson} />
            </div>
          </motion.div>
        </div>
      )}

      {/* 🚫 Popup del mapa completamente comentado
      {openStructure && (
        <MapaRutaAlert onClose={() => setOpenStructure(false)} />
      )}
      */}
    </>
  );
}
