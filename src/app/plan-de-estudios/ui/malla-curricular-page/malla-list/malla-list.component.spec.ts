import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MallaListComponent } from './malla-list.component';

describe('MallaListComponent', () => {
  let component: MallaListComponent;
  let fixture: ComponentFixture<MallaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MallaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MallaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
