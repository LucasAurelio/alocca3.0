import { TestBed, inject } from '@angular/core/testing';

import { ProfRestrictionDmService } from './prof-restriction-dm.service';

describe('ProfRestrictionDmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfRestrictionDmService]
    });
  });

  it('should be created', inject([ProfRestrictionDmService], (service: ProfRestrictionDmService) => {
    expect(service).toBeTruthy();
  }));
});
