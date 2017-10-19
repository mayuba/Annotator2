import { TestBed, inject } from '@angular/core/testing';

import { AnnotateurService } from './annotateur.service';

describe('AnnotateurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnotateurService]
    });
  });

  it('should be created', inject([AnnotateurService], (service: AnnotateurService) => {
    expect(service).toBeTruthy();
  }));
});
