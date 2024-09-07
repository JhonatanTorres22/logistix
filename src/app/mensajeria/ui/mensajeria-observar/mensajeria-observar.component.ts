import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';

import { AlertService } from 'src/app/demo/services/alert.service';

import { ObservacionMapper } from '../../domain/mappers/observacion.mapper';
import { UiSelect } from 'src/app/core/components/ui-select/ui-select.interface';
import { UiSelectComponent } from 'src/app/core/components/ui-select/ui-select.component';
import { CategoriaSignal } from 'src/app/panel-de-control/domain/signals/categoria.signal';
import { CategoriaRepository } from 'src/app/panel-de-control/domain/repositories/categoria.repository';
import { CategoriaMapper } from 'src/app/panel-de-control/domain/mappers/categoria.mapper';

@Component({
  selector: 'mensajeria-observar',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiButtonComponent, UiSelectComponent ],
  templateUrl: './mensajeria-observar.component.html',
  styleUrl: './mensajeria-observar.component.scss'
})
export class MensajeriaObservarComponent implements OnInit {

  categorias = this.signal.categorias;
  formObservar: FormGroup;
  // categoria

  options: UiSelect[] = [];

  constructor(
    private fb: FormBuilder,
    private signal: CategoriaSignal,
    private alert: AlertService,
    private repository: CategoriaRepository
  ) {
    this.formObservar = this.fb.group({
      categoria: new FormControl('', [ Validators.required]),
      subCategoria: new FormControl('', [ Validators.required]),
      mensaje: new FormControl('', [ Validators.required]),
    })
  }
  ngOnInit(): void {
    this.obtenerCategorias()
  }

  seleccionarCategoria = ( categoria: string ) => {
    console.log( categoria );
    
  }

  obtenerCategorias = () => {
    this.repository.listarCategoria().subscribe({
      next: ( categorias ) => {
        console.log( categorias );
        this.categorias.set( categorias );
        this.options = categorias.map( CategoriaMapper.fromDomainToDomainSelect )
        this.alert.showAlert('Listando categorías...', 'success', 5);
        
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener las categorías', 'error', 5);
      }
    })
  }

}
