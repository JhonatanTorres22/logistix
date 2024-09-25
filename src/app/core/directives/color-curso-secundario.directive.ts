import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CursoPlanEquivalencia } from 'src/app/plan-de-estudios/domain/models/curso-plan.model';

@Directive({
  selector: '[ColorCursoSecundario]',
  standalone: true
})
export class ColorCursoSecundarioDirective implements OnInit {

  @Input() curso: CursoPlanEquivalencia;
  @Input() cursos: CursoPlanEquivalencia[]

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

    this.cursos?.map( curso => {
      if( curso.codigoCurso === this.curso.codigoCurso ) {
        this.element.nativeElement?.classList.add('bg-green-200', 'text-green-900');
        // document.getElementById('check-'+curso.idCursoPlan)?.setAttribute('disabled', 'true');
        console.log( this.element.nativeElement );

        // Seleccionar el último div y el checkbox dentro de él
        const lastDiv = this.element.nativeElement.querySelector('.check');
        // Navegar al siguiente div
        console.log( lastDiv );
        // lastDiv.setAttribute('disabled', 'true');
        const checkbox = lastDiv?.querySelector('input[type="checkbox"]');
        // checkbox.setAttribute('disabled', 'true');
        checkbox?.classList.add('hidden');
        // setTimeout(() => {
        
          
        //   const checkbox = lastDiv?.querySelector('input[type="checkbox"]');

        //   // Deshabilitar el checkbox si existe
        //   if (checkbox) {
        //     checkbox.setAttribute('checked', 'true');
        //   }
        // }, 400);
        
      }
    })
  }

}
