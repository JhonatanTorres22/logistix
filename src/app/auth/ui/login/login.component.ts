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
import { AuthDomainService } from '../../domain/services/auth-domain.service';
import { Authenticated, Rol } from '../../domain/models/auth.model';
import { AlertService } from 'src/app/demo/services/alert.service';
import { SelectRolComponent } from '../select-rol/select-rol.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, SharedModule, RouterModule, FormsModule, UiInputComponent, SelectRolComponent ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../authentication.scss']
})
export class LoginComponent {

    // public props
    hide = true;
    loginForm: FormGroup;
    formLogin: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
  
    maxLengthUserName: number;
    minLengthUserName: number;
    expRegUsername: RegExp;
    expRegUserNameToLockInput: RegExp;

    maxLengthPassword: number;
    minLengthPassword: number;
    expRegPassword: RegExp;
    expRegPasswordToLockInput: RegExp;

    messageErrorLogin = '';

    userData = this.authDomainService.currentUserData;

    roles = [];
    token: string = '';
    menu = [];

    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private authValidations: AuthValidations,
      private authService: AuthService,
      private authRepository: AuthRepository,
      private authDomainService: AuthDomainService,
      private alertService: AlertService
    ) {

      this.maxLengthUserName = this.authValidations.maxLengthUserName;
      this.minLengthUserName = this.authValidations.minLengthUserName;
      this.expRegUsername = this.authValidations.expRegUserName;
      this.expRegUserNameToLockInput = this.authValidations.expRegUserNameToLockInput;

      this.maxLengthPassword = this.authValidations.maxLengthPassword;
      this.minLengthPassword = this.authValidations.minLengthPassword;

      this.expRegPassword = this.authValidations.expRegPassword;
      this.expRegPasswordToLockInput = this.authValidations.expRegPasswordToLockInput;

      this.formLogin = new FormGroup({
        userName: new FormControl('44369835', [
          Validators.required,
          Validators.maxLength(this.maxLengthUserName),
          Validators.minLength(this.minLengthUserName),
          Validators.pattern(this.expRegUsername)
        ]
        ),
        password: new FormControl('44369835', [
          Validators.required,
          Validators.maxLength(this.maxLengthPassword),
          Validators.minLength(this.minLengthPassword)
        ]
        )
      })
      // redirect to home if already logged in
      if (this.authDomainService.currentUserData()?.NumeroDocumento != '') {
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
      // this.authenticationService
      //   .login(this.formValues['email'].value, this.formValues['password'].value)
      //   .pipe(first())
      //   .subscribe(
      //     () => {
      //       this.router.navigate(['/dashboard']);
      //     },
      //     (error) => {
      //       this.error = error;
      //       this.loading = false;
      //     }
      //   );
      const login: any = { 
        userName: this.formLogin.value.userName,
        password: this.formLogin.value.password,

        // userName: 'info@phoenixcoded.co',
        // password: '123456',

      }
      this.authRepository.login( login ).subscribe({
        next: ( data ) => {
          
          // const decoded = jwtDecode<JwtPayload>(data.accessToken);
          const decoded = JSON.stringify(jwtDecode<JwtPayload>(data.accessToken))
   
          const userData = JSON.parse(decoded);
          this.token = data.accessToken;
          // console.log();
          
          this.roles = JSON.parse(userData.Roles);
          // this.authDomainService.user;
          // console.log(this.userData());
          // console.log(JSON.parse(this.userData().Roles));
          
          // this.menu = this.mapp
         
          
          // this.router.navigate(['/dashboard']);
        }, error: (error) => {
          console.log(error);
          this.alertService.showAlert(this.authValidations.errorLogin(error.error?.message), 'error');
          // this.messageErrorLogin = this.authValidations.errorLogin(error.error.message);
        }
      })
    }

}
