import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AuthService } from '../../infraestructure/services/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [ CommonModule, SharedModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {
  isSpinnerVisible: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isSpinnerVisible = false;
      this.authService.logout();
      // this.router.navigate(['/auth/login']);
    }, 1500);
  }
}
