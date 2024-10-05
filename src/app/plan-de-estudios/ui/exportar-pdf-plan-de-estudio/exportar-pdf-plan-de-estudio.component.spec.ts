import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportarPdfPlanDeEstudioComponent } from './exportar-pdf-plan-de-estudio.component';

describe('ExportarPdfPlanDeEstudioComponent', () => {
  let component: ExportarPdfPlanDeEstudioComponent;
  let fixture: ComponentFixture<ExportarPdfPlanDeEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportarPdfPlanDeEstudioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExportarPdfPlanDeEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
