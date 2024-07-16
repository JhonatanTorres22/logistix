import { CommonModule } from "@angular/common";
import { Component, OnInit, WritableSignal, effect } from "@angular/core";
import { SharedModule } from "src/app/demo/shared/shared.module";
import { SemestreAcademicoRepository } from "../domain/repositories/semestre-academico.repository";
import { SemestreAcademicoPageComponent } from "./semestre-academico-page/semestre-academico-page.component";
import { SemestreAcademico } from "../domain/models/semestre-academico.model";
import { FacultadPageComponent } from "./facultades-page/facultad-page.component";
import { MatDialog } from "@angular/material/dialog";
import { SemestreAddComponent } from "./semestre-academico-page/semestre-add/semestre-add.component";
import { FormBuilder, Validators } from "@angular/forms";
import { SemestreListComponent } from "./semestre-academico-page/semestre-list/semestre-list.component";
import { UiButtonComponent } from "src/app/core/components/ui-button/ui-button.component";
import { SemestreSignal } from "../domain/signals/semestre.signal";
import { FacultadListComponent } from "./facultades-page/facultad-list/facultad-list.component";
import { Facultad } from "../domain/models/facultad.model";
import { FacultadSignal } from "../domain/signals/facultad.signal";
import { ProgramaAcademicoPageComponent } from "./programa-academico-page/programa-page.component";
import { LocalPageComponent } from "./local-page/local-page.component";
import { DecanoPageComponent } from "./decano-page/decano-page.component";
import { DirectorPageComponent } from "./director-page/director-page.component";
import { Programa, ProgramaFacultad } from "../domain/models/programa.model";
import { ProgramaSignal } from "../domain/signals/programa.signal";
import { DecanoSignal } from "../domain/signals/decano.signal";
import { DirectorSignal } from "../domain/signals/director.signal";
import { UsuarioRol } from "src/app/usuarios/domain/models/usuario-rol.model";
import { LocalSignal } from "../domain/signals/local.signal";
import { Local } from "../domain/models/local.model";
import { AsignacionPageComponent } from "./asignacion-page/asignacion-page.component";
import { AsignacionSignal } from "../domain/signals/asignacion.signal";
import { AlertService } from "src/app/demo/services/alert.service";
import { AsignarNuevoPrograma } from "../domain/models/asignacion.model";
import { AsignacionRepository } from "../domain/repositories/asignacion.repository";
import { AuthSignal } from "src/app/auth/domain/signals/auth.signal";


@Component({
    selector: 'programas-academicos',
    templateUrl: './programas-academicos-page.component.html',
    styleUrl: './programas-academicos-page.component.scss',
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
        UiButtonComponent]
})

export class ProgramasAcademicosComponent implements OnInit {
    

    asignaciones = this.asignacionSignal.asignaciones;
    // semestreAcademico: SemestreAcademico;
    
    semestresAcademicos = this.semestreSignal.semestresAcademicos;
    semestreAcademicoAperturado = this.semestreSignal.semestreAcademicoAperturado;
    existeSemestreCreado: boolean;

    semestreSelect: WritableSignal<SemestreAcademico> = this.semestreSignal.semestreSelect;
    facultadSelect: WritableSignal<Facultad> = this.facultadSignal.facultadSelect;
    idFacultadYaAsignada = this.facultadSignal.idFacultadYaAsignada;
    programaSelect: WritableSignal<ProgramaFacultad> = this.programaSignal.programaSelect;
    decanoSelect: WritableSignal<UsuarioRol> = this.decanoSignal.decanoSelect;
    directorSelect: WritableSignal<UsuarioRol> = this. directorSignal.directorSelect;
    localSelect: WritableSignal<Local> = this.localSignal.localSelect;
    localesSelect: WritableSignal<Local[]> = this.localSignal.localesSelect;
    // decanoSelect: 
    constructor( 
        
        private dialog: MatDialog,
        private programaSignal: ProgramaSignal,
        private semestreSignal: SemestreSignal,
        private facultadSignal: FacultadSignal,
        private decanoSignal: DecanoSignal,
        private directorSignal: DirectorSignal,
        private asignacionSignal: AsignacionSignal,
        private localSignal: LocalSignal,
        private alertService: AlertService,
        private auth: AuthSignal,
        private asignacionRepository: AsignacionRepository
    ) {
      effect(() => {
        console.log(`New semestre selected program: ${this.semestreSelect()}`);
        localStorage.setItem('currentSemestre', JSON.stringify( this.semestreSelect() ));
        this.obtener( this.semestreSelect().id );
      }, );
    }

    ngOnInit(): void {

    }

    obtener = ( idSemestre: number ) => {
        this.asignacionRepository.obtener( idSemestre ).subscribe({
          next: ( programasAsignados ) => {
            // console.log(programasAsignados);
            this.localSignal.setSelectLocales( [] );
            this.facultadSignal.setIdFacultad( 0 );
            this.asignacionSignal.setAsignaciones( programasAsignados );
          }, error: (error) => {
            console.log(error);
            this.alertService.showAlert('Ocurrió un error', 'error');
          }
        })
      }

    agregarProgramaConfirm = () => {
        if ( 
            !(this.semestreSelect().id != 0 &&
            this.facultadSelect().id != 0 &&
            this.programaSelect().id != 0 &&
            this.decanoSelect().id != 0 &&
            this.directorSelect().id != 0
            && this.localesSelect().length > 0)
        ) {
            this.alertService.showAlert('Verifique que exista DECANO, DIRECTOR DE ESCUELA Y LOCALES', 'info')
            return
        } 
            
        this.alertService.sweetAlert('question', 'Confirmación', '¿Está seguro que desea GUARDAR el programa?')
          .then( isConfirm => {
            if( !isConfirm ) return;

            this.agregarPrograma();
          })
      }
    
      agregarPrograma = () => {
        const localesId = this.localesSelect().map( local => {
            return local.id
        });

        console.log( localesId );
        
        const newPrograma: AsignarNuevoPrograma = {
          idDecano: this.decanoSelect().id,
          idDirector: this.directorSelect().id,
          idLocales: localesId,
          idPrograma: this.programaSelect().id,
          idSemestre: this.semestreSelect().id,
          usuarioId: parseInt( this.auth.currentRol().id )
        }

        console.log(newPrograma);
        
    
        this.asignacionRepository.insertar( newPrograma ).subscribe({
          next: (data) => {
            console.log(data);
            this.alertService.sweetAlert('success', 'Correcto', 'Programas agregados correctamente');
            this.programaSignal.setSelectProgramaDefault();
            this.localSignal.setSelectLocalesDefault();
            this.directorSignal.setSelectDirectorDefault();
            this.decanoSignal.setSelectDecanoDefault();
            this.facultadSignal.setSelectFacultadDefault();
            this.obtener( this.semestreSelect().id );

          }, error: (error) => {
            console.log(error);
            this.alertService.showAlert('Ocurrió un error', 'error');
    
          }
        });
      }

}