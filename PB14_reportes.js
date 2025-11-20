const express = require("express");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const app = express();
app.use(express.json());

// Simulación de datos que normalmente vienen de una base de datos
const solicitudes = [
  { id: 1, estado: "Pendiente", fecha: "2025-11-18" },
  { id: 2, estado: "Aprobada", fecha: "2025-11-19" },
  { id: 3, estado: "Rechazada", fecha: "2025-11-19" },
  { id: 4, estado: "Aprobada", fecha: "2025-11-20" },
];

// Endpoint para generar reporte
app.post("/reporte", async (req, res) => {
  const { estado, fechaInicio, fechaFin } = req.body;

  const filtradas = solicitudes.filter(
    (s) =>
      (!estado || s.estado === estado) &&
      (!fechaInicio || s.fecha >= fechaInicio) &&
      (!fechaFin || s.fecha <= fechaFin)
  );

  // Generar Excel
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Solicitudes");
  sheet.columns = [
    { header: "ID", key: "id" },
    { header: "Estado", key: "estado" },
    { header: "Fecha", key: "fecha" },
  ];
  filtradas.forEach((r) => sheet.addRow(r));
  await workbook.xlsx.writeFile("reporte_solicitudes.xlsx");

  // Generar PDF
  const pdf = new PDFDocument();
  pdf.pipe(fs.createWriteStream("reporte_solicitudes.pdf"));
  pdf.fontSize(16).text(`Reporte de Solicitudes (${estado || "Todos"})`, { align: "center" });
  pdf.moveDown();
  filtradas.forEach((s) => pdf.fontSize(12).text(`ID: ${s.id} - Estado: ${s.estado} - Fecha: ${s.fecha}`));
  pdf.end();

  res.json({
    ok: true,
    mensaje: "Reportes generados (PDF y Excel)",
    total: filtradas.length,
  });
});

app.listen(3002, () => console.log("PB14_reportes corriendo en http://localhost:3002"));
