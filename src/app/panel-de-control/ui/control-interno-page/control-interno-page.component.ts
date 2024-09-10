import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, TemplateRef } from '@angular/core';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { CategoriaListComponent } from '../tikets/categoria-page/categoria-list/categoria-list.component';
import { CategoriaRepository } from '../../domain/repositories/categoria.repository';
import { CategoriaSignal } from '../../domain/signals/categoria.signal';
import { CategoriaAddComponent } from '../tikets/categoria-page/categoria-add/categoria-add.component';
import { UiButtonIconComponent } from "../../../core/components/ui-button-icon/ui-button-icon.component";
import { Categoria, CategoriaEliminar } from '../../domain/models/categoria.model';
import { SubCategoriaAddComponent } from '../tikets/sub-categoria-page/sub-categoria-add/sub-categoria-add.component';
import { OpcionesFiltroComponent } from '../tikets/opciones-filtro/opciones-filtro.component';
import { TicketListComponent } from '../tikets/ticket-list/ticket-list.component';
import { CategoriaPageComponent } from '../tikets/categoria-page/categoria-page.component';

@Component({
  selector: 'app-control-interno-page',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiButtonComponent,
    CategoriaAddComponent,
    CategoriaPageComponent,
    SubCategoriaAddComponent,
    OpcionesFiltroComponent,
    TicketListComponent,
    UiButtonComponent,
    UiButtonIconComponent,
  ],

  templateUrl: './control-interno-page.component.html',
  styleUrl: './control-interno-page.component.scss'
})
export class ControlInternoPageComponent {
  
 

  constructor(
    
  ) {}
  

  

}
