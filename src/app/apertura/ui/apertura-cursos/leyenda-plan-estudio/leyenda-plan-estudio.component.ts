import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { CursoAperturadoSignal } from 'src/app/apertura/domain/signal/curso-aperturado.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';

@Component({
  selector: 'app-leyenda-plan-estudio',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './leyenda-plan-estudio.component.html',
  styleUrl: './leyenda-plan-estudio.component.scss'
})
export class LeyendaPlanEstudioComponent implements OnInit {
  
  resolucionesColoreadas: any[] = [];
  renderizarPor = this.cursoAperturadoSignal.renderizarPor;
  planesDeEstudio = this.planEstudioSignal.planesDeEstudio;
  listaCursosAperturados = this.cursoAperturadoSignal.listaCursosAperturados
  selectProgramaSeleccionado = this.cursoAperturadoSignal.selectProgramaSeleccionado
  constructor(
    private cursoAperturadoSignal: CursoAperturadoSignal,
    private planEstudioSignal: PlanEstudioSignal,
  ) { 
    effect(() => {
      if(this.renderizarPor() == 'RenderizarCurso'){
          this.getColorPorPlan()
      }

      // this.renderizarPor.set('')
    }, { allowSignalWrites: true })
  }

  ngOnInit(): void {    
    // this.getColorPorPlan()
  }

  getColorPorPlan() {
    let colores = [
      '#FFB3BA','#FFDFBA', '#D1BAFF','#BAFFB3','#C2F0C2','#BAE1FF','#FFBAE1','#F8D8B4','#F3C7E0','#FFFFBA',
    ];
    
    const resolucionesUnicas = [...new Set(this.listaCursosAperturados().flatMap(item => item.cursos.map(curso => curso.resolucion)))];
    this.resolucionesColoreadas = resolucionesUnicas.map((resolucion, index) => ({
      resolucion,
      color:colores[index % colores.length]
    }));    
  }
}
