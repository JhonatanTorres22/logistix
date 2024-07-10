import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaCardComponent } from './programa-card.component';

describe('ProgramaCardComponent', () => {
  let component: ProgramaCardComponent;
  let fixture: ComponentFixture<ProgramaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramaCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
