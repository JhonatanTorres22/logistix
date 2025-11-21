import { CommonModule } from '@angular/common';
import { Component, Input, effect } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { RolDTO } from '../../infraestructure/dto/auth.dto';
import { Router } from '@angular/router';
import { AuthService } from '../../infraestructure/services/auth.service';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { ListarInfoDirectorRepository } from '../../domain/repositories/listarInfoDirector.repository';
import { AuthSignal } from '../../domain/signals/auth.signal';
import { PlanEstudioSignal } from 'src/app/plan-de-estudios/domain/signal/plan-estudio.signal';
import { Modulo, Rol } from '../../domain/models/authenticar.model';
import { AuthenticarSignal } from '../../domain/signals/authenticar.signal';


@Component({
  selector: 'select-rol',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './select-rol.component.html',
  styleUrl: './select-rol.component.scss'
})
export class SelectRolComponent {
  currentRol = this.auth.currentRol;
  imgRol: string = '';
  isSpinnerVisible: boolean = true;
  step = this.authenticasrSignal.stepAuth
  rolSignal = this.authenticasrSignal.rol
  listaRol =this.authenticasrSignal.listarRol

  // listaRol = (): { modulos: Modulo[] } => ({
  //   modulos: [
  //     {
  //       nombre: 'SOFTWARE LOGÍSTICO',
  //       roles: [
  //         { nombre: 'Jefe Logístico' },
  //         { nombre: 'Verificador' }
  //       ]
  //     },
  //     {
  //       nombre: 'GIPEO',
  //       roles: [
  //         { nombre: 'Administrador' },
  //         { nombre: 'Controlador' }
  //       ]
  //     },

  //   ]
  // });

  constructor(
    private auth: AuthSignal,
    private authenticasrSignal: AuthenticarSignal,
    private repository: ListarInfoDirectorRepository,
    private planEstudioSignal: PlanEstudioSignal,
    private router: Router,
    private authService: AuthService,
    private mensajeria: MensajeriaSignal
  ) {
  }
  infoDirector = this.auth.currentInfoDirector;
  selectRol(rol: RolDTO) {
    // console.log( rol );

    // this.authService.selectedRol( [rol], this.token);
    // this.mensajeria.setMensajeriaDataAsignacionDefault();
    // // localStorage.setItem('current')
    // localStorage.setItem('mensajeriaData', JSON.stringify(this.mensajeria.mensajeriaAsignacionDefault));
    // localStorage.setItem('selectPlanEstudio', JSON.stringify(this.planEstudioSignal.planEstudioDefault));

    // this.router.navigate(['/dashboard']);


  }
  selectedModulo: Modulo;
  ngOnInit(): void {
    setTimeout(() => {
      this.isSpinnerVisible = false;
    }, 800);
  }

  selectModulo(modulo: Modulo) {
    this.selectedModulo = modulo;
  }

  seleccionarRol(rol: Rol) {
    this.rolSignal.set(rol.nombre)
    this.step.set('login')
  }

}
