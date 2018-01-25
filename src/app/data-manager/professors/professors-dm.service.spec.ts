import { TestBed, inject } from '@angular/core/testing';

import { ProfessorsDmService } from './professors-dm.service';

describe('ProfessorsDmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfessorsDmService]
    });
  });

  it('should be created', inject([ProfessorsDmService], (service: ProfessorsDmService) => {
    expect(service).toBeTruthy();
  }));
});
