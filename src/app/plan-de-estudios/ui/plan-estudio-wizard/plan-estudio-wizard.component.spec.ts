import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEstudioWizardComponent } from './plan-estudio-wizard.component';

describe('PlanEstudioWizardComponent', () => {
  let component: PlanEstudioWizardComponent;
  let fixture: ComponentFixture<PlanEstudioWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanEstudioWizardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanEstudioWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
