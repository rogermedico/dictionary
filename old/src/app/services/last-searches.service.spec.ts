import { TestBed } from '@angular/core/testing';

import { LastSearchesService } from './last-searches.service';

describe('LastSearchesService', () => {
  let service: LastSearchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastSearchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
