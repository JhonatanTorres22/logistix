import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/demo/shared/shared.module";
import { FacultadRoutingModule } from "./facultad-routing.module";



@NgModule({
    imports: [ CommonModule, SharedModule, FacultadRoutingModule],
    exports: []
})

export class FacultadesModule {}