import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeyendaPlanEstudioComponent } from './leyenda-plan-estudio.component';

describe('LeyendaPlanEstudioComponent', () => {
  let component: LeyendaPlanEstudioComponent;
  let fixture: ComponentFixture<LeyendaPlanEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeyendaPlanEstudioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeyendaPlanEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
