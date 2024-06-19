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
import { ProgramaAcademicoSignal } from "../domain/signals/programa-academico.signal";
import { FacultadListComponent } from "./facultades-page/facultad-list/facultad-list.component";
import { Facultad } from "../domain/models/facultad.model";
import { FacultadSignal } from "../domain/signals/facultad.signal";
import { ProgramaAcademicoPageComponent } from "./programa-academico-page/programa-page.component";
import { LocalPageComponent } from "./local-page/local-page.component";
import { DecanoPageComponent } from "./decano-page/decano-page.component";
import { DirectorPageComponent } from "./director-page/director-page.component";


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
        UiButtonComponent]
})

export class ProgramasAcademicosComponent implements OnInit {
    


    // semestreAcademico: SemestreAcademico;
    
    semestresAcademicos = this.semestreAcademicoDomainService.semestresAcademicos;
    semestreAcademicoAperturado = this.semestreAcademicoDomainService.semestreAcademicoAperturado;
    existeSemestreCreado: boolean;

    semestreSelect: WritableSignal<SemestreAcademico> = this.programaSignal.semestreSelect;
    facultadSelect: WritableSignal<Facultad> = this.facultadSignal.facultadSelect;

    constructor( 
        
        private dialog: MatDialog,
        private semestreAcademicoDomainService: SemestreAcademicoDomainService,
        private programaSignal: ProgramaAcademicoSignal,
        private facultadSignal: FacultadSignal,

    ) {}

    ngOnInit(): void {

    }

}