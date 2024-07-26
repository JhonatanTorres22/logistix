import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { uiModalTemplateData } from '../ui-modal/ui-modal.interface';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UiModalHeaderComponent } from './ui-modal-header/ui-modal-header.component';
import { UiModalService } from '../ui-modal/ui-modal.service';

@Component({
  selector: 'app-ui-modal-template',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiModalHeaderComponent ],
  templateUrl: './ui-modal-template.component.html',
  styleUrl: './ui-modal-template.component.scss'
})
export class UiModalTemplateComponent {

  constructor(
    @Inject( MAT_DIALOG_DATA ) public data: uiModalTemplateData,
    private modal: UiModalService
  ) {}

  cerrar() {
    // console.log('ss');
    
    this.modal.getRefModal().close('cancelar')
  }

}
