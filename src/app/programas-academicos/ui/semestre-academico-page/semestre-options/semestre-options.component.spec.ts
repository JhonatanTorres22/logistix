import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestreOptionsComponent } from './semestre-options.component';

describe('SemestreOptionsComponent', () => {
  let component: SemestreOptionsComponent;
  let fixture: ComponentFixture<SemestreOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemestreOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SemestreOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
