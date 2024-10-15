import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoRenovadoListComponent } from './curso-renovado-list.component';

describe('CursoRenovadoListComponent', () => {
  let component: CursoRenovadoListComponent;
  let fixture: ComponentFixture<CursoRenovadoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoRenovadoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursoRenovadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
