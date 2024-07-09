import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiButtonSplitComponent } from './ui-button-split.component';

describe('UiButtonSplitComponent', () => {
  let component: UiButtonSplitComponent;
  let fixture: ComponentFixture<UiButtonSplitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiButtonSplitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiButtonSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
