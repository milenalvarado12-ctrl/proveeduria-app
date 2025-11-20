const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Datos simulados
const solicitudes = [
  { id: 1, estado: 'Pendiente', fecha: '2025-11-18' },
  { id: 2, estado: 'Aprobada', fecha: '2025-11-19' },
  { id: 3, estado: 'Rechazada', fecha: '2025-11-19' }
];

// Filtros
const estadoFiltro = 'Aprobada';
const fechaInicio = '2025-11-18';
const fechaFin = '2025-11-19';

const filtradas = solicitudes.filter(s =>
  s.estado === estadoFiltro &&
  s.fecha >= fechaInicio &&
  s.fecha <= fechaFin
);

// Exportar a Excel
async function generarExcel() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Solicitudes');

  sheet.columns = [
    { header: 'ID', key: 'id' },
    { header: 'Estado', key: 'estado' },
    { header: 'Fecha', key: 'fecha' }
  ];

  filtradas.forEach(row => sheet.addRow(row));
  await workbook.xlsx.writeFile('reporte_solicitudes.xlsx');
  console.log('✅ Reporte Excel generado.');
}

// Exportar a PDF
function generarPDF() {
  const pdf = new PDFDocument();
  pdf.pipe(fs.createWriteStream('reporte_solicitudes.pdf'));

  pdf.fontSize(16).text(`Reporte de solicitudes (${estadoFiltro})`, { align: 'center' });
  pdf.moveDown();

  filtradas.forEach(s => {
    pdf.fontSize(12).text(`ID: ${s.id} - Fecha: ${s.fecha}`);
  });

  pdf.end();
  console.log('✅ Reporte PDF generado.');
}

generarExcel();
generarPDF();
