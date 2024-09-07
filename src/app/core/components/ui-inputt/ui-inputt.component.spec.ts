import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiInputtComponent } from './ui-inputt.component';

describe('UiInputtComponent', () => {
  let component: UiInputtComponent;
  let fixture: ComponentFixture<UiInputtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiInputtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiInputtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
