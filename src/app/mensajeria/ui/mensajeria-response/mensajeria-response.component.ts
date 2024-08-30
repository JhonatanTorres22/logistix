import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MensajeriaFlujoNavegacionComponent } from '../mensajeria-flujo-navegacion/mensajeria-flujo-navegacion.component';
import { UiUploaderFilesComponent } from "../../../core/components/ui-uploader-files/ui-uploader-files.component";
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';

@Component({
  selector: 'mensajeria-response',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    QuillEditorComponent,
    UiButtonComponent,
    MensajeriaFlujoNavegacionComponent,
    UiUploaderFilesComponent
],
  templateUrl: './mensajeria-response.component.html',
  styleUrl: './mensajeria-response.component.scss'
})
export class MensajeriaResponseComponent implements OnInit, OnDestroy {

  @ViewChild('selectDestinatario') selectDestinatario: MatSelect; 

  mensaje: string = '';
  showFormResponse = this.signal.showFormResponse;
  listaDestinatariosResponderA = this.signal.listaDestinatariosResponderA;
  listaDestinatariosResponderAflujo = this.signal.listaDestinatariosResponderAflujo;
  selectedDestinatarioResponderA = this.signal.selectedDestinatarioResponderA;
  file = this.signal.file;
  paraRemitenteForm: FormGroup;
  showUpload: boolean = false;
  constructor(
    private signal: MensajeriaSignal,
    private fb: FormBuilder,
    private modal: UiModalService
  ) {
    this.paraRemitenteForm = this.fb.group({
      destinatario: ['', [Validators.required]] 
    })
  }
  ngOnDestroy(): void {
    this.showFormResponse.set( false );
    this.listaDestinatariosResponderAflujo.set( this.signal.listaDestinatariosResponderADefault );
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.selectDestinatario.open();
    }, 100);
    
  }

  change( event: any ) {
    console.log( event );
    
  }


  showUploader = () => {
    this.showUpload = !this.showUpload;
  }

  // showUploaderModal = ( template: TemplateRef<any> ) => {
  //   this.modal.openTemplate({
  //     template,
  //     titulo: 'Gestión de Archivos'
  //   })
  // }
  

}
