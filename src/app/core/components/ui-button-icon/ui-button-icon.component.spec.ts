import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiButtonIconComponent } from './ui-button-icon.component';

describe('UiButtonIconComponent', () => {
  let component: UiButtonIconComponent;
  let fixture: ComponentFixture<UiButtonIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiButtonIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiButtonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
