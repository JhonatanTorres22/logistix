import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultadListComponent } from './facultad-list.component';

describe('FacultadListComponent', () => {
  let component: FacultadListComponent;
  let fixture: ComponentFixture<FacultadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultadListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
