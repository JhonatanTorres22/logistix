import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiModalTemplateComponent } from './ui-modal-template.component';

describe('UiModalTemplateComponent', () => {
  let component: UiModalTemplateComponent;
  let fixture: ComponentFixture<UiModalTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModalTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiModalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
