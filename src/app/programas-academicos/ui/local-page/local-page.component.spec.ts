import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalPageComponent } from './local-page.component';

describe('LocalPageComponent', () => {
  let component: LocalPageComponent;
  let fixture: ComponentFixture<LocalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
