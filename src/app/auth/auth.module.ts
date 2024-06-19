import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthRoutingModule } from "./auth-routing.module";
import { CommonModule } from "@angular/common";
import { interceptorProviders } from "../core/interceptors/interceptor";
import { AuthRepository } from "./domain/repositories/auth.repository";
import { AuthRepositoryImp } from "./infraestructure/repositories/auth.repository.impl";

@NgModule({
    imports: [ CommonModule, AuthRoutingModule ],
    exports: [ ],
    providers: [
        interceptorProviders, {provide: AuthRepository, useClass: AuthRepositoryImp}
      ]
})

export class AuthModule {}