import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, effect } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AsignacionRepository } from '../../domain/repositories/asignacion.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioRol, UsuarioRolAlta } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { Facultad } from '../../domain/models/facultad.model';
import { Local } from '../../domain/models/local.model';
import { ProgramaFacultad } from '../../domain/models/programa.model';
import { SemestreAcademico } from '../../domain/models/semestre-academico.model';
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
import { AsignacionSignal } from '../../domain/signals/asignacion.signal';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { Asignacion, AsignacionEliminar, AsignacionLocal, AsignacionPrograma, AsignarNuevoPrograma } from '../../domain/models/asignacion.model';
import { LocalListComponent } from '../local-page/local-list/local-list.component';
import { ThisReceiver } from '@angular/compiler';

import { ProgramasAcademicosComponent } from '../programas-academicos-page.component';

import { UiButtonIconComponent } from 'src/app/core/components/ui-button-icon/ui-button-icon.component';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { MensajeriaDataAsignacion, MensajeriaInsertar } from 'src/app/mensajeria/domain/models/mensajeria.model';
import { RolUserId } from 'src/app/core/mappers/rolUserId';
import { Router } from '@angular/router';
import { UsuarioRolRepository } from 'src/app/usuarios/domain/repositories/usuario-rol.repository';
import { ProgramaCardComponent } from '../programa-academico-page/programa-card/programa-card.component';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';


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
    LocalListComponent,
    UiButtonComponent,
    ProgramaCardComponent,

    UiButtonIconComponent

  ],
  templateUrl: './asignacion-page.component.html',
  styleUrl: './asignacion-page.component.scss'
})
export class AsignacionPageComponent {


    semestresAcademicos = this.semestreSignal.semestresAcademicos;
    semestreAcademicoAperturado = this.semestreSignal.semestreAcademicoAperturado;
    existeSemestreCreado: boolean;

    asignaciones = this.signal.asignaciones;

    semestreSelect: WritableSignal<SemestreAcademico> = this.semestreSignal.semestreSelect;
    facultadSelect: WritableSignal<Facultad> = this.facultadSignal.facultadSelect;
    idFacultadYaAsignada = this.facultadSignal.idFacultadYaAsignada;
    programaSelect: WritableSignal<ProgramaFacultad> = this.programaSignal.programaSelect;
    decanoSelect: WritableSignal<UsuarioRol> = this.decanoSignal.decanoSelect;
    directorSelect: WritableSignal<UsuarioRol> = this. directorSignal.directorSelect;
    localSelect: WritableSignal<Local> = this.localSignal.localSelect;
    localesSelect: WritableSignal<Local[]> = this.localSignal.localesSelect;
    renderizarAsignaciones = this.signal.renderizarAsignaciones;
    // decanoSelect: 
    constructor( 
        
        private dialog: MatDialog,
        private programaSignal: ProgramaSignal,
        private semestreSignal: SemestreSignal,
        private facultadSignal: FacultadSignal,
        private decanoSignal: DecanoSignal,
        private directorSignal: DirectorSignal,
        private localSignal: LocalSignal,
        private signal: AsignacionSignal,
        private asignacionRepository: AsignacionRepository,
        private alertService: AlertService,
        private mensajeriaSignal: MensajeriaSignal,
        private auth: AuthSignal,
        private router: Router,
        
    ) {
      effect(() => {
        // console.log(`New semestre selected: ${this.semestreSelect()}`);
        switch( this.renderizarAsignaciones() ) {
          case 'Obtener' : {
            console.log('Listando....');
            this.obtener( this.semestreSelect().id );
            this.renderizarAsignaciones.set('')
          }; break;
        }
      }, { allowSignalWrites: true });
    }



  obtener = ( idSemestre: number ) => {
    this.asignacionRepository.obtener( idSemestre ).subscribe({
      next: ( programasAsignados ) => {
        console.log(programasAsignados);
        this.localSignal.setSelectLocales( [] );
        this.facultadSignal.setIdFacultad( 0 );
        this.signal.setAsignaciones( programasAsignados );
      }, error: (error) => {
        console.log(error);
        this.alertService.showAlert('Ocurrió un error', 'error');
      }
    })
  }


  openModalDecanos = () => {

  }


  openModalFacultad = () => {
    console.log('abrir modal facultad list');
    const dialogRef = this.dialog.open( FacultadListComponent, {
      width: '800px',
      // height: '460px',
      disableClose: true,
    } );

    dialogRef.afterClosed().subscribe( data => {
      if( data == 'cancelar' ) return;

      // this.obtenerSemestres();
    })
  }

  openModalPrograma = () => {
    
  }

  openModalDirector = () => {

  }

  agregarProgramaConfirm = ( asignacion: Asignacion ) => {
    if ( 
      !(this.programaSelect().id != 0 &&
      this.directorSelect().id != 0 && 
      this.localesSelect().length > 0)
  ) {
      this.alertService.showAlert('Verifique que exista DECANO, DIRECTOR DE ESCUELA Y LOCALES', 'info')
      return} 
    this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea GUARDAR el programa?')
      .then( isConfirm => {
        if( !isConfirm ) return;

        const locales = this.localesSelect().map( local => local.id );

        const newPrograma: AsignarNuevoPrograma = {
          idDecano: asignacion.idDecano,
          idDirector: this.directorSelect().id,
          idLocales: locales,
          idPrograma: this.programaSelect().id,
          idSemestre: this.semestreSelect().id,
          usuarioId: parseInt( this.auth.currentRol().id )
        }
        // console.log(newPrograma);
        this.agregarPrograma( newPrograma );

      });
  }

  agregarPrograma = ( asignacion: AsignarNuevoPrograma ) => {

    this.asignacionRepository.insertar( asignacion ).subscribe({
      next: (data) => {
        console.log(data);
        this.alertService.sweetAlert('success', 'Correcto', 'Programas agregados correctamente');
        this.programaSignal.setSelectProgramaDefault();
        this.localSignal.setSelectLocalesDefault();
        this.directorSignal.setSelectDirectorDefault();

        this.obtener( this.semestreSelect().id );
      }, error: (error) => {
        console.log(error);
        this.alertService.showAlert('Ocurrió un error', 'error');

      }
    });
  }


}
