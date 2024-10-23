import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import jsPDF, { RGBAData } from 'jspdf';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { Malla } from 'src/app/plan-de-estudios/domain/models/malla.model';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { MatDrawer } from '@angular/material/sidenav';
import { SharedModule } from 'src/app/demo/shared/shared.module';
@Component({
  selector: 'app-exportar-pdf-analisis-equivalencia',
  standalone: true,
  imports: [
    UiButtonComponent,
    CommonModule,
    MatDrawer,
    SharedModule
  ],
  templateUrl: './exportar-pdf-analisis-equivalencia.component.html',
  styleUrl: './exportar-pdf-analisis-equivalencia.component.scss'
})
export class ExportarPdfAnalisisEquivalenciaComponent implements OnInit {

  @ViewChild('previewPDFSimulacion') previewPDFSimulacion: MatDrawer;

  @Input() cursosMalla: Malla[] = [];
  nombreProgramaAcademico = this.auth.currentInfoDirector()[0].NombreProgramaAcademico
  convalidacion = this.planSignal.convalidacion;
  cursosFaltanRealizar: Malla[] = [];
  constructor(
    private auth: AuthSignal,
    private planSignal: PlanEstudioSignal
  ) { }

  ngOnInit(): void {

  }

  exportarPdf() {

    if (this.previewPDFSimulacion) {
      this.previewPDFSimulacion.open();
    }

    const doc = new jsPDF();
    // --------------------------------------------------------------------------------------------------------------
    // -----------------------------------------LOGO Y FECHA-------------------------------------------
    // --------------------------------------------------------------------------------------------------------------

    const addLogoAndHeader = (myImage: string, currentY: number) => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const currentDate = new Date().toLocaleDateString('es-ES', options);

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 30; // Margen para los lados

      const logoX = pageWidth - margin - 40;

      doc.addImage(myImage, 'png', logoX + 10, currentY, 50, 12);
      currentY += 20; // Incrementar Y después de añadir el logo
      doc.setFontSize(9);
      doc.text(`Chincha, ${currentDate}`, pageWidth - margin - doc.getTextWidth(currentDate), currentY);

      return currentY + 15; // Devuelve la nueva posición Y
    };


    // --------------------------------------------------------------------------------------------------------------
    // -----------------------------------------CONVERTIR IMAGEN A BASE 64-------------------------------------------
    // --------------------------------------------------------------------------------------------------------------
    const convertImageToBase64 = (url: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // Esto es necesario si la imagen está alojada en un dominio diferente
        img.src = url;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
          } else {
            reject(new Error('No se pudo crear el contexto del canvas'));
          }
        };
        img.onerror = (err) => reject(err);
      });
    };

    // --------------------------------------------------------------------------------------------------------------
    // ---------------------------------------DIBUJAR LA TABLA-------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------

    const drawTable = (currentY: number, myImage: string) => {
      // Definir encabezados y anchos de columnas
      const headers = ['CICLO', 'CÓDIGO', 'CURSO', 'CRÉDITO'];
      const columnWidths = [14, 23, 100, 17]; // Ajusta los anchos según sea necesario
      const totalWidth = columnWidths.reduce((a, b) => a + b, 0);
      const margin = 30;

      // Configurar el estilo para los encabezados
      doc.setFillColor(106, 142, 224);
      doc.rect(margin, currentY, totalWidth, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255); // Color blanco

      // Escribir encabezados
      let x = margin;
      headers.forEach((header, index) => {
        doc.text(header, x + (columnWidths[index] / 2), currentY + 4, { align: 'center' });
        x += columnWidths[index];
      });

      doc.setTextColor(0, 0, 0); // Color negro
      doc.setFont('helvetica', 'normal');

      // Filtrar los cursos
      const filteredCursos = this.cursosMalla.filter(curso => {
        const validacion = this.convalidacion().find(val => val.idMallaDestino === curso.idMalla);
        return (validacion && (
          String(validacion.porcentajeModificacion) === "Indeterminado" ||
          (String(validacion.porcentajeModificacion) !== "" && parseInt(String(validacion.porcentajeModificacion)) > 50)
        )) || !validacion; // Incluir cursos sin validación
      });

      currentY += 6; // Espacio debajo del encabezado

      // Escribir datos en la tabla
      filteredCursos.forEach(item => {
        // Comprobar si se necesita nueva página
        if (currentY + 5 > doc.internal.pageSize.height - margin) {
          doc.addPage(); // Añadir nueva página
          currentY = addLogoAndHeader(myImage, 10); // Volver a agregar logo y encabezado
        }

        x = margin; // Reiniciar x para cada fila
        const lineWidth = 0.2; // Grosor de línea delgada
        doc.setLineWidth(lineWidth);
        doc.rect(x, currentY, columnWidths[0], 5); // CICLO
        doc.rect(x + columnWidths[0], currentY, columnWidths[1], 5); // CÓDIGO
        doc.rect(x + columnWidths[0] + columnWidths[1], currentY, columnWidths[2], 5); // CURSO
        doc.rect(x + columnWidths[0] + columnWidths[1] + columnWidths[2], currentY, columnWidths[3], 5); // CRÉDITO

        // Escribir datos
        doc.text(item.cicloRomano, x + (columnWidths[0] / 2), currentY + 3, { align: 'center' }); // CICLO centrado
        x += columnWidths[0];
        doc.text(item.codigoCurso, x + (columnWidths[1] / 2), currentY + 3, { align: 'center' }); // CÓDIGO centrado
        x += columnWidths[1];
        doc.text(item.nombreCurso, x + 1, currentY + 3); // CURSO alineado a la izquierda
        x += columnWidths[2];
        doc.text(item.totalCreditos.toString(), x + (columnWidths[3] / 2), currentY + 3, { align: 'center' }); // CRÉDITO centrado

        currentY += 5; // Espacio entre filas
      });

      // Dibujar la línea final de la tabla
      doc.line(margin, currentY, margin + totalWidth, currentY); // Línea final

      return currentY; // Retorna la nueva posición Y
    };


    // --------------------------------------------------------------------------------------------------------------
    // ---------------------------------------PIE DE PÁGINA----------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------
    const addFooter = () => {
      const margin = 30;
      const pageWidth = doc.internal.pageSize.getWidth();

      // Información del pie de página
      const address = 'Av. Abelardo Alva Maúrtua 489 - 499 |Chincha Alta - Chincha - Ica';
      const phoneNumber = '056 269176';
      const website = 'www.autonomadeica.edu.pe';

      // Configuración de estilo
      doc.setFontSize(6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0); // Color negro para el texto

      // Calcular la posición Y del pie de página
      const footerY = doc.internal.pageSize.height - margin + 5;

      // Definir el color azul marino (puedes ajustar el RGB según sea necesario)
      const navyBlue = [47, 70, 12]; // Color RGB para azul marino

      // Dibujar líneas
      const lineThicknessThin = 0.2; // Grosor de la línea delgada
      const lineThicknessThick = 0.5; // Grosor de la línea gruesa

      // Línea delgada superior
      doc.setLineWidth(lineThicknessThin);
      doc.setDrawColor(navyBlue[0], navyBlue[1], navyBlue[2]); // Establecer el color de la línea
      doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4); // Línea delgada arriba

      // Línea gruesa
      doc.setLineWidth(lineThicknessThick);
      doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2); // Línea gruesa en el medio

      // Línea delgada inferior
      doc.setLineWidth(lineThicknessThin);
      doc.line(margin, footerY, pageWidth - margin, footerY); // Línea delgada abajo

      // Dibujar el texto centrado
      const textY = footerY + 5; // Espacio debajo de las líneas
      const textXAddress = (pageWidth - doc.getTextWidth(address)) / 2; // Centrar el texto
      const textXPhone = (pageWidth - doc.getTextWidth(phoneNumber)) / 2; // Centrar el texto
      const textXWebsite = (pageWidth - doc.getTextWidth(website)) / 2; // Centrar el texto

      doc.text(address, textXAddress, textY);
      doc.text(phoneNumber, textXPhone, textY + 3);
      doc.text(website, textXWebsite, textY + 6);

      // Restablecer el color de la línea a negro (u otro color predeterminado)
      doc.setDrawColor(0, 0, 0); // Color negro para líneas posteriores

    };


    // --------------------------------------------------------------------------------------------------------------
    // ---------------------------------------DIBUJAR EL PDF---------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------

    convertImageToBase64('./assets/images/logo_negro_v2.png').
      then((myImage) => {

        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 30; // Margen para los lados
        let currentY = 12;
        currentY = addLogoAndHeader(myImage, currentY);
        addFooter(); // Añadir pie de página en la primera página


        const title = 'CARTA Nº354-2024-UAI-FCS';
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        const textWidth = doc.getTextWidth(title);
        // const pageWidth = doc.internal.pageSize.getWidth();
        const titleX = (pageWidth - textWidth) / 2;
        doc.text(title, titleX, currentY);

        const underlineThickness = 0.5;
        doc.setLineWidth(underlineThickness);
        doc.line(titleX, currentY + 1, titleX + textWidth, currentY + 1);

        currentY += 10;

        doc.setFontSize(7);
        doc.text('Sr(a).', margin, currentY);
        currentY += 7;
        const lineWidth = (pageWidth - 2 * margin);
        const dashLength = 0.5; // Longitud de cada segmento de línea
        const gapLength = 1;    // Longitud del espacio entre los segmentos
        let currentX = margin;
        const lineThickness = 0.3; // Grosor de la línea punteada

        // Configurar el grosor de la línea
        doc.setLineWidth(lineThickness);

        // Dibujar una línea punteada simulada
        while (currentX < margin + lineWidth) {
          doc.line(currentX, currentY, currentX + dashLength, currentY); // Dibujar segmento de línea
          currentX += dashLength + gapLength; // Mover la posición X para el próximo segmento
        }
        currentY += 5;
        doc.text(`PROGRAMA ACADÉMICO DE ${this.nombreProgramaAcademico}`, margin, currentY);
        currentY += 10;

        // Texto principal
        const firstPart = 'Por medio del presente me dirijo a usted para saludarle cordialmente y a la vez dar respuesta a la solicitud de REINGRESO. Ante el pedido se realizan las siguientes observaciones:';
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');

        const fullText = `${firstPart}`;
        const lines = doc.splitTextToSize(fullText, pageWidth - 2 * margin);

        lines.forEach((line: string | string[]) => {
          // Comprobar si se necesita nueva página
          if (currentY + 5 > doc.internal.pageSize.height - margin) {
            doc.addPage();
            currentY = addLogoAndHeader(myImage, 10);
            addFooter()
          }
          doc.text(line, margin, currentY);
          currentY += 5; // Espacio entre líneas
        });

        // Observaciones
        const observations = `
      1.  La estudiante ingresó a la universidad en el periodo 2023-1. Su última matrícula pertenece al 2023-2.
      2.  Se autoriza el reingreso al periodo 2024-2, así mismo, de acuerdo a la evaluación académica realizada en esta instancia, se informa a la interesada, en el siguiente cuadro, la relación de cursos y créditos que están pendientes de estudiar que completarán su formación en el Programa Académico.
      3.  Es la interesada, quien decide finalmente, al momento de su matrícula la selección de ambos aspectos. Dicha evaluación no es apelable, para lo cual la estudiante podrá matricularse en los cursos que le faltarían llevar según el Plan Curricular actual.`;

        const observationLines = doc.splitTextToSize(observations, pageWidth - 2 * margin);
        observationLines.forEach((line: string | string[]) => {
          // Comprobar si se necesita nueva página
          if (currentY + 5 > doc.internal.pageSize.height - margin) {
            doc.addPage();
            currentY = addLogoAndHeader(myImage, 10);
            addFooter();
          }
          doc.text(line, margin, currentY);
          currentY += 5; // Espacio entre líneas
        });

        // Añadir la tabla
        currentY += 7; // Espacio antes de la tabla
        currentY = drawTable(currentY, myImage); // Dibuja la tabla

        const additionalText = `
4. Para matricularse deberá presentar los requisitos exigidos, en el periodo de matrícula regular con copia de la presente carta.

5. Se informa a la interesada que, de no aprobar la asignatura de Redacción y Comunicación, será suspendida por el
periodo de un año académico, dando cumplimiento a lo estipulado en el Capítulo IX, artículo 46 del reglamento de
estudios de la Universidad Autónoma de Ica, se precisa que, la desaprobación de una misma materia por tres veces da
lugar a que el estudiante sea separado temporalmente por un año de la Universidad. Al término de este plazo el
estudiante solo se podrá matricular en la materia que desaprobó anteriormente, para retornar de manera regular a sus
estudios en el ciclo siguiente. Esto se ve reflejado en la LEY UNIVERSITARIA N°30220, en el Capítulo IX, artículo 102,
en donde precisa que, "La desaprobación de una misma materia por tres veces da lugar a que el estudiante sea
separado temporalmente por un año de la universidad. Al término de este plazo, el estudiante solo se podrá matricular
en la materia que desaprobó anteriormente, para retornar de manera regular a sus estudios en el ciclo siguiente. Si
desaprueba por cuarta vez procede su retiro definitivo".

`;

        // Añadir el texto al PDF después de la tabla
        const additionalTextLines = doc.splitTextToSize(additionalText, pageWidth - 2 * margin);

        additionalTextLines.forEach((line: string | string[]) => {
          // Comprobar si se necesita nueva página
          if (currentY + 5 > doc.internal.pageSize.height - margin) {
            doc.addPage();
            currentY = addLogoAndHeader(myImage, 10);
            addFooter(); // Añadir pie de página en la nueva página
          }
          doc.setFontSize(8)
          doc.text(line, margin, currentY);
          currentY += 5; // Espacio entre líneas
        });


        // Añadir el texto antes del enlace
        const linkText = 'La interesada puede consultar esto en el siguiente enlace:';
        doc.text(linkText, margin, currentY);
        currentY += 5; // Espacio entre el texto y el enlace
        
        // Añadir el enlace clicable con la URL
        doc.setFont('helvetica', 'bold');
        const lawUrl = 'http://www.minedu.gob.pe/reforma-universitaria/pdf/ley_universitaria_04_02_2022.pdf';
        doc.textWithLink(lawUrl, margin, currentY, { url: lawUrl });

currentY += 5; // Mover el cursor hacia abajo para seguir escribiendo


        // Añadir texto final después de la tabla
        const farewellText = 'Sin otro particular, me despido de usted.';
        const closingText = 'Atentamente.';

        // Información del firmante
        let signatoryInfoLines;

        if (this.nombreProgramaAcademico === 'PSICOLOGÍA' || this.nombreProgramaAcademico === 'OBSTETRICIA' ||
          this.nombreProgramaAcademico === 'MEDICINA HUMANA' ||
          this.nombreProgramaAcademico === 'ENFERMERÍA') {

          signatoryInfoLines = [
            '----------------------------------------------------------------',
            'Dra. Susana Marleni Atuncar Deza',
            'DECANA (E)',
            'FACULTAD DE CIENCIAS DE LA SALUD',
            'UNIVERSIDAD AUTÓNOMA'
          ];
        } else {

          signatoryInfoLines = [
            '----------------------------------------------------------------',
            'Dra. Mariana Alejandra Campos Sobrino',
            'DECANA (E)',
            'FACULTAD DE INGENIERÍA, CIENCIAS Y ADMINISTRACIÓN',
            'UNIVERSIDAD AUTÓNOMA'
          ];
        }

        // Espacio antes del mensaje de despedida
        currentY += 10; // Ajusta este valor según el espacio que necesites

        // Comprobar si hay suficiente espacio antes de añadir el texto final
        const remainingSpace = doc.internal.pageSize.height - currentY - margin; // Espacio restante en la página

        if (remainingSpace < 15) { // Si el espacio restante es menor a 15 (ajusta según tu necesidad)
          doc.addPage(); // Añadir nueva página
          currentY = addLogoAndHeader(myImage, 10); // Volver a agregar logo y encabezado
          addFooter(); // Añadir pie de página en la nueva página
          currentY += 10; // Espacio inicial en la nueva página
        }

        // Añadir el texto de despedida
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(farewellText, margin, currentY);
        currentY += 8; // Espacio entre líneas
        doc.text(closingText, (pageWidth - doc.getTextWidth(closingText)) / 2, currentY); // Texto "Atentamente." centrado
        currentY += 25; // Espacio después del saludo

        // Agregar la información del firmante centrada
        signatoryInfoLines.forEach((line) => {
          // Comprobar si se necesita nueva página antes de cada línea
          if (currentY + 5 > doc.internal.pageSize.height - margin) {
            doc.addPage();
            currentY = addLogoAndHeader(myImage, 10);
            addFooter(); // Añadir pie de página en la nueva página
            currentY += 10; // Espacio inicial en la nueva página
          }
          // Calcular la posición X centrada
          const lineX = (pageWidth - doc.getTextWidth(line)) / 2; // Centrar la línea
          doc.text(line, lineX, currentY);
          currentY += 5; // Espacio entre líneas
        });

        addFooter(); // Asegurarse de que se añade al final

        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        // Mostrar el PDF en un visor
        const pdfViewer = document.getElementById('pdfViewer') as HTMLIFrameElement;


        if (pdfViewer) {
          pdfViewer.src = pdfUrl;
        } else {
          console.error('No se encontró un elemento con el ID "pdfViewer" para insertar el visor de PDF.');
        }
        // doc.save('carta.pdf'); // Guardar el PDF

      })
      .catch((err) => {
        console.error('error al cargar la imagen', err);

      })
  }

  cerrar = () => {
    this.previewPDFSimulacion.close();
  }

}
