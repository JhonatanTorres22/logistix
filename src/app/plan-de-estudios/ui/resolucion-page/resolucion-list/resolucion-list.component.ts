import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiButtonIconComponent } from 'src/app/core/components/ui-button-icon/ui-button-icon.component';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { AlertService } from 'src/app/demo/services/alert.service';

import { SharedModule } from 'src/app/demo/shared/shared.module';
import { PlanEstudioRepository } from 'src/app/plan-de-estudios/domain/repositories/plan-estudio.repository';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';

@Component({
  selector: 'resolucion-list',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiButtonIconComponent, UiButtonComponent ],
  templateUrl: './resolucion-list.component.html',
  styleUrl: './resolucion-list.component.scss'
})
export class ResolucionListComponent implements OnInit {

  planesDeEstudio = this.signal.planesDeEstudio;

  constructor(
    private router: Router,
    private repository: PlanEstudioRepository,
    private alert: AlertService,
    private signal: PlanEstudioSignal,
    private modal: UiModalService
  ) {}
  ngOnInit(): void {
    this.obtener();
  }

  
  obtener() {
    this.repository.obtener(1).subscribe({
      next: ( planes ) => {
        console.log( planes );
        this.planesDeEstudio.set( planes )
        // this.
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener los planes de estudios', 'error', 6);
      }
    })
  }
  
  verMalla = () => {
    this.router.navigate(['plan-de-estudios/malla-curricular'])
  }

  agregarPlan = () => {
    
  }

}
