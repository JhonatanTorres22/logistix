import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecanoAddComponent } from './decano-add.component';

describe('DecanoAddComponent', () => {
  let component: DecanoAddComponent;
  let fixture: ComponentFixture<DecanoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecanoAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecanoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
