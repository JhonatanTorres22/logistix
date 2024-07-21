import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanDeEstudiosRoutingModule } from './plan-de-estudios-routing.module';
import { interceptorProviders } from '../core/interceptors/interceptor';
import { CicloRepository } from './domain/repositories/ciclo.repository';
import { CicloRepositoryImpl } from './infraestructure/repositories/ciclo.repository.impl';
import { CursoRepository } from './domain/repositories/curso.repository';
import { CursoRepositoryImpl } from './infraestructure/repositories/curso.repository.impl';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PlanDeEstudiosRoutingModule
  ],
  // providers: [
  //   interceptorProviders, 
  //       [
  //           { provide: CicloRepository, useClass: CicloRepositoryImpl },
  //           { provide: CursoRepository, useClass: CursoRepositoryImpl },

  //       ]
  // ]
})
export class PlanDeEstudiosModule { }
