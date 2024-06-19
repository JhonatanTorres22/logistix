import { NgModule } from "@angular/core";
import { SemestreAcademicoRoutingModule } from "./semestre-academico-routing.module";
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../demo/shared/shared.module';


@NgModule({
    imports: [CommonModule, SharedModule, SemestreAcademicoRoutingModule],
    exports: []
})

export class SemestreAcademicoModule {}