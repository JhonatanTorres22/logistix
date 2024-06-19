import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MatDrawer } from '@angular/material/sidenav';
import { FileManagerLayoutService } from '../file-manager-layout.service';

@Component({
  selector: 'app-file-slider',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './file-slider.component.html',
  styleUrls: ['./file-slider.component.scss']
})
export class FileSliderComponent implements OnInit {
  @ViewChild('file') file: MatDrawer;

  constructor(private layoutService: FileManagerLayoutService) {}

  ngOnInit() {
    this.layoutService.fileSlider.subscribe(() => {
      this.file.toggle();
    });
  }

  fileClose() {
    this.layoutService.toggleFileSide();
  }

  user_file = [
    {
      img: 'assets/images/user/avatar-1.png',
      name: 'John Doe',
      email: 'John_Doe@ablepro.io'
    },
    {
      img: 'assets/images/user/avatar-5.jpg',
      name: 'Addie Bass',
      email: 'Addie_B@ablepro.io'
    },
    {
      img: 'assets/images/user/avatar-3.png',
      name: 'Alberta Robbins',
      email: 'Alberta@ablepro.io'
    },
    {
      img: 'assets/images/user/avatar-2.png',
      name: 'Agnes McGee',
      email: 'Agnes.Gee@ablepro.io'
    }
  ];
}
