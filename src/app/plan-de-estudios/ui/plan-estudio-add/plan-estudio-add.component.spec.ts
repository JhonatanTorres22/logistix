import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEstudioAddComponent } from './plan-estudio-add.component';

describe('PlanEstudioAddComponent', () => {
  let component: PlanEstudioAddComponent;
  let fixture: ComponentFixture<PlanEstudioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanEstudioAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanEstudioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
