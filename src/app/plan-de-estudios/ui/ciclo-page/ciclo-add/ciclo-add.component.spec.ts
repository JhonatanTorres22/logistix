import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CicloAddComponent } from './ciclo-add.component';

describe('CicloAddComponent', () => {
  let component: CicloAddComponent;
  let fixture: ComponentFixture<CicloAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CicloAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CicloAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
