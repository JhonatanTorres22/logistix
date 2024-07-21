import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEstudioListComponent } from './plan-estudio-list.component';

describe('PlanEstudioListComponent', () => {
  let component: PlanEstudioListComponent;
  let fixture: ComponentFixture<PlanEstudioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanEstudioListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanEstudioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
