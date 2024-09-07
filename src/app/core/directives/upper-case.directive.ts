import { Directive, ElementRef, HostListener, Input, Renderer2, forwardRef } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[UpperCase]',
  standalone: true,
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     multi: true,
  //     useExisting: forwardRef( () => UpperCaseDirective),
  //   }
  // ]
})
export class UpperCaseDirective extends DefaultValueAccessor{

  @Input() expReg = '';

  @HostListener('input', ['$event']) input( $event: InputEvent) {
    console.log( this.expReg );
    
    const target = $event.target as HTMLInputElement;
    const start = target.selectionStart;

    
    target.value = target.value.toUpperCase().trimStart().replace(/\s{1,}/g, ' ');
  
    // target.value = target.value.replace(this.expReg, '');
    
    target.setSelectionRange(start, start);

    this.onChange( target.value );
  }
  
  constructor( renderer: Renderer2, elementRef: ElementRef ) {
    super( renderer, elementRef, false );
  }


}
