import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Malla } from 'src/app/plan-de-estudios/domain/models/malla.model';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { CursoEquivalenciaComponent } from '../curso-equivalencia/curso-equivalencia.component';


@Component({
  selector: 'list-cursos-equivalencia',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    CursoEquivalenciaComponent
  ],
  templateUrl: './list-cursos-equivalencia.component.html',
  styleUrl: './list-cursos-equivalencia.component.scss'
})
export class ListCursosEquivalenciaComponent {

  @Input() cursosMalla: Malla[] = [];
  @Input() title: string = 'Cursos de la Malla';
  @Input() isOrigen: boolean = true;

  colores = [
    "#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF",
    "#FFB3E6", "#FFABAB", "#FFC3A0", "#FF677D", "#D5AAFF",
    "#A0E7E5", "#C3E8F2", "#FFBCBC", "#FFD3B6", "#FFDD93",
    "#B9FBC0", "#C2B2FF", "#FFC9FF", "#FFB4D8", "#B4E7E3",
    "#FFE1A8", "#FFDAA2", "#A5E1AD", "#D8C4E2", "#D9B4FF",
    "#EAD1DC", "#B2E7E2", "#FFF5BA", "#B4B9FF", "#D7F9A3",
    "#FFEBB7", "#FFE5E2", "#D7E1D5", "#F9E3E0", "#F2C6D4",
    "#E3B7B2", "#A4D4FF", "#F9F5C5", "#FFD6E6", "#B9D8D4",
    "#FFDAC1", "#FFE8D6", "#A6E1F9", "#D7D3C2", "#C3C6FF",
    "#FFC4D6", "#E0B2B2", "#B8E0D2", "#F6E7D7", "#E5B0D6",
    "#D4E09B", "#FCEBAF", "#E5D0D0", "#C5E1A5", "#F1C2D7",
    "#D7B2A4", "#F0E7B0", "#F0C1D1", "#F3D1D1", "#D2F0E7",
    "#F4E7C5", "#E1B8B8", "#F2C8A2", "#B3CDE0", "#F9F1D9"
];
  convalidacion = this.planSignal.convalidacion;
  modoResumen = this.planSignal.modoResumen;

  constructor(
    private planSignal: PlanEstudioSignal
  ) { }

  isConvalidado(idMalla: number): boolean {
    return this.convalidacion().some(convalidacion => 
      convalidacion.idMallaOrigen === idMalla || convalidacion.idMallaDestino === idMalla
    );
  }

  getColor(idMalla: number): string {
    const index = this.convalidacion().findIndex(convalidacion => 
      convalidacion.idMallaOrigen === idMalla || convalidacion.idMallaDestino === idMalla
    );
    return index !== -1 ? this.colores[index % this.colores.length] : 'transparent';
  }

}
