import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionPageComponent } from './asignacion-page.component';

describe('AsignacionPageComponent', () => {
  let component: AsignacionPageComponent;
  let fixture: ComponentFixture<AsignacionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignacionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
