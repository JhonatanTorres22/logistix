import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionesAddComponent } from './secciones-add.component';

describe('SeccionesAddComponent', () => {
  let component: SeccionesAddComponent;
  let fixture: ComponentFixture<SeccionesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionesAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeccionesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
