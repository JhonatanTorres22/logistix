import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAmbienteComponent } from './list-ambiente.component';

describe('ListAmbienteComponent', () => {
  let component: ListAmbienteComponent;
  let fixture: ComponentFixture<ListAmbienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAmbienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
