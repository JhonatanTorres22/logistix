import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbienteAddComponent } from './ambiente-add.component';

describe('AmbienteAddComponent', () => {
  let component: AmbienteAddComponent;
  let fixture: ComponentFixture<AmbienteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmbienteAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmbienteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
