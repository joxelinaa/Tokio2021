import { TestBed } from '@angular/core/testing';

import { DosadasnjiRekordiService } from './dosadasnji-rekordi.service';

describe('DosadasnjiRekordiService', () => {
  let service: DosadasnjiRekordiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DosadasnjiRekordiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
