import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'ui-input-fecha',
  standalone: true,
  imports: [ CommonModule, SharedModule],
  templateUrl: './ui-input-fecha.component.html',
  styleUrl: './ui-input-fecha.component.scss',
  providers:[ {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    provideMomentDateAdapter(),
  ]
})
export class UiInputFechaComponent implements ControlValueAccessor, OnInit{

  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    @Self() private ngControl: NgControl
  ) {
    if( ngControl ) {
      this.ngControl.valueAccessor = this
    }
  }
  @Input() expReg = '';
  @Input() label = '';
  @Input() type = '';
  @Input() readonly: boolean = false;
  @Input() maxlength = 0;
  @Input() minlength = 0;
  @Input() datepickerFilter: (date: Date) => boolean;
  formControl!: FormControl
  
  ngOnInit(): void {
    this.formControl = this.ngControl.control as FormControl;
    this._locale = 'es-ES';
    this._adapter.setLocale(this._locale);
  }

  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }
 
  onInput( event: any ) {
    this.formControl.setValue(this.formControl.value.replace(this.expReg, ''));    
  }
  
}
