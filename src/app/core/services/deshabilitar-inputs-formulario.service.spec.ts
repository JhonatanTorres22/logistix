import { TestBed } from '@angular/core/testing';

import { DeshabilitarInputsFormularioService } from './deshabilitar-inputs-formulario.service';

describe('DeshabilitarInputsFormularioService', () => {
  let service: DeshabilitarInputsFormularioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeshabilitarInputsFormularioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
