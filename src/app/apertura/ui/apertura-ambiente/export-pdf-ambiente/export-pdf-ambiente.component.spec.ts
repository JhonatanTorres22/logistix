import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPdfAmbienteComponent } from './export-pdf-ambiente.component';

describe('ExportPdfAmbienteComponent', () => {
  let component: ExportPdfAmbienteComponent;
  let fixture: ComponentFixture<ExportPdfAmbienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportPdfAmbienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExportPdfAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
