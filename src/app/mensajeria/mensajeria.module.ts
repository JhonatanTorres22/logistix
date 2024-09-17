import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MensajeriaRoutingModule } from './mensajeria-routing.module';
import { interceptorProviders } from '../core/interceptors/interceptor';
import { MensajeriaRepository } from './domain/repositories/mensajeria.repository';
import { MensajeriaRepositoryImpl } from './infraestructure/repositories/mensajeria.repository.impl';
import { UsuarioRolRepository } from '../usuarios/domain/repositories/usuario-rol.repository';
import { UsuarioRolRepositoryImp } from '../usuarios/infraestructure/repositories/usuario-rol.repository.impl';
import { AsignacionRepository } from '../programas-academicos/domain/repositories/asignacion.repository';
import { AsignacionRepositoryImpl } from '../programas-academicos/infraestructure/repositories/asignacion.repository.impl';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MensajeriaRoutingModule
  ],
  providers: [
    interceptorProviders, [
      
    ]
  ]
})
export class MensajeriaModule { }
