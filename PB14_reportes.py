import pandas as pd
from fpdf import FPDF

# Datos de ejemplo (en la práctica podrían venir de una base de datos)
data = [
    {"id": 1, "estado": "Pendiente", "fecha": "2025-11-18"},
    {"id": 2, "estado": "Aprobada", "fecha": "2025-11-19"},
    {"id": 3, "estado": "Rechazada", "fecha": "2025-11-19"},
    {"id": 4, "estado": "Aprobada", "fecha": "2025-11-18"},
]

df = pd.DataFrame(data)

# Filtros
estado_filtro = "Aprobada"
fecha_inicio = "2025-11-18"
fecha_fin = "2025-11-19"

df_filtrado = df[(df['estado'] == estado_filtro) &
                 (df['fecha'] >= fecha_inicio) &
                 (df['fecha'] <= fecha_fin)]

# Exportar a Excel
df_filtrado.to_excel("reporte_solicitudes.xlsx", index=False)
print("✅ Reporte exportado a Excel correctamente.")

# Exportar a PDF
pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", size=12)
pdf.cell(200, 10, txt=f"Reporte de solicitudes ({estado_filtro})", ln=True)
for index, row in df_filtrado.iterrows():
    pdf.cell(200, 10, txt=f"ID: {row['id']} - Fecha: {row['fecha']}", ln=True)
pdf.output("reporte_solicitudes.pdf")
print("✅ Reporte exportado a PDF correctamente.")
