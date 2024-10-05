import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MallaImportComponent } from './malla-import.component';

describe('MallaImportComponent', () => {
  let component: MallaImportComponent;
  let fixture: ComponentFixture<MallaImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MallaImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MallaImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
