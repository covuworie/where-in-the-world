import { TestBed } from '@angular/core/testing';

import { CountryDetailResolverService } from './country-detail-resolver.service';

describe('CountryDetailResolverService', () => {
  let service: CountryDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
