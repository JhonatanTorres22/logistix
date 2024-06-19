import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeLayoutService {
  // theme menu sidebar show and hide
  dashBoardMenuState = new Subject();

  // theme component page menu sidebar show and hide
  componentMenuState = new Subject();

  // theme sidebar direction change in rtl mode
  directionChange: Subject<string> = new Subject();

  // color change
  color = new ReplaySubject<string>(1);

  // layout change
  layout = new ReplaySubject<string>(1);

  // themeMode Change
  isDarkMode = new ReplaySubject<string>(1);

  drawerOpen = false;
  componentDrawerOpen = false;

  /**
   * Toggle Dashboard vertical menu
   */
  toggleSideDrawer() {
    this.dashBoardMenuState.next(!this.drawerOpen);
  }

  /**
   * Toggle Component vertical menu
   */
  toggleMenuSide() {
    this.componentMenuState.next(!this.componentDrawerOpen);
  }
}
