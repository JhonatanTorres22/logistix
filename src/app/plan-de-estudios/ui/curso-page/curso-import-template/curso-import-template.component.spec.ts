import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoImportTemplateComponent } from './curso-import-template.component';

describe('CursoImportTemplateComponent', () => {
  let component: CursoImportTemplateComponent;
  let fixture: ComponentFixture<CursoImportTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoImportTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursoImportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
