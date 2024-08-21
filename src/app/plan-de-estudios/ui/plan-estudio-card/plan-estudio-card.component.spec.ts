import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEstudioCardComponent } from './plan-estudio-card.component';

describe('PlanEstudioCardComponent', () => {
  let component: PlanEstudioCardComponent;
  let fixture: ComponentFixture<PlanEstudioCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanEstudioCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanEstudioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
