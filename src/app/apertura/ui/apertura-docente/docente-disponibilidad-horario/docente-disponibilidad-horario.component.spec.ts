import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteDisponibilidadHorarioComponent } from './docente-disponibilidad-horario.component';

describe('DocenteDisponibilidadHorarioComponent', () => {
  let component: DocenteDisponibilidadHorarioComponent;
  let fixture: ComponentFixture<DocenteDisponibilidadHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteDisponibilidadHorarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocenteDisponibilidadHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
