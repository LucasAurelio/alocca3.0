import { TestBed, inject } from '@angular/core/testing';

import { SemestersDmService } from './semesters-dm.service';

describe('SemestersDmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SemestersDmService]
    });
  });

  it('should be created', inject([SemestersDmService], (service: SemestersDmService) => {
    expect(service).toBeTruthy();
  }));
});
