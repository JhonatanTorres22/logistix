import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { FileUploadModule, FileUploadTypes, FileUploadValidators } from '@iplab/ngx-file-upload';
import { UploaderModule } from 'angular-uploader';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { Uploader, UploadWidgetConfig, UploadWidgetResult } from 'uploader';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// Configurar el worker de pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
const apiKey = 'free';

@Component({
  selector: 'ui-uploader-files',
  standalone: true,
  imports: [ CommonModule, SharedModule, FileUploadModule, UploaderModule],
  templateUrl: './ui-uploader-files.component.html',
  styleUrl: './ui-uploader-files.component.scss'
})
export class UiUploaderFilesComponent {

  @Input() typeFile: string[] = ['application/pdf']
  private filesControl = new UntypedFormControl(null, [FileUploadValidators.filesLimit(2),FileUploadValidators.accept( this.typeFile )]);

  file = this.mensajeriaSignal.file;
previewUrl: string | null = null;

  constructor(
    private mensajeriaSignal: MensajeriaSignal
  ) {

  }
  @Input() showButton: boolean = true;

  filesForm = new UntypedFormGroup({
    files: this.filesControl
  });

  // private method
  toggleStatus() {
    this.filesControl.disabled ? this.filesControl.enable() : this.filesControl.disable();
  }

  uploader = Uploader({ apiKey });
  options: UploadWidgetConfig = {
    multi: false,
    
  };

  onComplete = (files: UploadWidgetResult[]) => {
    console.log('complete...', files);
    
    this.uploadedFileUrl = files[0]?.fileUrl;
  };


setFile = () => {
  const file = this.filesForm.value.files?.[0];
  if (!file) return;

  this.file.set(this.filesForm.value);

  const reader = new FileReader();
  reader.onload = async (e) => {
    const arrayBuffer = e.target?.result as ArrayBuffer;
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 0.2 }); // tamaño pequeño
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const ctx = canvas.getContext('2d')!;
    await page.render({ canvasContext: ctx, viewport }).promise;

    this.previewUrl = canvas.toDataURL(); // lo mostramos en el HTML
  };
  reader.readAsArrayBuffer(file);
};
  uploadedFileUrl: string | undefined = undefined;


  
}
