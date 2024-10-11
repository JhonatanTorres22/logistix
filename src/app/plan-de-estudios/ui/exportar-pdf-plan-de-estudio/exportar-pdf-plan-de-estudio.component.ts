import { Component, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { MallaSignal } from '../../domain/signal/malla.signal';
import { CommonModule } from '@angular/common';
import { PlanEstudioSignal } from '../../domain/signal/plan-estudio.signal';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { MatDrawer } from '@angular/material/sidenav';
import { SharedModule } from 'src/app/demo/shared/shared.module';
@Component({
    selector: 'app-exportar-pdf-plan-de-estudio',
    standalone: true,
    imports: [UiButtonComponent, CommonModule,  SharedModule],
    templateUrl: './exportar-pdf-plan-de-estudio.component.html',
    styleUrl: './exportar-pdf-plan-de-estudio.component.scss'
})
export class ExportarPdfPlanDeEstudioComponent implements OnInit {
    nombreProgramaAcademico = this.auth.currentInfoDirector()[0].NombreProgramaAcademico
    cursosMallaPreRequisitoByCiclo = this.mallaSignal.cursosMallaPreRequisitoByCiclo;
    planEstudioSelect = this.signalPlanEstudio.planEstudioSelect;
    @ViewChild('previewPDFPlanEstudio') previewPDFPlanEstudio: MatDrawer;

    constructor(

        private auth: AuthSignal,
        private signalPlanEstudio: PlanEstudioSignal,
        private mallaSignal: MallaSignal,
    ) { 

    }
    ngOnInit(): void {
    }
  
    exportarProyectoMasivo = () => {
        if (this.previewPDFPlanEstudio) {          
            this.previewPDFPlanEstudio.open();
        }
        const doc = new jsPDF();

        let startY = 20; // Posición inicial en el eje Y
        const rowHeight = 5; // Altura de cada fila
        const fixedColWidth = 18; // Ancho fijo de las demás columnas
        const reducedColWidth = 12; // Ancho de las columnas que se reducen
        const pageWidth = 210; // Ancho de la hoja A4 en mm
        const pageHeight = 297; // Altura de la hoja A4 en mm
        const margin = 10; // Margen desde el borde de la hoja

        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');

        // Cargar imagen (asegúrate de tener la URL base64 o path correcto de la imagen)
        // const imgUrl = ''
        // const imgWidth = 45; // Ancho de la imagen
        // const imgHeight = 12; // Alto de la imagen
        // doc.addImage(imgUrl, 'PNG', margin, 5, imgWidth, imgHeight); // Posicionar la imagen en el margen izquierdo

        // Mostrar fecha y hora de descarga en la parte superior derecha
        const fechaActual = new Date();
        const fechaStr = fechaActual.toLocaleDateString();
        const horaStr = fechaActual.toLocaleTimeString();
        doc.setFontSize(6);
        doc.setFont('helvetica', 'normal');
        doc.text(`${fechaStr} ${horaStr}`, pageWidth - margin - 30, 15); // Posicionamos la fecha en la esquina derecha

        // Mostrar el nombre del plan de estudio en el centro debajo de la imagen y la fecha
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`${this.planEstudioSelect().nombre}`, ((pageWidth - doc.getTextWidth(this.planEstudioSelect().nombre)) / 2), startY);

        startY += 7; // Ajustar la posición Y después del título

        const generarAbreviatura = (nombrePrograma: string) => {
            const palabrasIgnoradas = ['de', 'y', 'la', 'el', 'los', 'las', 'del'];
            const palabras = nombrePrograma.toLowerCase().split(' '); // Dividimos el nombre por espacios
            const palabrasFiltradas = palabras.filter(palabra => !palabrasIgnoradas.includes(palabra)); // Filtramos las palabras de conexión

            if (palabrasFiltradas.length === 1) {
                // Si es solo una palabra, tomar las dos primeras letras
                return palabrasFiltradas[0].substring(0, 2).toUpperCase();
            } else {
                // Si son dos o más palabras, tomar la primera letra de las primeras dos palabras
                return palabrasFiltradas[0][0].toUpperCase() + palabrasFiltradas[1][0].toUpperCase();
            }
        };

        // Obtener el nombre del programa académico y su abreviatura
        const nombrePrograma = this.nombreProgramaAcademico;
        const abreviatura = generarAbreviatura(nombrePrograma);

        // Mostrar "Programa Académico" y el nombre del programa al lado derecho con la abreviatura entre paréntesis
        doc.setFontSize(6);
        doc.setFont('helvetica', 'normal');
        doc.text('Programa Académico:', margin, startY);
        doc.text(`(${abreviatura}) ${nombrePrograma} `, pageWidth - margin - 80, startY); // Nombre del programa al lado derecho con abreviatura

        startY += 4; // Ajustar la posición Y después del título
        doc.line(margin, startY, pageWidth - margin, startY); // Línea horizontal
        startY += 4; // Ajustar la posición Y para el inicio de la tabla

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
            const headerOffsetY = startY + 4; // Offset para los encabezados después del título

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
                                j === 3 ? (curso.preRequisitos.length > 0 ? curso.preRequisitos.map(req => req.nombreCurso.substring(0, 8) + '...').join(', ') : '') :
                                    j === 4 ? curso.horasTeoricas : // H TEO
                                        j === 5 ? curso.horasPracticas : // H PRA
                                            j === 6 ? curso.totalCreditos : // CRÉD
                                                j === 7 ? curso.tipoCurso : // TIP CUR
                                                    curso.tipoEstudio; // ÁREA

                    doc.setFont('helvetica', 'normal');
                    doc.text(cellValue.toString(), currentX + 2, headerOffsetY + currentRow * rowHeight + 3, { baseline: 'middle' }); // Agrega el texto centrado verticalmente
                    currentX += width; // Mueve la posición X para la siguiente celda
                }
            });

            // Actualizar la posición Y para la siguiente tabla
            const totalHeight = 50; // Altura total ocupada por el ciclo actual

            // Manejo de saltos de página
            if (startY + totalHeight + 20 > pageHeight) {
                doc.addPage();
                startY = 10; // Reiniciar el valor de Y al inicio de la nueva página
            } else {
                startY += totalHeight; // Incrementar la posición Y solo si no hay salto de página
            }
        });

        // Guardar el PDF
        // doc.save(`${this.planEstudioSelect().nombre}`);
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        // Mostrar el PDF en un visor
        const pdfViewer = document.getElementById('pdfViewer') as HTMLIFrameElement;


          if (pdfViewer) {
            pdfViewer.src = pdfUrl;
          } else {
            console.error('No se encontró un elemento con el ID "pdfViewer" para insertar el visor de PDF.');
          }
    }

    cerrar = () => {
        this.previewPDFPlanEstudio.close();
    }
}