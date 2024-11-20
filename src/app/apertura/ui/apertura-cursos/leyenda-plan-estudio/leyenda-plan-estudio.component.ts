import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';

@Component({
  selector: 'app-leyenda-plan-estudio',
  standalone: true,
  imports: [CommonModule, SharedModule, UiButtonComponent],
  templateUrl: './leyenda-plan-estudio.component.html',
  styleUrl: './leyenda-plan-estudio.component.scss'
})
export class LeyendaPlanEstudioComponent implements OnInit {

  planesDeEstudio = this.planEstudioSignal.planesDeEstudio;
  listaCursosAperturados = this.cursoAperturadoSignal.listaCursosAperturados
  constructor(
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private planEstudioSignal: PlanEstudioSignal,
  ) { }

  ngOnInit(): void {
    this.getColorPorPlan()
  }

  resolucionesColoreadas: any[] = [];
  getColorPorPlan() {
    let colores = [
      '#FFB3BA','#FFDFBA', '#FFFFBA','#BAFFB3','#BAE1FF','#D1BAFF','#FFBAE1','#C2F0C2','#F3C7E0','#F8D8B4',
    ];
  
    const resolucionesUnicas = [...new Set(this.listaCursosAperturados().flatMap(item => item.cursos.map(curso => curso.resolucion)))];
    this.resolucionesColoreadas = resolucionesUnicas.map((resolucion, index) => ({
      resolucion,
      color:colores[index % colores.length]
    }));
  }
}
