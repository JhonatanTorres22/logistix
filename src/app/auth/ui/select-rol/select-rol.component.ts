import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { Rol } from '../../domain/models/auth.model';
import { RolDTO } from '../../infraestructure/dto/auth.dto';
import { Router } from '@angular/router';
import { AuthService } from '../../infraestructure/services/auth.service';

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
  imgRol: string = '';
  isSpinnerVisible: boolean = true;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  // getImgRol = ( rol: string ) => {
  //   switch( rol ) {
  //     case 'Administrador': this.imgRol = ''
  //   }
  // }

  selectRol( rol: RolDTO) {
    // console.log( rol );

    this.authService.selectedRol( [rol], this.token);

    this.router.navigate(['/dashboard']);
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setTimeout(() => {
      this.isSpinnerVisible = false;
    }, 800);
  }

}
