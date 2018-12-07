import { TestBed, inject } from '@angular/core/testing';

import { CreateappformService } from './createappform.service';

describe('CreateappformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateappformService]
    });
  });

  it('should be created', inject([CreateappformService], (service: CreateappformService) => {
    expect(service).toBeTruthy();
  }));
});
