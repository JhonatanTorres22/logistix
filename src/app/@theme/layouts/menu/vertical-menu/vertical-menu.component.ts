// Angular import
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// project import
import { NavigationItem } from 'src/app/@theme/types/navigation';
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';
import { HORIZONTAL, VERTICAL, COMPACT } from 'src/app/@theme/const';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MenuGroupVerticalComponent } from './menu-group/menu-group.component';
import { AuthenticationService } from 'src/app/@theme/services/authentication.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/infraestructure/services/auth.service';
import { AuthDomainService } from '../../../../auth/domain/services/auth-domain.service';

@Component({
  selector: 'app-vertical-menu',
  standalone: true,
  imports: [SharedModule, MenuGroupVerticalComponent, RouterModule],
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss']
})
export class VerticalMenuComponent implements OnInit, OnDestroy {
  // public props
  @Input() menus: NavigationItem[];
  showUser: false;
  showContent = true;
  themeLayout = new Subscription();

  currentUser = this.authDomainService.currentUserData;
  currentRol = this.authDomainService.currentRol;
  // Constructor
  constructor(
    private location: Location,
    private router: Router,
    private locationStrategy: LocationStrategy,
    private themeService: ThemeLayoutService,
    // private authenticationService: AuthenticationService,
    private authenticationService: AuthService,
    private authDomainService: AuthDomainService

  ) {
    // console.log(this.currentRol());
    
  }

  // public method
  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger');
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger');
        last_parent.classList.add('active');
      }
    }
  }

  ngOnInit(): void {
    this.themeLayout = this.themeService.layout.subscribe((layout) => {
      if (layout == VERTICAL) {
        this.showContent = true;
      }
      if (layout == HORIZONTAL) {
        this.showContent = false;
      }
      if (layout == COMPACT) {
        this.showContent = false;
      }
    });
  }

  ngOnDestroy() {
    this.themeLayout.unsubscribe();
  }

  // user Logout
  logout() {
    this.router.navigate(['/auth/logout']);
    // this.authenticationService.logout();
  }
}
