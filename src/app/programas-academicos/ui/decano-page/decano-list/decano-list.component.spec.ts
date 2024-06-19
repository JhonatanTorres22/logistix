import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecanoListComponent } from './decano-list.component';

describe('DecanoListComponent', () => {
  let component: DecanoListComponent;
  let fixture: ComponentFixture<DecanoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecanoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecanoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
