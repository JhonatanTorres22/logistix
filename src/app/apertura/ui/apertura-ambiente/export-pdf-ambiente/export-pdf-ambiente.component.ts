import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import jsPDF from 'jspdf';
import { AperturaAmbienteSignal } from 'src/app/apertura/domain/signal/apertura-ambiente.signal';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-export-pdf-ambiente',
  standalone: true,
  imports: [UiButtonComponent, SharedModule, CommonModule],
  templateUrl: './export-pdf-ambiente.component.html',
  styleUrl: './export-pdf-ambiente.component.scss'
})
export class ExportPdfAmbienteComponent {

  listaAmbiente = this.ambienteSignal.listarAmbientes
  selectedSemestreLocal = this.cursoAperturadoSignal.listaSemestreLocal 

  @ViewChild('previewPDFSimulacion') previewPDFSimulacion: MatDrawer;

  constructor(
    private ambienteSignal : AperturaAmbienteSignal,
    private cursoAperturadoSignal: CursoAperturadoSignal,
  ){}
  generatePDF() {
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
      // Línea delgada superior
      doc.setLineWidth(lineThicknessThin);
      doc.setDrawColor(0, 0, 139); // Azul para la línea delgada
      doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

      // Línea gruesa
      doc.setLineWidth(lineThicknessThick);
      doc.setDrawColor(0, 0, 139); // Azul para la línea gruesa
      doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2);

      // Línea delgada inferior
      doc.setLineWidth(lineThicknessThin);
      doc.setDrawColor(0, 0, 139); // Azul para la línea delgada
      doc.line(margin, footerY, pageWidth - margin, footerY);

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
        let margin = 30; // Margen para los lados
        let currentY = 12;
        currentY = addLogoAndHeader(myImage, currentY);
        addFooter(); // Añadir pie de página en la primera página

        const title = `AMBIENTES DEL ${this.selectedSemestreLocal().DescripcionSemestre} - ${this.selectedSemestreLocal().DescripcionLocal}`;
        // Configuración de fuente y estilo
        doc.setFont('helvetica', 'bold'); // Fuente Helvetica en negrita
        doc.setFontSize(14);
      
        // Centrar el título horizontalmente
        const textWidth = doc.getTextWidth(title); // Ancho del texto
        const xPosition = (pageWidth - textWidth) / 2; // Posición X centrada
      
        // Agregar el título al PDF
        doc.text(title, xPosition, currentY);

        const headerBackgroundColor = [7, 49, 75]; // Azul oscuro marino (RGB)

        // Definir el color del texto blanco
        const textColor = [255, 255, 255]; // Blanco (RGB)
        
        currentY += 10;
        const rowHeight = 8; // Altura de cada fila
        const columnWidths = [35, 20, 15, 15, 28, 40]; // Ancho de las columnas
        
        const headers = ['Nombre', 'Pabellón', 'Nivel', 'Aforo', 'Discapacidad', 'Tipo'];
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold'); // Negrita para los encabezados
        
        // Iterar sobre las cabeceras y dibujar las celdas con fondo y texto
        headers.forEach((header, index) => {
          // Establecer el color de fondo (azul oscuro marino)
          doc.setFillColor(headerBackgroundColor[0], headerBackgroundColor[1], headerBackgroundColor[2]);
          
          // Dibujar la celda con el color de fondo
          doc.rect(margin, currentY, columnWidths[index], rowHeight, 'F'); // 'F' significa que la celda se rellena con color
          
          // Establecer el color del texto (blanco)
          doc.setTextColor(textColor[0], textColor[1], textColor[2]);
          
          // Agregar el texto con el margen interno
          doc.text(header, margin + 2, currentY + 7);
        
          // Actualizar el margen para la siguiente celda
          margin += columnWidths[index];
        });

        doc.setTextColor(0, 0, 0);
        margin = 30; 

        currentY += rowHeight; // Mover la posición Y debajo de los encabezados
        this.listaAmbiente().forEach(row => {
          let currentX = margin; // Reiniciar X para cada fila
          const rowData = [
            row.nombreAmbiente,
            row.nombrePabellon,
            row.nivelAmbiente.toString(),
            row.aforo.toString(),
            row.discapacidad ? 'Sí' : 'No',
            row.tipoDeAmbiente
          ];
        
          rowData.forEach((cell, index) => {
            doc.rect(currentX, currentY, columnWidths[index], rowHeight); // Dibujar celda
            doc.text(cell, currentX + 2, currentY + 7); // Agregar texto con margen interno
            currentX += columnWidths[index]; // Avanzar al siguiente ancho de columna
          });
        
          currentY += rowHeight; // Avanzar a la siguiente fila
        });


        currentY += rowHeight; // Mover debajo de los encabezados
  doc.setFont('helvetica', 'normal'); // Fuente normal para los datos




        // titulo()
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
