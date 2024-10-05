import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { MallaSignal } from '../../domain/signal/malla.signal';
import { CommonModule } from '@angular/common';
import { PlanEstudioSignal } from '../../domain/signal/plan-estudio.signal';
// import { } from '../../../../assets/images/'
@Component({
  selector: 'app-exportar-pdf-plan-de-estudio',
  standalone: true,
  imports: [UiButtonComponent, CommonModule],
  templateUrl: './exportar-pdf-plan-de-estudio.component.html',
  styleUrl: './exportar-pdf-plan-de-estudio.component.scss'
})
export class ExportarPdfPlanDeEstudioComponent implements OnInit {

  cursosMallaPreRequisitoByCiclo = this.mallaSignal.cursosMallaPreRequisitoByCiclo;
  planEstudioSelect = this.signalPlanEstudio.planEstudioSelect;
  constructor(
    private signalPlanEstudio: PlanEstudioSignal,
    private mallaSignal: MallaSignal,
  ){}
  ngOnInit(): void {
        
  }

  exportarProyectoMasivo = () => {
    const doc = new jsPDF();

    // Configuración de la tabla
    let startY = 20; // Posición inicial en el eje Y
    const rowHeight = 5; // Altura de cada fila
    const fixedColWidth = 18; // Ancho fijo de las demás columnas
    const reducedColWidth = 12; // Ancho de las columnas que se reducen
    const pageWidth = 210; // Ancho de la hoja A4 en mm
    const pageHeight = 297; // Altura de la hoja A4 en mm
    const margin = 10; // Margen desde el borde de la hoja

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(`${this.planEstudioSelect().nombre}`, margin, startY);

    startY += 5; // Ajustar la posición Y después del título
    doc.line(margin, startY, pageWidth - margin, startY); // Línea horizontal
    startY += 5; // Ajustar la posición Y para el inicio de la tabla

    // Definir los encabezados y las filas
    const headers = ['ORDEN', 'CÓDIGO', 'CURSO', 'REQ', 'H TEO', 'H PRA', 'CRÉD', 'TIP CUR', 'ÁREA'];

    doc.setFont('helvetica', 'normal');
    // Calcular el ancho total de las columnas que no son "CURSO"
    const numReducedCols = 4; // "ORDEN", "H TEO", "H PRA", "CRÉD"
    const totalReducedColsWidth = reducedColWidth * numReducedCols; // Ancho total de columnas reducidas
    const numFixedCols = headers.length - 1; // Todas menos la columna "CURSO"
    const totalFixedColsWidth = fixedColWidth * (numFixedCols - numReducedCols); // Ancho de las columnas fijas

    // Calcular el ancho de la columna "CURSO"
    const courseColWidth = pageWidth - totalReducedColsWidth - totalFixedColsWidth - 2 * margin; // Resta el margen izquierdo y derecho

    // Calcular la posición inicial en el eje X para centrar la tabla
    const startX = margin; // Mantener el margen izquierdo

    this.cursosMallaPreRequisitoByCiclo().forEach(ciclo => {
        // Añadir el número del ciclo como título
        doc.setFontSize(6);
        doc.setFont('helvetica', 'bold');
        doc.text(`${ciclo.cicloNumero} Semestre`, startX, startY);
        const headerOffsetY = startY + 5; // Offset para los encabezados después del título

        // Dibujar encabezados
        let currentX = startX; // Inicializa la posición X para los encabezados
        for (let i = 0; i < headers.length; i++) {
            doc.setFontSize(6);
            doc.setFont('helvetica', 'bold'); // Negrita para los encabezados
            const width = (headers[i] === 'CURSO') ? courseColWidth : (['ORDEN', 'H TEO', 'H PRA', 'CRÉD'].includes(headers[i]) ? reducedColWidth : fixedColWidth);
            doc.rect(currentX, headerOffsetY, width, rowHeight); // Dibuja rectángulo para la celda
            doc.text(headers[i], currentX + 2, headerOffsetY + 3, { baseline: 'middle' }); // Agrega el texto centrado verticalmente
            currentX += width; // Mueve la posición X para la siguiente celda
        }

        // Dibujar filas directamente desde el JSON
        let currentRow = 0; // Contador de filas

        ciclo.cursosMalla.forEach(curso => {
            currentRow++;
            currentX = startX; // Reiniciar la posición X para las filas
            for (let j = 0; j < headers.length; j++) {
                // Configura la fuente a normal aquí para todas las filas
                doc.setFontSize(5);
                doc.setFont('helvetica', 'normal'); // Normal para las filas
                const width = (j === 2) ? courseColWidth : (['ORDEN', 'H TEO', 'H PRA', 'CRÉD'].includes(headers[j]) ? reducedColWidth : fixedColWidth); // Ancho específico para las columnas
                doc.rect(currentX, headerOffsetY + currentRow * rowHeight, width, rowHeight); // Dibuja rectángulo para la celda

                // Llenar las celdas con el contenido correspondiente
                const cellValue = j === 0 ? curso.orden : // ORDEN
                                  j === 1 ? curso.codigoCurso : // CÓDIGO
                                  j === 2 ? curso.nombreCurso : // CURSO
                                  j === 3 ? (curso.preRequisitos.length > 0 ? curso.preRequisitos.map(req => req.nombreCurso.substring(0, 8) + '...').join(', ') : 'N/A') :
                                  j === 4 ? curso.horasTeoricas : // H TEO
                                  j === 5 ? curso.horasPracticas : // H PRA
                                  j === 6 ? curso.totalCreditos : // CRÉD
                                  j === 7 ? curso.tipoCurso : // TIP CUR
                                  curso.tipoEstudio; // ÁREA, puedes modificar si necesitas otra área

                // Asegúrate de establecer la fuente normal justo antes de agregar el texto
                doc.setFont('helvetica', 'normal');
                doc.text(cellValue.toString(), currentX + 2, headerOffsetY + currentRow * rowHeight + 3, { baseline: 'middle' }); // Agrega el texto centrado verticalmente
                currentX += width; // Mueve la posición X para la siguiente celda
            }
        });

        // Actualizar la posición Y para la siguiente tabla
        const totalHeight = 50; // Altura total ocupada por el ciclo actual

        // Manejo de saltos de página
        if (startY + totalHeight + 40 > pageHeight) {
            doc.addPage();
            startY = 20; // Reiniciar el valor de Y al inicio de la nueva página
        } else {
            startY += totalHeight; // Incrementar la posición Y solo si no hay salto de página
        }
    });

    // Guardar el PDF
    doc.save(`${this.planEstudioSelect().nombre}`);
}





}