import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestreListComponent } from './semestre-list.component';

describe('SemestreListComponent', () => {
  let component: SemestreListComponent;
  let fixture: ComponentFixture<SemestreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemestreListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SemestreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
