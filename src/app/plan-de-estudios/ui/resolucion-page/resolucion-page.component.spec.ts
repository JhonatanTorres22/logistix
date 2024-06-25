import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucionPageComponent } from './resolucion-page.component';

describe('ResolucionPageComponent', () => {
  let component: ResolucionPageComponent;
  let fixture: ComponentFixture<ResolucionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolucionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResolucionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
