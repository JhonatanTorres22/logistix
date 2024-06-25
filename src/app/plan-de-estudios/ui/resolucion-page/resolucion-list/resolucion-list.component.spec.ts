import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucionListComponent } from './resolucion-list.component';

describe('ResolucionListComponent', () => {
  let component: ResolucionListComponent;
  let fixture: ComponentFixture<ResolucionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolucionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResolucionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
