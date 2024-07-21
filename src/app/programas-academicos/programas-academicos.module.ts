import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../demo/shared/shared.module";
import { ProgramasAcademicosRoutingModule } from "./programas-academicos-routing.module";



@NgModule({
    imports: [ CommonModule, SharedModule, ProgramasAcademicosRoutingModule],
    
})

export class ProgramasAcademicosModule {}