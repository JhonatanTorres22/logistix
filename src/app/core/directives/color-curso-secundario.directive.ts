import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CursoPlanEquivalencia } from 'src/app/plan-de-estudios/domain/models/curso-plan.model';
import { Malla } from 'src/app/plan-de-estudios/domain/models/malla.model';

@Directive({
  selector: '[ColorCursoSecundario]',
  standalone: true
})
export class ColorCursoSecundarioDirective implements OnInit {

  @Input() curso: Malla;
  @Input() cursos: Malla[]

  constructor( private element: ElementRef ) {
    

  }

  ngOnInit(): void {
    // console.log( this.cursos);
    console.log( this.element.nativeElement );
    
    this.aplicarColor();
    
  }

  aplicarColor = () => {

    if( this.cursos?.length === 0 ) {
      return;
    }

    this.cursos?.map( ( curso, index ) => {
      if( curso.codigoCurso === this.curso.codigoCurso ) {
        // document.getElementById('check-'+curso.idCursoPlan)?.setAttribute('disabled', 'true');
        
        console.log( this.element.nativeElement );
        
        // Seleccionar el último div y el checkbox dentro de él
        const lastDiv = this.element.nativeElement.querySelector('.check');
        // Navegar al siguiente div
        console.log( lastDiv );
        // lastDiv.setAttribute('disabled', 'true');
        // const checkbox = this.element.nativeElement.querySelector('input[type="checkbox"]');
        setTimeout(() => {
          const checkbox = document.querySelector(`#check-${curso.idMalla}`);
          this.element.nativeElement?.classList.remove('bg-white', 'text-black');
          // checkbox?.classList.add('hidden');
          curso.equivalencias.length == 0 ? this.element.nativeElement?.classList.add('bg-yellow-100', 'text-black') : this.element.nativeElement?.classList.add('bg-green-100', 'text-black');

          checkbox?.setAttribute('disabled', 'true');
          console.log( index + 1, ' - ', checkbox );
        }, 900);
        
        // checkbox.setAttribute('disabled', 'true');
        // setTimeout(() => {
        
          
        //   const checkbox = lastDiv?.querySelector('input[type="checkbox"]');

        //   // Deshabilitar el checkbox si existe
        //   if (checkbox) {
        //     checkbox.setAttribute('checked', 'true');
        //   }
        // }, 400);

      
        
      } else {
        if( curso.equivalencias?.length == 0 ) {
          
          this.element.nativeElement?.classList.add('bg-white', 'text-black');
          this.element.nativeElement?.style.setProperty('background-color', '#ffffff');
        
        }


      }
    })
  }

}
