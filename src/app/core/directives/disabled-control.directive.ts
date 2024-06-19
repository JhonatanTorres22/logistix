import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[disabledControl]',
  standalone: true
})
export class DisabledControlDirective {

  @Input() set disableControl( condition : boolean ) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control!.disable();
  }


  constructor( private ngControl : NgControl ) { }

}
