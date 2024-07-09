import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UiSelect } from './ui-select.interface';

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [ CommonModule, SharedModule],
  templateUrl: './ui-select.component.html',
  styleUrl: './ui-select.component.scss'
})
export class UiSelectComponent implements ControlValueAccessor, OnInit{

  constructor(
    @Self() private ngControl: NgControl
  ) {
    if( ngControl ) {
      this.ngControl.valueAccessor = this
    }
  }

  hide: boolean = true;
  // @Output() onInput: EventEmitter<string> = new EventEmitter();
  @Input() label = '';
  @Input() type = '';
  @Input() readonly: boolean = false;
  @Input() options: UiSelect[];
  @Input() classInput: string = '';
  @Output() onChange = new EventEmitter();
  @Input() appearance = 'outline';
  @Input() image: string = '';
  
  formControl!: FormControl
  
  ngOnInit(): void {
    this.formControl = this.ngControl.control as FormControl
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
 
  
}
