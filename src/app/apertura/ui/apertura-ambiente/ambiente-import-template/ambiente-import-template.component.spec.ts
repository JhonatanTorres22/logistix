import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbienteImportTemplateComponent } from './ambiente-import-template.component';

describe('AmbienteImportTemplateComponent', () => {
  let component: AmbienteImportTemplateComponent;
  let fixture: ComponentFixture<AmbienteImportTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmbienteImportTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmbienteImportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
