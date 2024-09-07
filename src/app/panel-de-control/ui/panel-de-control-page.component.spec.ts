import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDeControlPageComponent } from './panel-de-control-page.component';

describe('PanelDeControlPageComponent', () => {
  let component: PanelDeControlPageComponent;
  let fixture: ComponentFixture<PanelDeControlPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDeControlPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelDeControlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
