import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucionAddComponent } from './resolucion-add.component';

describe('ResolucionAddComponent', () => {
  let component: ResolucionAddComponent;
  let fixture: ComponentFixture<ResolucionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolucionAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResolucionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
