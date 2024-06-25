import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CicloPageComponent } from './ciclo-page.component';

describe('CicloPageComponent', () => {
  let component: CicloPageComponent;
  let fixture: ComponentFixture<CicloPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CicloPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CicloPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
