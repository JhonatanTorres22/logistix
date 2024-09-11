import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, TemplateRef } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { OpcionesFiltroComponent } from '../tikets/opciones-filtro/opciones-filtro.component';
import { TicketListComponent } from '../tikets/ticket-list/ticket-list.component';
import { CategoriaPageComponent } from '../tikets/categoria-page/categoria-page.component';

@Component({
  selector: 'app-control-interno-page',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    CategoriaPageComponent,
    OpcionesFiltroComponent,
    TicketListComponent,
  ],

  templateUrl: './control-interno-page.component.html',
  styleUrl: './control-interno-page.component.scss'
})
export class ControlInternoPageComponent {
  
 

  constructor(
    
  ) {}
  

  

}
