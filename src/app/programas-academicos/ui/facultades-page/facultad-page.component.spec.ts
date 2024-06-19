import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultadesPageComponent } from './facultad-page.component';

describe('FacultadesPageComponent', () => {
  let component: FacultadesPageComponent;
  let fixture: ComponentFixture<FacultadesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultadesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultadesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
