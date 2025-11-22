import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// Configurar el worker de pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
@Component({
  selector: 'app-ui-upload-file',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './ui-upload-file.component.html',
  styleUrl: './ui-upload-file.component.scss'
})
export class UiUploadFileComponent {
  @ViewChild('pdfCanvas') pdfCanvasRef!: ElementRef<HTMLCanvasElement>;

  file: File | null = null;
  isDragOver = false;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const selectedFile = input.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      this.setFile(selectedFile);
    } else {
      alert('Solo se permiten archivos PDF');
    }
  }

  setFile(file: File) {
    this.file = file;
    setTimeout(() => this.renderPDF(file), 0);
  }

  async renderPDF(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 0.3 });
    const canvas = this.pdfCanvasRef.nativeElement;
    const context = canvas.getContext('2d')!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;
  }

  removeFile() {
    this.file = null;
    const canvas = this.pdfCanvasRef?.nativeElement;
    if (canvas) {
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    const droppedFile = event.dataTransfer?.files?.[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      this.setFile(droppedFile);
    } else {
      alert('Solo se permiten archivos PDF');
    }
  }
}
