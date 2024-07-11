import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSignal } from 'src/app/auth/domain/signals/auth.signal';
import { RolDTO } from 'src/app/auth/infraestructure/dto/auth.dto';
import { AuthService } from 'src/app/auth/infraestructure/services/auth.service';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';


@Component({
  selector: 'ui-user-options',
  standalone: true,
  imports: [ CommonModule, SharedModule],
  templateUrl: './ui-user-options.component.html',
  styleUrl: './ui-user-options.component.scss'
})
export class UiUserOptionsComponent {

  @Input() iconSVG: string = '';
  icon: string = 'assets/fonts/custom-icon.svg#custom-refresh-2';
  currentUser = this.auth.currentUserData;
  currentRol = this.auth.currentRol;


  constructor(
    private auth: AuthSignal,
    private authService: AuthService,
    private alert: AlertService,
    private router: Router
  ) {

    console.log(this.iconSVG);
    

    
  }

  ngOnInit() {
    if( this.iconSVG ) {
      this.icon = 'assets/fonts/custom-icon.svg#custom-' + this.iconSVG;
    }
  }

  changeRol( rol: RolDTO ) {
    console.log( rol );

    this.alert.sweetAlert('question', 'Confirmación', `¿Está seguro que desea cambiar al rol: ${ rol.Nombre }?`)
      .then( isConfirm => {
        if( !isConfirm ) return;

        const token = JSON.parse(localStorage.getItem('token')!)
        this.authService.selectedRol( [rol], token.accessToken);
        this.router.navigate(['dashboard']);
        this.alert.showAlert(`Se ha cambiado al rol ${ rol.Nombre }`, 'success', 5)

      })

    
  }

}
