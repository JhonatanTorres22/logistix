import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { MAX_WIDTH_1024PX, MAX_WIDTH_1399PX, MIN_WIDTH_1025PX, MIN_WIDTH_1400PX } from 'src/app/@theme/const';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'mensajeria-nav',
  standalone: true,
  imports: [ CommonModule, SharedModule],
  templateUrl: './mensajeria-nav.component.html',
  styleUrl: './mensajeria-nav.component.scss'
})
export class MensajeriaNavComponent {

  

  
  
}
