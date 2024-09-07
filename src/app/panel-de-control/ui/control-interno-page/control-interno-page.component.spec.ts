import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlInternoPageComponent } from './control-interno-page.component';

describe('ControlInternoPageComponent', () => {
  let component: ControlInternoPageComponent;
  let fixture: ComponentFixture<ControlInternoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlInternoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlInternoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
