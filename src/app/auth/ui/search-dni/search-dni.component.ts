import { Component } from '@angular/core';
import { AuthenticarSignal } from '../../domain/signals/authenticar.signal';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthValidations } from '../../domain/validations/auth.validations';
import { UiInputtComponent } from 'src/app/core/components/ui-inputt/ui-inputt.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthenticarRepository } from '../../domain/repositories/authenticar.repository';
import { AlertService } from 'src/app/demo/services/alert.service';
import { data } from 'src/app/fake-data/series-data';

@Component({
  selector: 'app-search-dni',
  standalone: true,
  imports: [FormsModule, SharedModule,
    UiInputtComponent,],
  templateUrl: './search-dni.component.html',
  styleUrl: './search-dni.component.scss'
})
export class SearchDniComponent {
  messageErrorLogin = '';

  formLogin: FormGroup;
  step = this.authSignal.stepAuth
  dni = this.authSignal.dni
  validatorUsername = this.authValidations.validatorUsername;
  constructor(
    private alertService:AlertService,
    private repository : AuthenticarRepository,
    private authValidations: AuthValidations,
    private authSignal: AuthenticarSignal
  ) {
    this.formLogin = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.validatorUsername.maxLength),
        Validators.minLength(this.validatorUsername.minLength),
        Validators.pattern(this.validatorUsername.expReg)
      ]
      )
    })
  }

  buscarDni = (dni : string) => {
    console.log(dni);
    this.repository.obtenerRoles(dni).subscribe({
      next: (data) => {
        
        console.log(data);
        
        // this.alertService.showAlert(`Listando los roles ${data}`)
      },
      error : (data) => {
        this.alertService.showAlert(`Hubo un error`)
        
      }
      
    })
             this.step.set('roles')
    this.dni.set(dni)
   
  }

}
