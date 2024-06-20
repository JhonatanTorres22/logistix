import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AsignacionRepository } from '../../domain/repositories/asignacion.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioRol } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { Facultad } from '../../domain/models/facultad.model';
import { Local } from '../../domain/models/local.model';
import { ProgramaFacultad } from '../../domain/models/programa.model';
import { SemestreAcademico } from '../../domain/models/semestre-academico.model';
import { SemestreAcademicoDomainService } from '../../domain/services/semestre-academico-domain.service';
import { DecanoSignal } from '../../domain/signals/decano.signal';
import { DirectorSignal } from '../../domain/signals/director.signal';
import { FacultadSignal } from '../../domain/signals/facultad.signal';
import { LocalSignal } from '../../domain/signals/local.signal';
import { ProgramaSignal } from '../../domain/signals/programa.signal';
import { SemestreSignal } from '../../domain/signals/semestre.signal';
import { SemestreAcademicoPageComponent } from '../semestre-academico-page/semestre-academico-page.component';
import { DecanoPageComponent } from '../decano-page/decano-page.component';
import { DirectorPageComponent } from '../director-page/director-page.component';
import { FacultadListComponent } from '../facultades-page/facultad-list/facultad-list.component';
import { FacultadPageComponent } from '../facultades-page/facultad-page.component';
import { LocalPageComponent } from '../local-page/local-page.component';
import { ProgramaAcademicoPageComponent } from '../programa-academico-page/programa-page.component';
import { SemestreListComponent } from '../semestre-academico-page/semestre-list/semestre-list.component';

@Component({
  selector: 'asignacion-page',
  standalone: true,
  imports: [ 
    CommonModule,
    SharedModule,
    SemestreAcademicoPageComponent,
    FacultadPageComponent,
    SemestreListComponent,
    FacultadListComponent,
    ProgramaAcademicoPageComponent,
    LocalPageComponent,
    DecanoPageComponent,
    DirectorPageComponent,
    AsignacionPageComponent,
  ],
  templateUrl: './asignacion-page.component.html',
  styleUrl: './asignacion-page.component.scss'
})
export class AsignacionPageComponent implements OnInit {


    semestresAcademicos = this.semestreAcademicoDomainService.semestresAcademicos;
    semestreAcademicoAperturado = this.semestreAcademicoDomainService.semestreAcademicoAperturado;
    existeSemestreCreado: boolean;

    semestreSelect: WritableSignal<SemestreAcademico> = this.semestreSignal.semestreSelect;
    facultadSelect: WritableSignal<Facultad> = this.facultadSignal.facultadSelect;
    programaSelect: WritableSignal<ProgramaFacultad> = this.programaSignal.programaSelect;
    decanoSelect: WritableSignal<UsuarioRol> = this.decanoSignal.decanoSelect;
    directorSelect: WritableSignal<UsuarioRol> = this. directorSignal.directorSelect;
    localSelect: WritableSignal<Local> = this.localSignal.localSelect;
    // decanoSelect: 
    constructor( 
        
        private dialog: MatDialog,
        private semestreAcademicoDomainService: SemestreAcademicoDomainService,
        private programaSignal: ProgramaSignal,
        private semestreSignal: SemestreSignal,
        private facultadSignal: FacultadSignal,
        private decanoSignal: DecanoSignal,
        private directorSignal: DirectorSignal,
        private localSignal: LocalSignal,
        private asignacionRepository: AsignacionRepository,
        private alertService: AlertService
    ) {}

  ngOnInit(): void {
    this.obtener( 31 );
  }

  obtener( idSemestre: number ) {
    this.asignacionRepository.obtener( idSemestre ).subscribe({
      next: ( programasAsignados ) => {
        console.log(programasAsignados);
        const facultad = {
          id: programasAsignados[0].idFacultad,
          definicion: '',
          nombre: programasAsignados[0].nombreFacultad,
          usuarioId: 0
        }

        // const 
        this.facultadSignal.facultadSelect.set( facultad )
      }, error: (error) => {
        console.log(error);
        this.alertService.showAlert('Ocurrió un error', 'error');
      }
    })
  }

}
