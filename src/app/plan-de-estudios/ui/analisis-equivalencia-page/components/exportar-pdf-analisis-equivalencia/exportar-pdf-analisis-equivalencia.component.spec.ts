import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportarPdfAnalisisEquivalenciaComponent } from './exportar-pdf-analisis-equivalencia.component';

describe('ExportarPdfAnalisisEquivalenciaComponent', () => {
  let component: ExportarPdfAnalisisEquivalenciaComponent;
  let fixture: ComponentFixture<ExportarPdfAnalisisEquivalenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportarPdfAnalisisEquivalenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExportarPdfAnalisisEquivalenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
