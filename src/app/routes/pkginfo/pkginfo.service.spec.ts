import { TestBed, inject } from '@angular/core/testing';

import { PkginfoService } from './pkginfo.service';

describe('PkginfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PkginfoService]
    });
  });

  it('should be created', inject([PkginfoService], (service: PkginfoService) => {
    expect(service).toBeTruthy();
  }));
});
