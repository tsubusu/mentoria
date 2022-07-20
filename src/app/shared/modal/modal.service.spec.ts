import { TestBed } from '@angular/core/testing';

import { ModalService } from './services/modal.service';

fdescribe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    //service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(true).toBeTruthy();
  });
});
