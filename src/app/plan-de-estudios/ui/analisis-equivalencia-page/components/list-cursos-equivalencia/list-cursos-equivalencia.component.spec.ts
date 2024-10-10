import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCursosEquivalenciaComponent } from './list-cursos-equivalencia.component';

describe('ListCursosEquivalenciaComponent', () => {
  let component: ListCursosEquivalenciaComponent;
  let fixture: ComponentFixture<ListCursosEquivalenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCursosEquivalenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCursosEquivalenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
