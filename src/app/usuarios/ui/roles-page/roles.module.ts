import { NgModule } from "@angular/core";
import { RolesRoutingModule } from "./roles-routing.module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/demo/shared/shared.module";
import { interceptorProviders } from "src/app/core/interceptors/interceptor";
import { RolRepositoryImpl } from "src/app/roles/infraestucture/repositories/rol.repository.imp";
import { RolRepository } from "src/app/roles/domain/repositories/rol.repository";

@NgModule({
    imports: [ CommonModule, SharedModule, RolesRoutingModule ],
    exports: [],
    providers: [
        // interceptorProviders, [
        //   { provide: RolRepository, useClass: RolRepositoryImpl },

        // ]
    ]
})

export class RolesModule {

}