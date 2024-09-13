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
import { SubCategoriaRepository } from 'src/app/panel-de-control/domain/repositories/subCategoria.repository';
import { SubCategoriaSignal } from 'src/app/panel-de-control/domain/signals/subCategoria.signal';
import { SubCategoriaMapper } from 'src/app/panel-de-control/domain/mappers/subCategoria.mapper';
import { QuillEditorComponent } from 'ngx-quill';
import { ObservacionInsert } from 'src/app/panel-de-control/domain/models/obserbacion.model';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { ObservacionRepository } from 'src/app/panel-de-control/domain/repositories/observacion.repository';
import { UiModalService } from 'src/app/core/components/ui-modal/ui-modal.service';
import { UiAlertComponent } from "../../../core/components/ui-alert/ui-alert.component";

@Component({
  selector: 'mensajeria-observar',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    QuillEditorComponent,
    UiButtonComponent,
    UiSelectComponent,
    UiAlertComponent
],
  templateUrl: './mensajeria-observar.component.html',
  styleUrl: './mensajeria-observar.component.scss'
})
export class MensajeriaObservarComponent implements OnInit {

  categorias = this.signal.categorias;
  categoriaSelectedOptions = this.signal.categoriaSelectedOptions;
  subCategoriaSelectedOptions = this.subCategoriaSignal.subCategoriaSelectedOptions;
  selectMensaje = this.mensajeriaSignal.selectMensaje;
  mensajesRecibidos = this.mensajeriaSignal.mensajesRecibidos;
  currentRol = this.authSignal.currentRol;
  formObservar: FormGroup;
  // categoria
  mensaje: string = '';
  options: UiSelect[] = [];
  subCategoriaId: number = 0;

  constructor(
    private fb: FormBuilder,
    private signal: CategoriaSignal,
    private mensajeriaSignal: MensajeriaSignal,
    private alert: AlertService,
    private authSignal: AuthSignal,
    private subCategoriaSignal: SubCategoriaSignal,
    private repository: CategoriaRepository,
    private observacionRepository: ObservacionRepository,
    private subCategoriaRepository: SubCategoriaRepository,
    private modal: UiModalService,
  ) {
    this.formObservar = this.fb.group({
      categoria: new FormControl('', [ Validators.required]),
      subCategoria: new FormControl('', [ Validators.required, Validators.min(1)]),
      // mensaje: new FormControl('', [ Validators.required]),
    })
  }
  ngOnInit(): void {
    this.obtenerCategorias()
  }

  seleccionarSubCategoria = ( categoria: UiSelect ) => {
    console.log( categoria );
    this.subCategoriaRepository.listar( parseInt( categoria.value ) ).subscribe({
      next: ( subCategorias ) => {
        console.log( subCategorias );
        this.alert.showAlert('Listando las sub categorias', 'success', 4);
        const options = subCategorias.map( SubCategoriaMapper.fromDomainToDomainSelect );
        this.subCategoriaSelectedOptions.set( options )
        if( subCategorias.length == 0 ) {
          this.alert.sweetAlert('info', 'IMPORTANTE', 'La categoría seleccionada no tiene una subcategoría asignada. Por favor, comuníquese con el área de control interno para que agregue una subcategoría adecuada que satisfaga la observación que deseas agregar.')
        }
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener las sub categorias', 'error', 4);
      }
    })
    
  }

  obtenerCategorias = () => {
    this.repository.listarCategoria().subscribe({
      next: ( categorias ) => {
        console.log( categorias );
        this.categorias.set( categorias );
        const options = categorias.map( CategoriaMapper.fromDomainToDomainSelect );
        this.categoriaSelectedOptions.set( options )
        this.alert.showAlert('Listando categorías...', 'success', 5);
        
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener las categorías', 'error', 5);
      }
    })
  }

  subCategoriaSelected = ( idSubCategoria: number ) => {
    this.subCategoriaId = idSubCategoria;
  }

  submit = () => {

    this.alert.sweetAlert('question', 'Confirmación', '¿Está seguro que desea Observar este mensaje?')
      .then( isConfirm => {
        if( !isConfirm ) return
        const observacion: ObservacionInsert = {
          mensajeId: this.selectMensaje().idMensaje,
          subCategoriaId: parseInt( this.subCategoriaId.toString() ),
          mensaje: this.mensaje,
          userId: parseInt( this.currentRol().id )
        }
        console.log( observacion );
        this.enviar( observacion )
      })

    
  }

  enviar = ( observacion: ObservacionInsert ) => {
    this.observacionRepository.insertar( observacion ).subscribe({
      next: ( response ) => {
        console.log( response );
        this.alert.showAlert('Observación enviada con éxito', 'success', 6);
        this.modal.getRefModal().close('Observado')
        // this.mensajeriaSignal.renderizarMensajes('')
        
        this.actualizarCampoObservado()
        
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al enviar la observación', 'error', 6);
      }
    })
  }

  actualizarCampoObservado = () => {
    this.selectMensaje.update( mensaje => {
      this.mensajesRecibidos.update( mensajes => {
        const msj = mensajes.map( men => {
          if( men.idMensaje == mensaje.idMensaje ) {
            return {
              ...men,
              mensajeObservado: true

            }
          }
          return { ...men }
        } );

        return msj;
      });
      
      return {
        ...mensaje,
        mensajeObservado: true
      }
    } );
  }

}
