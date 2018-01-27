import { TestBed, inject } from '@angular/core/testing';

import { CoursesDmService } from './courses-dm.service';

describe('CoursesDmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesDmService]
    });
  });

  it('should be created', inject([CoursesDmService], (service: CoursesDmService) => {
    expect(service).toBeTruthy();
  }));
});
