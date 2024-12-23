import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListValidarHorarioComponent } from './list-validar-horario.component';

describe('ListValidarHorarioComponent', () => {
  let component: ListValidarHorarioComponent;
  let fixture: ComponentFixture<ListValidarHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListValidarHorarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListValidarHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
