import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { MallaCurricularListComponent } from '../malla-curricular-list/malla-curricular-list.component';

@Component({
  selector: 'malla-curricular-side',
  standalone: true,
  imports: [ 
    CommonModule,
    SharedModule,
    MallaCurricularListComponent,
    UiButtonComponent],
  templateUrl: './malla-curricular-side.component.html',
  styleUrl: './malla-curricular-side.component.scss'
})
export class MallaCurricularSideComponent implements OnInit {
  @ViewChild('malla') malla: MatDrawer;

  openMallaCursos = this.signal.openMallaCursos;
  planEstudioSelect = this.signal.planEstudioSelect

  constructor(
    private signal: PlanEstudioSignal
  ) {
    effect( () => {
      console.log( this.openMallaCursos() );
      this.openMallaCursos() ? this.malla.open() : ''
      this.openMallaCursos.set( false );
      
    }, { allowSignalWrites: true })
  }
  ngOnInit(): void {
    // setTimeout(() => {
    //   this.malla.toggle();
    // }, 200);
  }

  cerrar = () => {
    // this.openMallaCursos.set( false );
    this.malla.close();
  }
  
}
