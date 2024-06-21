import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipListboxChange } from '@angular/material/chips';
import { DateAdapter, MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataModal, DataModalGeneric } from 'src/app/demo/interfaces/data-modal.interface';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { TipoDocumento, Usuario } from 'src/app/usuarios/domain/models/usuario.model';
import { UsuarioService } from 'src/app/usuarios/infraestructure/services/usuario.service';
import { UsuariosDomainService } from '../../domain/services/usuarios-domain.service';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UsuariosDomainValidacionesService } from '../../domain/services/usuarios-domain-validaciones.service';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';

export interface Sexo {
  name: string;
  color: ThemePalette;
  value: string;
}

@Component({
  selector: 'user-add',
  standalone: true,
  imports: [CommonModule, SharedModule, UiInputComponent],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss',

})
export class UserAddComponent {

  formUserAdd: FormGroup;
  @Input() usuarioToEdit: Usuario;
  @Input() component: string = '';
  @Output() cerrarFormulario: EventEmitter<string> = new EventEmitter();
  
  usuarioExistente: Usuario;

  maxLengthNumeroDocumento: WritableSignal<number>;
  minLengthNumeroDocumento: WritableSignal<number>;

  maxLengthApellidos: number;
  minLengthApellidos: number;

  maxLengthNombres: number;
  minLengthNombres: number;

  maxLengthCorreo: number;
  maxLengthCelular:number;
  expRegCelular: RegExp ;

  hayUsuarioExistente: boolean;

  expRegBlockNumeroAndEspacio: string;

  sexoList: Sexo[] = [
    {name: 'M', color: 'primary', value: 'M'},
    {name: 'F', color: 'warn', value: 'F'},
  ];

  sexoSelected: Sexo;
  constructor( 
    public dialogRef: MatDialogRef<UserAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private usuarioRepository: UsuarioRepository,
    private usuarioDomainValidacionService: UsuariosDomainValidacionesService, 
    private usuarioDomainService: UsuariosDomainService,
    private alertService: AlertService
  ) {

    

    // this.hayUsuarioExistente = this.usuarioToEdit.id != 0 ? true;
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.maxLengthNumeroDocumento = this.usuarioDomainValidacionService.getMaxLength;
    this.minLengthNumeroDocumento = this.usuarioDomainValidacionService.getMinLength;
    this.maxLengthApellidos = this.usuarioDomainValidacionService.maxLengthApellidos;
    this.minLengthApellidos = this.usuarioDomainValidacionService.minLengthApellidos;

    this.maxLengthNombres = this.usuarioDomainValidacionService.maxLengthNombres;
    this.minLengthNombres = this.usuarioDomainValidacionService.minLengthNombres;

    this.maxLengthCorreo = this.usuarioDomainValidacionService.maxLengthCorreo;

    this.maxLengthCelular = this.usuarioDomainValidacionService.maxLengthCelular;
    this.expRegCelular = usuarioDomainValidacionService.EXP_REG_CELULAR

    this.expRegBlockNumeroAndEspacio = usuarioDomainValidacionService.EXP_REG_SIN_NUMERO

     this.formUserAdd = new FormGroup ({
      tipoDocumento       : new FormControl ('', [ Validators.required ]),
      numeroDocumento     : new FormControl ('', [ Validators.required, this.usuarioDomainValidacionService.numeroDocumentoIsValid.bind(this) ]),
      apellidoPaterno     : new FormControl ('', [ Validators.required, Validators.maxLength(this.maxLengthApellidos), Validators.minLength(this.minLengthApellidos), Validators.pattern(this.expRegBlockNumeroAndEspacio)]),
      apellidoMaterno     : new FormControl ('', [ Validators.required, Validators.maxLength(this.maxLengthApellidos), Validators.minLength(this.minLengthApellidos), Validators.pattern(this.expRegBlockNumeroAndEspacio)]),
      nombres             : new FormControl ('', [ Validators.required, Validators.maxLength(this.maxLengthNombres), Validators.minLength(this.minLengthNombres), Validators.pattern(this.expRegBlockNumeroAndEspacio)]),
      sexo                : new FormControl ('', [ Validators.required ]),
      correoInstitucional : new FormControl ('', [ Validators.required, Validators.pattern(this.usuarioDomainValidacionService.EXP_REG_CORREO), Validators.maxLength(this.maxLengthCorreo)]),
      correoPersonal      : new FormControl ('', [ Validators.required, Validators.pattern(this.usuarioDomainValidacionService.EXP_REG_CORREO), Validators.maxLength(this.maxLengthCorreo)]),
      celular             : new FormControl('', [ Validators.required, Validators.pattern(this.expRegCelular), Validators.maxLength(this.maxLengthCelular)]),
      fechaNacimiento     : new FormControl (new Date(''), [ Validators.required]),
      imagenPerfil        : new FormControl(''),
    });

    this.usuarioToEdit = {
      id: 0,
      apellidoPaterno: '',
      apellidoMaterno: '',
      nombres: '',
      sexo: '',
      celular: 0,
      correoInstitucional: '',
      correoPersonal: '',
      fechaNacimiento: '',
      imagenPerfil: '',
      numeroDocumento: '',
      tipoDocumento: 'DNI',
      usuario: 0
    };

    this.usuarioToEdit = this.data;

    console.log(this.usuarioToEdit);
    
  }

  ngOnInit() {
    this.usuarioToEdit && this.usuarioToEdit?.id != 0 ? this.pathValueFormUserAdd() : ''

    if( !this.data ) {
      this.usuarioToEdit = {
        id: 0,
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombres: '',
        sexo: '',
        celular: 0,
        correoInstitucional: '',
        correoPersonal: '',
        fechaNacimiento: '',
        imagenPerfil: '',
        numeroDocumento: '',
        tipoDocumento: 'DNI',
        usuario: 0
      };

      this.hayUsuarioExistente = this.usuarioToEdit.id == 0;
    } 

    console.log(this.usuarioToEdit);
    
    this.usuarioToEdit && this.usuarioToEdit?.id != 0 ? this.pathValueFormUserAdd() : ''
  }

  pathValueFormUserAdd = () => {
    console.log(this.usuarioToEdit);
    this.usuarioToEdit.sexo = this.usuarioToEdit.sexo.substring(0,1);
    this.formUserAdd.patchValue({
      apellidoPaterno: this.usuarioToEdit.apellidoPaterno.trim(),
      apellidoMaterno: this.usuarioToEdit.apellidoMaterno.trim(),
      tipoDocumento: this.usuarioToEdit.tipoDocumento,
      numeroDocumento: this.usuarioToEdit.numeroDocumento,
      nombres: this.usuarioToEdit.nombres.trim(),
      sexo: this.usuarioToEdit.sexo,
      correoInstitucional: this.usuarioToEdit.correoInstitucional,
      correoPersonal: this.usuarioToEdit.correoPersonal,
      celular: this.usuarioToEdit.celular,
      fechaNacimiento: this.usuarioToEdit.fechaNacimiento,

    })
   
      this.usuarioDomainValidacionService.setTipoDocumento = this.usuarioToEdit.tipoDocumento;
   
    // this.maxLengthNumeroDocumento = this.usuarioDomainValidacionService.getMaxLength;
  }

  onSubmit = () => {
    console.log(this.formUserAdd.value);
    
    if( this.formUserAdd.invalid ) {
      this.alertService.showAlert('El formulario está incompleto o contiene errores', 'error');
      return
    }
    const tipoAccionForm = this.usuarioToEdit.id != 0 ? 'Editar' : 'Crear';
    this.alertService.sweetAlert('question', 'Confirmar', `¿Está seguro que desea ${tipoAccionForm.toUpperCase()} el usuario?`)
      .then( result => {
        console.log(result);
        if( !result ) {
          return
        }

        switch( tipoAccionForm ) {
          case 'Crear': {
            const newUsuer = {
              ...this.formUserAdd.value,
              usuario: 1
            }
           
            this.userAdd(newUsuer);
          }; break;

          case 'Editar': {
            const editUser = {
              ...this.formUserAdd.value,
              id: this.usuarioToEdit.id,
              usuario: 1
            }

            this.userEdit( editUser );
          }; break;
        }
        

      });

  }

  userAdd = ( newUser: Usuario) => {


    this.usuarioRepository.agregarUsuario( newUser ).subscribe({
      next: ( data ) => {
        console.log(data);
        this.alertService.sweetAlert('success', 'Correcto', 'Usuario creado correctamente');
        this.usuarioDomainService.agregarUsuario( newUser );
        this.component == 'decano-list' || this.component == 'director-list' ? this.cerrarFormulario.emit( 'Add' ) : this.dialogRef.close( data );
      }, error: (error) => {
        console.log(error);
        this.alertService.sweetAlert('error', 'Error', error)
        
      }
    })
  }
  
  
  userEdit = ( userEdit: Usuario ) => {
    this.usuarioRepository.editarUsuario( userEdit ).subscribe({
      next: (data) =>{
        console.log(data);
        this.alertService.sweetAlert('success', 'Correcto', 'Usuario editado correctamente');
        this.component == 'decano-list' || this.component == 'director-list' ? this.cerrarFormulario.emit( 'Edit' ) : this.dialogRef.close( data );
      }, error: (error) => {
        console.log(error);
        this.alertService.sweetAlert('error', 'Error', error)
      }
    })
  }

  onChangeTipoDocumento = ( nuevoTipoDocumentoSeleccionado: TipoDocumento ) => {
    // console.log(event);
    this.usuarioDomainValidacionService.setTipoDocumento = nuevoTipoDocumentoSeleccionado;
    this.maxLengthNumeroDocumento = this.usuarioDomainValidacionService.getMaxLength;
  }

  onNewSexoSelected = ( event: MatChipListboxChange ) => {
    console.log(event);
    this.formUserAdd.value.sexo = event.value
    
  }

  validarSoloNumeros = ( event: any) => {
   
    return new Promise<boolean>( (resolve, reject) => {
      
    if(this.formUserAdd.value.tipoDocumento == '' ) { 
      resolve(true);
      return;
    }
    let key;
    // console.log(event);
    
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
      // console.log(key);
      // key.replace()

    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }

    const regex = this.usuarioDomainValidacionService.EXP_REG_SOLO_NUMEROS;
     if (!regex.test(key)) {
       event.returnValue = false;
       if (event.preventDefault) {
         //  resolve ( true )
         event.preventDefault();
        }
      } else {

        resolve( true )
      }
      
    })

    
  }
  
  buscarNumeroDocumento = ( event: any) => {
    this.validarSoloNumeros(event).then( result => {
    
      setTimeout(() => {
        console.log(this.formUserAdd.value.numeroDocumento.length);
    
        if( this.formUserAdd.value.numeroDocumento.length < this.minLengthNumeroDocumento ) {
          this.hayUsuarioExistente = true
          return;
        };
        this.usuarioRepository.buscarNumeroDocumento( this.formUserAdd.value.numeroDocumento ).subscribe({
          next: ( data ) => {
            console.log(data);

            if(this.usuarioToEdit?.numeroDocumento == data.numeroDocumento) return;

            this.hayUsuarioExistente = true;
            this.usuarioExistente = data;
            this.usuarioDomainValidacionService.setUsuarioExistente = data;
            this.usuarioDomainValidacionService.dniExistente(this.formUserAdd.value.numeroDocumento)
            // this.alertService.sweetAlert('question', `${data.apellidoPaterno} ${data.apellidoMaterno} ${data.nombres}`, 'Usuario encontrado, ¿Desea actualizar los datos?')
            // .then( result => {
            //   if( !result ) {
            //     this.formUserAdd.reset();
            //     return;
            //   }
            //     this.usuarioToEdit = data;
            //     this.pathValueFormUserAdd();
            //   })
          }, error: ( error ) => {
            console.log(error);
            this.hayUsuarioExistente = false;
          }
        })
      }, 400);
    });
  }

  openModalDetalleUsuario = () => {
    this.dialog.open( UserDetailsComponent, {
      width: '800px',
      height: '600px',
      disableClose: true,
      data: {usuario: this.usuarioExistente, component: 'user-existente'}
    })
  }

  isReadonly = (campo: string): boolean => {

    switch( campo ) {

      case 'case0' : {
        return this.usuarioToEdit.id != 0 || this.formUserAdd.value.tipoDocumento == ''
      };

      case 'case1' : {
        return this.usuarioToEdit.id == 0 && (this.hayUsuarioExistente || this.formUserAdd.value.numeroDocumento.length < this.minLengthNumeroDocumento)
      };

      case 'case2': {
        return this.usuarioToEdit.id == 0 && (this.hayUsuarioExistente || this.formUserAdd.value.numeroDocumento.length < this.minLengthNumeroDocumento)
      }
      
      case 'case3': {
        return this.usuarioToEdit.id == 0 && (!this.hayUsuarioExistente && this.formUserAdd.value.numeroDocumento.length >= this.minLengthNumeroDocumento)
      }

      case 'case4': {
        return this.usuarioToEdit.id == 0 && (this.hayUsuarioExistente || this.formUserAdd.value.numeroDocumento.length < this.minLengthNumeroDocumento)
      }

      case 'case5' : {
        return this.usuarioToEdit.id != 0
      };

      case 'case6' : {
        return this.usuarioToEdit.id != 0 ? ( this.formUserAdd.invalid || this.hayUsuarioExistente) : this.usuarioToEdit.id != 0 || ( this.formUserAdd.invalid || this.hayUsuarioExistente)
      }

      default: return false;
    }
  } 
}
