import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUserOptionsComponent } from './ui-user-options.component';

describe('UiUserOptionsComponent', () => {
  let component: UiUserOptionsComponent;
  let fixture: ComponentFixture<UiUserOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiUserOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiUserOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
