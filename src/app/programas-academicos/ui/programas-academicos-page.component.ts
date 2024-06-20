import { CommonModule } from "@angular/common";
import { Component, OnInit, WritableSignal } from "@angular/core";
import { SharedModule } from "src/app/demo/shared/shared.module";
import { SemestreAcademicoRepository } from "../domain/repositories/semestre-academico.repository";
import { SemestreAcademicoPageComponent } from "./semestre-academico-page/semestre-academico-page.component";
import { SemestreAcademico } from "../domain/models/semestre-academico.model";
import { FacultadPageComponent } from "./facultades-page/facultad-page.component";
import { MatDialog } from "@angular/material/dialog";
import { SemestreAddComponent } from "./semestre-academico-page/semestre-add/semestre-add.component";
import { SemestreAcademicoDomainService } from "../domain/services/semestre-academico-domain.service";
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
    


    // semestreAcademico: SemestreAcademico;
    
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
        private localSignal: LocalSignal
    ) {}

    ngOnInit(): void {

    }

}