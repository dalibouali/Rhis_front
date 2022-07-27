import { TestBed } from '@angular/core/testing';

import { PrevilegeService } from './previlege.service';

describe('PrevilegeService', () => {
  let service: PrevilegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrevilegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
