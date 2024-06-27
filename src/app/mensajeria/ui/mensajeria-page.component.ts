import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { EmailComponent } from 'src/app/demo/pages/application/email/email.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaNavComponent } from './mensajeria-nav/mensajeria-nav.component';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MAX_WIDTH_1024PX, MAX_WIDTH_1399PX, MIN_WIDTH_1025PX, MIN_WIDTH_1400PX } from 'src/app/@theme/const';
import { MatDialog } from '@angular/material/dialog';
import { MensajeriaContentComponent } from './mensajeria-content/mensajeria-content.component';
import { MensajeriaSignal } from '../domain/signals/mensajeria.signal';

@Component({
  selector: 'app-mensajeria-page',
  standalone: true,
  imports: [ CommonModule, SharedModule, MensajeriaContentComponent],
  templateUrl: './mensajeria-page.component.html',
  styleUrl: './mensajeria-page.component.scss'
})
export class MensajeriaPageComponent {

  // public props
  @ViewChild('email') email: MatDrawer;
  modeValue: MatDrawerMode = 'side';
  status = 'false';
  selectedTabIndex = 0;
  mailListHight = true;

  // constructor
  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private signal: MensajeriaSignal
  ) {

  }

  // life cycle event
  ngOnInit() {
    this.breakpointObserver.observe([MIN_WIDTH_1025PX, MAX_WIDTH_1024PX]).subscribe((result) => {
      if (result.breakpoints[MAX_WIDTH_1024PX]) {
        this.modeValue = 'over';
      } else if (result.breakpoints[MIN_WIDTH_1025PX]) {
        this.modeValue = 'side';
      }
    });
    this.breakpointObserver.observe([MIN_WIDTH_1400PX, MAX_WIDTH_1399PX]).subscribe((result) => {
      if (result.breakpoints[MAX_WIDTH_1399PX]) {
        this.status = 'true'; //false
      } else if (result.breakpoints[MIN_WIDTH_1400PX]) {
        this.status = 'true';
      }
    });

    // this.email.
  }

  // public method
  tabChanged(index: number) {
    this.selectedTabIndex = index;
  }

  onClick() {
    this.mailListHight = !this.mailListHight;
  }

  composeMail() {
    // this.dialog.open(ComposeMailComponent, {
    //   width: '500px'
    // });
  }

  toggle() {
    this.signal.setToggle();
  }
}
