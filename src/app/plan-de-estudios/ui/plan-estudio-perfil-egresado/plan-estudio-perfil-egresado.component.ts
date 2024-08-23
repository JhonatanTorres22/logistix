import { Component } from '@angular/core';
import { PlanEstudioSignal } from '../../domain/signal/plan-estudio.signal';
import { CardComponent } from "../../../@theme/components/card/card.component";

@Component({
  selector: 'app-plan-estudio-perfil-egresado',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './plan-estudio-perfil-egresado.component.html',
  styleUrl: './plan-estudio-perfil-egresado.component.scss'
})
export class PlanEstudioPerfilEgresadoComponent {

  planEstudioEdit = this.signal.planEstudioEdit;

  constructor(
    private signal: PlanEstudioSignal,
  ){
    console.log(this.planEstudioEdit(),'******');
    
  }
}
