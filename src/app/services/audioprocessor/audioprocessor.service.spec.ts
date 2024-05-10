import { TestBed } from '@angular/core/testing';

import { AudioprocessorService } from './audioprocessor.service';

describe('AudioprocessorService', () => {
  let service: AudioprocessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioprocessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
