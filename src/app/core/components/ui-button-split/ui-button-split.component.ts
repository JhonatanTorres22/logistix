import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'ui-button-split',
  standalone: true,
  imports: [ SharedModule, CommonModule ],
  templateUrl: './ui-button-split.component.html',
  styleUrl: './ui-button-split.component.scss'
})
export class UiButtonSplitComponent {

  @Input() label: '';
  @Input() disabled: string = "false";
  @Input() icon: string;
  @Input() tooltip: string;
  @Input() classButton: string = '';
  @Input() items: MenuItem[];
  @Input() size: 'sm' | 'lg' | ''

  @Output() onClick = new EventEmitter();

  constructor() {
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
            {
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                items: [
                    {
                        label: 'Bookmark',
                        icon: 'pi pi-fw pi-bookmark'
                    },
                    {
                        label: 'Video',
                        icon: 'pi pi-fw pi-video'
                    }
                ]
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-trash'
            },
            {
                separator: true
            },
            {
                label: 'Export',
                icon: 'pi pi-fw pi-external-link'
            }
        ]
      },
      {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {
                  label: 'Left',
                  icon: 'pi pi-fw pi-align-left'
              },
              {
                  label: 'Right',
                  icon: 'pi pi-fw pi-align-right'
              },
              {
                  label: 'Center',
                  icon: 'pi pi-fw pi-align-center'
              },
              {
                  label: 'Justify',
                  icon: 'pi pi-fw pi-align-justify'
              }
          ]
      },
    ]
  }

}
