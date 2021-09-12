import { TestBed } from '@angular/core/testing';

import { OsvojeneMedaljeService } from './osvojene-medalje.service';

describe('OsvojeneMedaljeService', () => {
  let service: OsvojeneMedaljeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsvojeneMedaljeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
