import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUploadFileComponent } from './ui-upload-file.component';

describe('UiUploadFileComponent', () => {
  let component: UiUploadFileComponent;
  let fixture: ComponentFixture<UiUploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiUploadFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
