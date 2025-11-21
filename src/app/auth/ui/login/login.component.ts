import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
// import { Validators } from 'ngx-editor';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/@theme/services/authentication.service';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AuthService } from '../../infraestructure/services/auth.service';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { AuthValidations } from '../../domain/validations/auth.validations';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { AlertService } from 'src/app/demo/services/alert.service';
import { SelectRolComponent } from '../select-rol/select-rol.component';
import { AuthSignal } from '../../domain/signals/auth.signal';
import { DeshabilitarInputsFormularioService } from 'src/app/core/services/deshabilitar-inputs-formulario.service';
import { UiInputtComponent } from 'src/app/core/components/ui-inputt/ui-inputt.component';
import { AuthenticarRepository } from '../../domain/repositories/authenticar.repository';
import { Authenticar } from '../../domain/models/authenticar.model';
import { AuthenticarSignal } from '../../domain/signals/authenticar.signal';
import { MenuRepository } from '../../domain/repositories/menu.repository';
import { MenuSignal } from '../../domain/signals/menu.signal';
import { MenuMapper } from '../../domain/mappers/menu.mapper';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    UiInputtComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../authentication.scss']
})
export class LoginComponent {
  validatorPassword = this.authValidations.validatorPassword;
  // public props
  hide = true;
  loginForm: FormGroup;
  formLogin: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  messageErrorLogin = '';

  userData = this.auth.currentUserData;
  roles = [];
  token: string = '';
  menu = this.menuSignal.currentMenu;

  dni = this.authenticarSignal.dni
  rol = this.authenticarSignal.rol

  constructor(
    private mapperMenu: MenuMapper,
    private menuRepository: MenuRepository,
    private route: ActivatedRoute,
    private router: Router,
    private menuSignal: MenuSignal,
    private authValidations: AuthValidations,
    private auth: AuthSignal,
    private authenticarSignal: AuthenticarSignal,
    private authenticar: AuthenticarRepository,
    private alertService: AlertService
  ) {

    // this.maxLengthUserName = this.authValidations.maxLengthUserName;
    // this.minLengthUserName = this.authValidations.minLengthUserName;
    // this.expRegUsername = this.authValidations.expRegUserName;
    // this.expRegUserNameToLockInput = this.authValidations.expRegUserNameToLockInput;

    // this.maxLengthPassword = this.authValidations.maxLengthPassword;
    // this.minLengthPassword = this.authValidations.minLengthPassword;

    // this.expRegPassword = this.authValidations.expRegPassword;
    // this.expRegPasswordToLockInput = this.authValidations.expRegPasswordToLockInput;

    this.formLogin = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.validatorPassword.maxLength),
        Validators.minLength(this.validatorPassword.minLength)
      ]
      )
    })

    // redirect to home if already logged in
    if (this.auth.currentUserData()?.NumeroDocumento != '') {
      this.router.navigate(['/dashboard']); // '/dashboard/default'
    }
  }

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   userName: ['44369835', Validators.required],
    //   password: ['44369835', Validators.required]
    // });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  // convenience getter for easy access to form fields
  // get formValues() {
  //   return this.loginForm.controls;
  // }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formLogin.invalid) return

    this.loading = true;
    const login: Authenticar = {
      username: this.dni(),
      password: this.formLogin.value.password,
      role: this.rol()
    }
    console.log(login);

    this.authenticar.login(login).subscribe({
      next: (data) => {
        // const decoded = JSON.stringify(jwtDecode<JwtPayload>(data.accessToken))
        // const userData = JSON.parse(decoded);
        // this.token = data.accessToken;
        // this.roles = JSON.parse(userData.Roles);
        this.alertService.sweetAlert('success', '¡Inicio de sesión exitoso!', 'Bienvenido a LOGISTIX');
        this.router.navigate(['/dashboard']);// '/dashboard/default'
        this.listarMenu()
      }, error: (error) => {
        console.log(error);
        this.alertService.showAlert(this.authValidations.errorLogin(error.error?.message), 'error');
        // this.messageErrorLogin = this.authValidations.errorLogin(error.error.message);
      }
    })
  }

  listarMenu = () => {
    this.menuRepository.obtenerMenu().subscribe(rolMenus => {
      const menus = rolMenus[0]?.menus || [];
      const navigationItems = MenuMapper.mapMenuToNavigation(menus);
      this.menu.set(navigationItems);
      localStorage.setItem('menu', JSON.stringify(navigationItems));
    })
  }

}
