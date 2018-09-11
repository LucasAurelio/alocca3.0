import { TestBed, inject } from '@angular/core/testing';

import { AlertsDmService } from './alerts-dm.service';

describe('AlertsDmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertsDmService]
    });
  });

  it('should be created', inject([AlertsDmService], (service: AlertsDmService) => {
    expect(service).toBeTruthy();
  }));
});
