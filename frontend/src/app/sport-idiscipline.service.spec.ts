import { TestBed } from '@angular/core/testing';

import { SportIDisciplineService } from './sport-idiscipline.service';

describe('SportIDisciplineService', () => {
  let service: SportIDisciplineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportIDisciplineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
