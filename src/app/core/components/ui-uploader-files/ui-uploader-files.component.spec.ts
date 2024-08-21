import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUploaderFilesComponent } from './ui-uploader-files.component';

describe('UiUploaderFilesComponent', () => {
  let component: UiUploaderFilesComponent;
  let fixture: ComponentFixture<UiUploaderFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiUploaderFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiUploaderFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
