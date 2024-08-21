import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { SemestreAcademico } from 'src/app/programas-academicos/domain/models/semestre-academico.model';
import { SemestreSignal } from 'src/app/programas-academicos/domain/signals/semestre.signal';

@Component({
  selector: 'semestre-options',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiButtonComponent],
  templateUrl: './semestre-options.component.html',
  styleUrl: './semestre-options.component.scss'
})
export class SemestreOptionsComponent implements OnInit {

  // @Input() semestres: SemestreAcademico[] = [];
  semestresAcademicos = this.signal.semestresAcademicos;
  semestreSelect = this.signal.semestreSelect;

  @Input() idSemestres: number[] = [];

  constructor(
    private signal: SemestreSignal,
    private modal: UiModalService
  ) {}

  ngOnInit(): void {
    this.idSemestres.length > 0 ? this.filterSemestres() : '';
  }

  semestreSelected: SemestreAcademico = {
    codigo: '',
    condicion: '',
    id: 0,
    nombre: '',
    usuarioId: 0
  };

  onSelect = () => {
    this.semestreSelect.set( this.semestreSelected );
    this.modal.getRefModal().close();

  }

  filterSemestres = (  ) => {
    const semestresFilter = this.semestresAcademicos().filter( semestre => this.idSemestres.includes( semestre.id ));
    this.semestresAcademicos.set( semestresFilter );
    console.log( semestresFilter );
    
  }

}
