import { TestBed } from '@angular/core/testing';

import { SalonServiceService } from './salon-service.service';

describe('SalonServiceService', () => {
  let service: SalonServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
