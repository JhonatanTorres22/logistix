// angular import
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AuthDomainService } from 'src/app/auth/domain/services/auth-domain.service';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  expirarToken = this.authDomainService.currentExpirarToken();
  hoy = new Date().getTime();
  temporalidad: number;
  expiro: boolean = false

  constructor( 
    private authDomainService: AuthDomainService,
    private dateAdapter: DateAdapter<Date>,
    private router: Router

   ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

    this.expiro = new Date( this.expirarToken ).getTime() < this.hoy
    // console.log(new Date( (new Date( this.expirarToken ).getTime() - this.hoy) ).getMinutes());
    this.temporalidad = new Date( (new Date( this.expirarToken ).getTime() - this.hoy) ).getMinutes();
  }

  ngOnInit(): void {
    // this.expirarsesion();
  }

  // expirarsesion( ) {
  //   setTimeout(() => {
  //     this.expiro ? this.router.navigate(['/auth/logout']) : ''
  //   }, this.temporalidad);
  // }

}
