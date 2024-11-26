import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteImportTemplateComponent } from './docente-import-template.component';

describe('DocenteImportTemplateComponent', () => {
  let component: DocenteImportTemplateComponent;
  let fixture: ComponentFixture<DocenteImportTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteImportTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocenteImportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
