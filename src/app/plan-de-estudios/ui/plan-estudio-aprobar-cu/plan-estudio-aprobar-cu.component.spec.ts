import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEstudioAprobarCuComponent } from './plan-estudio-aprobar-cu.component';

describe('PlanEstudioAprobarCuComponent', () => {
  let component: PlanEstudioAprobarCuComponent;
  let fixture: ComponentFixture<PlanEstudioAprobarCuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanEstudioAprobarCuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanEstudioAprobarCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
