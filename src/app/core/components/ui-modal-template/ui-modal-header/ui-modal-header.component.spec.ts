import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiModalHeaderComponent } from './ui-modal-header.component';

describe('UiModalHeaderComponent', () => {
  let component: UiModalHeaderComponent;
  let fixture: ComponentFixture<UiModalHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModalHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiModalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
