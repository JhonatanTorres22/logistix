import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDatosDocenteComponent } from './mostrar-datos-docente.component';

describe('MostrarDatosDocenteComponent', () => {
  let component: MostrarDatosDocenteComponent;
  let fixture: ComponentFixture<MostrarDatosDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarDatosDocenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarDatosDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
