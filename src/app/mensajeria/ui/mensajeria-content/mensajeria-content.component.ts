import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MailData } from 'src/app/fake-data/mail';
import { MensajeriaSignal } from '../../signals/mensajeria.signal';

export interface PeriodicElement {
  images: string;
  name: string;
  text: string;
  symbol: string;
  date: string;
  promo: string;
  forums: string;
}

const ELEMENT_DATA: PeriodicElement[] = MailData;

@Component({
  selector: 'mensajeria-content',
  standalone: true,
  imports: [ CommonModule, SharedModule],
  templateUrl: './mensajeria-content.component.html',
  styleUrl: './mensajeria-content.component.scss'
})
export class MensajeriaContentComponent {
  // public props
  titleContent = true;
  detailsContent = false;
  @Input() star = false;
  @Input() unStar = true;
  @Input() unImportant = true;
  @Input() important = false;
  @Input() paperClip = true;
  @Input() promotion = false;
  @Input() forums = false;
  @Input() common = true;
  // @Input() status = 'true';

  toggle = this.signal.toggle;

  displayedColumns: string[] = ['name']; //'select', 'text', 'symbol'
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);


  constructor( private signal: MensajeriaSignal) {}

  // public method
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  detailsContentShow() {
    this.titleContent = !this.titleContent;
    this.detailsContent = !this.detailsContent;
  }

  backToMail() {
    this.detailsContent = false;
    this.titleContent = true;
  }
}
