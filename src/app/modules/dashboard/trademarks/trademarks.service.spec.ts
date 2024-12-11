import { TestBed } from '@angular/core/testing';

import { TrademarksService } from './trademarks.service';

describe('TrademarksService', () => {
  let service: TrademarksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrademarksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
