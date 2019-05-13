import { TestBed } from '@angular/core/testing';

import { ContactStoreService } from './contact-store.service';

describe('ContactStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactStoreService = TestBed.get(ContactStoreService);
    expect(service).toBeTruthy();
  });
});
