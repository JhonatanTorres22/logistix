import { Component, OnInit } from '@angular/core';
import { EvaluacionRepository } from '../../domain/repositories/evaluacion.repository';
import { ProveedorSignal } from '../../domain/signals/proveedor.signal';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CommonModule } from '@angular/common';
import { EvaluacionSignal } from '../../domain/signals/evaluacion.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { Criterio } from '../../domain/models/evaluacion.model';
import { AlertService } from 'src/app/demo/services/alert.service';
import { UiLoadingProgressBarComponent } from 'src/app/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { FileUploadModule } from 'primeng/fileupload';
import { UiUploaderFilesComponent } from 'src/app/core/components/ui-uploader-files/ui-uploader-files.component';
import { UiUploadFileComponent } from 'src/app/core/components/ui-upload-file/ui-upload-file.component';
@Component({
  selector: 'app-list-criterios',
  standalone: true,
  imports: [SharedModule, CommonModule, UiButtonComponent,UiUploadFileComponent,UiUploaderFilesComponent, UiInputComponent, UiLoadingProgressBarComponent],
  templateUrl: './list-criterios.component.html',
  styleUrl: './list-criterios.component.scss'
})
export class ListCriteriosComponent implements OnInit {
  loading: boolean = true;
  criterioList = this.criterioSignal.criterioList
  proveedorSelect = this.proveedorSignal.proveedorSelect
  formCriterios! : FormGroup
  constructor(
    private alert: AlertService,
    private criterioSignal : EvaluacionSignal,
    private repository: EvaluacionRepository,
    private proveedorSignal : ProveedorSignal
  ) {
    this.formCriterios = new FormGroup({});
   }

    files: File[] = [];
  isDragOver = false;

  ngOnInit(): void {
    this.obtenerCriterios()
  }
  
obtenerCriterios() {
  this.repository.obtenerCriterios().subscribe({
    next: (criterios) => {
      this.criterioList.set(criterios);

      // Crear los FormControls aquí
      this.formCriterios = new FormGroup({});
      criterios.forEach(c => {
        const controlName = this.getControlName(c.codigo);
        this.formCriterios.addControl(
          controlName,
          new FormControl('', this.getValidators(c))
        );
      });
      this.alert.showAlert('Criterios cargados con éxito', 'success');

      this.loading = false;
    },
    error: (error) => {
      this.alert.showAlert('Ocurrió un error al obtener los criterios', 'error');
      this.loading = false;
    }
  });
}


  getControlName(codigo: number): string {
    return `criterio_${codigo}`;
  }



  getValidators(criterio: Criterio) {
    const validators = [];

    if (criterio.obligatorio) validators.push(Validators.required);


    return validators;
  }
 onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files.length) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  onFileSelected(event: any) {
    this.addFiles(event.target.files);
  }

  addFiles(fileList: FileList) {
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type === 'application/pdf') {
        this.files.push(file);
      } else {
        alert(`${file.name} no es un PDF`);
      }
    }
  }

  removeFile(file: File) {
    this.files = this.files.filter(f => f !== file);
  }

  uploadFiles() {
    this.files.forEach(file => {
      const formData = new FormData();
      formData.append('pdf', file, file.name)
    });
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
