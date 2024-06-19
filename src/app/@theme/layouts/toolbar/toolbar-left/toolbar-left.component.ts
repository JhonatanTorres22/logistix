// angular import
import { Component, OnDestroy, OnInit } from '@angular/core';

// project import
import { ThemeLayoutService } from 'src/app/@theme/services/theme-layout.service';
import { HORIZONTAL, VERTICAL, COMPACT } from 'src/app/@theme/const';
import { SharedModule } from 'src/app/demo/shared/shared.module';

// rxjs
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-left',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './toolbar-left.component.html',
  styleUrls: ['./toolbar-left.component.scss']
})
export class NavLeftComponent implements OnInit, OnDestroy {
  showToggleMenu: boolean = true;
  themeLayout = new Subscription();

  // constructor
  constructor(private themeService: ThemeLayoutService) {}

  ngOnInit() {
    this.themeLayout = this.themeService.layout.subscribe((layout) => {
      if (layout === VERTICAL) {
        this.showToggleMenu = true;
      }
      if (layout == HORIZONTAL) {
        this.showToggleMenu = false;
      }
      if (layout === COMPACT) {
        this.showToggleMenu = true;
      }
    });
  }

  ngOnDestroy() {
    this.themeLayout.unsubscribe();
  }

  // public method
  toggleMenu() {
    this.themeService.toggleSideDrawer();
  }
}
