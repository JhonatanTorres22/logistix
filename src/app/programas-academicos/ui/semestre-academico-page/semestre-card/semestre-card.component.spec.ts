import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestreCardComponent } from './semestre-card.component';

describe('SemestreCardComponent', () => {
  let component: SemestreCardComponent;
  let fixture: ComponentFixture<SemestreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemestreCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SemestreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
