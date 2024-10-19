import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoEquiPreComponent } from './curso-equi-pre.component';

describe('CursoEquiPreComponent', () => {
  let component: CursoEquiPreComponent;
  let fixture: ComponentFixture<CursoEquiPreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoEquiPreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursoEquiPreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
