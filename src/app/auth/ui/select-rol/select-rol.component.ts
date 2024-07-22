import { CommonModule } from '@angular/common';
import { Component, Input, effect } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Rol } from '../../domain/models/auth.model';
import { RolDTO } from '../../infraestructure/dto/auth.dto';
import { Router } from '@angular/router';
import { AuthService } from '../../infraestructure/services/auth.service';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { ListarInfoDirectorRepository } from '../../domain/repositories/listarInfoDirector.repository';
import { AuthSignal } from '../../domain/signals/auth.signal';
import { InfoDirectorSignal } from '../../domain/signals/infoDirector.signal';

@Component({
  selector: 'select-rol',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './select-rol.component.html',
  styleUrl: './select-rol.component.scss'
})
export class SelectRolComponent {

  @Input() roles: RolDTO[] = [];
  @Input() token: string = '';

  currentRol = this.auth.currentRol;
  imgRol: string = '';
  isSpinnerVisible: boolean = true;
  

  constructor(
    private infoDirectorSignal:InfoDirectorSignal,
    private auth: AuthSignal,
    private repository: ListarInfoDirectorRepository,
    private router: Router,
    private authService: AuthService,
    private mensajeria: MensajeriaSignal
  ) {
    effect( () => {
      'c'
    })
  }
  // getImgRol = ( rol: string ) => {
  //   switch( rol ) {
  //     case 'Administrador': this.imgRol = ''
  //   }
  // }

  infoDirector = this.infoDirectorSignal.infoDirector;
  selectRol( rol: RolDTO) {
    // console.log( rol );

    this.authService.selectedRol( [rol], this.token);
    this.mensajeria.setMensajeriaDataAsignacionDefault();
    // localStorage.setItem('current')
    localStorage.setItem('mensajeriaData', JSON.stringify(this.mensajeria.mensajeriaAsignacionDefault));

    this.router.navigate(['/dashboard']);
    console.log(rol.Nombre,'****');
    const rolSeleccionado = rol.Nombre.substring(0,3)
    
    if(rolSeleccionado === 'Dir'){
      this.repository.obtener(parseInt( this.auth.currentRol().id )).subscribe({
        next: (infoDirector) => {
          this.infoDirector.set(infoDirector)
          localStorage.setItem('infoDirector', JSON.stringify(infoDirector))
          console.log(infoDirector,'infodirector....');
        }
      })
    }
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setTimeout(() => {
      this.isSpinnerVisible = false;
    }, 800);
  }

}
