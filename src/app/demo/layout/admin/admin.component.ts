// Angular import
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Project import
import { AbleProConfig } from 'src/app/app-config';
import { menus } from 'src/app/demo/data/menu';
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';
import { SharedModule } from '../../shared/shared.module';
import { NavBarComponent } from 'src/app/@theme/layouts/toolbar/toolbar.component';
import { VerticalMenuComponent } from 'src/app/@theme/layouts/menu/vertical-menu';
import { HorizontalMenuComponent } from 'src/app/@theme/layouts/menu/horizontal-menu';
import { CompactMenuComponent } from 'src/app/@theme/layouts/menu/compact-menu';
import { BreadcrumbComponent } from 'src/app/@theme/components/breadcrumb/breadcrumb.component';
import { ConfigurationComponent } from 'src/app/@theme/layouts/configuration/configuration.component';
import { FooterComponent } from 'src/app/@theme/layouts/footer/footer.component';

// const import
import { MIN_WIDTH_1025PX, MAX_WIDTH_1024PX, VERTICAL, HORIZONTAL, COMPACT, RTL, LTR } from 'src/app/@theme/const';

// theme version
import { environment } from 'src/environments/environment';

// rxjs
import { Subscription } from 'rxjs';
import { AuthDomainService } from 'src/app/auth/domain/services/auth-domain.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    SharedModule,
    RouterModule,
    CommonModule,
    NavBarComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    CompactMenuComponent,
    BreadcrumbComponent,
    ConfigurationComponent,
    FooterComponent
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  // public props
  @ViewChild('sidebar') sidebar: MatDrawer;
  menus = this.authDomainService.currentMenu;
  modeValue: MatDrawerMode = 'side';
  direction: string;
  currentApplicationVersion = environment.appVersion;
  currentLayout: string;
  rtlMode: boolean;
  windowWidth: number;
  themeDirection = new Subscription();
  themeLayout = new Subscription();

  // Constructor
  constructor(
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeLayoutService,
    private authDomainService: AuthDomainService
  ) {
    this.currentLayout = AbleProConfig.layout;
    this.rtlMode = AbleProConfig.isRtlLayout;
    this.windowWidth = window.innerWidth;
  }

  // life cycle event
  ngOnInit() {
    // this.menus = this.authDomainService.currentMenuToRole;
    // console.log(menus);
    // this.menus = this.authDomainService.menusToRoleOfUsers()[0].menus
    this.breakpointObserver.observe([MIN_WIDTH_1025PX, MAX_WIDTH_1024PX]).subscribe((result) => {
      if (result.breakpoints[MAX_WIDTH_1024PX]) {
        this.modeValue = 'over';
      } else if (result.breakpoints[MIN_WIDTH_1025PX]) {
        this.modeValue = 'side';
      }
    });

    /**
     * Dashboard menu sidebar toggle listener
     */
    this.themeService.dashBoardMenuState.subscribe(() => {
      this.sidebar.toggle();
    });

    this.manageLayout(this.currentLayout);

    /**
     * Listen to Theme direction change. RTL/LTR
     */
    this.themeDirection = this.themeService.directionChange.subscribe((direction: string) => {
      // here direction layout subscribing according on click event in configuration
      this.rtlMode = direction === RTL ? true : false;
      this.manageLayout(this.currentLayout);
    });

    /**
     * Listen to theme layout changes
     */
    this.themeLayout = this.themeService.layout.subscribe((layout: string) => {
      // here direction layout subscribing according on click event in configuration
      this.currentLayout = layout;
      this.manageLayout(layout);
    });
  }

  ngOnDestroy() {
    this.themeDirection.unsubscribe();
    this.themeLayout.unsubscribe();
  }

  /**
   * Manage layout of theme
   */
  private manageLayout(layout: string) {
    const drawerContent = document.querySelector('.mat-drawer-content') as HTMLElement;
    if (drawerContent) {
      if (layout === VERTICAL) {
        if (this.windowWidth > 1025) {
          drawerContent.style.marginLeft = this.rtlMode === true ? '0px' : '280px';
          drawerContent.style.marginRight = this.rtlMode === true ? '280px' : '0px';
        }
        this.direction = this.rtlMode === true ? RTL : LTR;
      } else if (layout === COMPACT) {
        if (this.windowWidth > 1025) {
          drawerContent.style.marginLeft = this.rtlMode == true ? '0px' : '90px';
          drawerContent.style.marginRight = this.rtlMode == true ? '90px' : '0px';
        }
        this.direction = this.rtlMode == true ? RTL : LTR;
      } else if (layout == HORIZONTAL) {
        drawerContent.style.marginLeft = '0px';
      }
    }
  }
}
