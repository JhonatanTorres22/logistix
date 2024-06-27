import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MensajeriaRoutingModule } from './mensajeria-routing.module';
import { interceptorProviders } from '../core/interceptors/interceptor';
import { MensajeriaRepository } from './domain/repositories/mensajeria.repository';
import { MensajeriaRepositoryImpl } from './infraestructure/repositories/mensajeria.repository.impl';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MensajeriaRoutingModule
  ],
  providers: [
    interceptorProviders, [
      { provide: MensajeriaRepository, useClass: MensajeriaRepositoryImpl}
    ]
  ]
})
export class MensajeriaModule { }
