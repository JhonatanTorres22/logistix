import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestreAddComponent } from './semestre-add.component';

describe('SemestreAddComponent', () => {
  let component: SemestreAddComponent;
  let fixture: ComponentFixture<SemestreAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemestreAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SemestreAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
