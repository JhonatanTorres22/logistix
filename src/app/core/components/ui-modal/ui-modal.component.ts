import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { uiModalData } from './ui-modal.interface';
import { UiModalService } from './ui-modal.service';

@Component({
  selector: 'app-ui-modal',
  standalone: true,
  imports: [ CommonModule, SharedModule ],
  templateUrl: './ui-modal.component.html',
  styleUrl: './ui-modal.component.scss'
})
export class UiModalComponent {

  

  constructor( 
    @Inject( MAT_DIALOG_DATA ) public data: uiModalData,

  ) {}




}
