import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiModalFooterComponent } from './ui-modal-footer.component';

describe('UiModalFooterComponent', () => {
  let component: UiModalFooterComponent;
  let fixture: ComponentFixture<UiModalFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModalFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiModalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
