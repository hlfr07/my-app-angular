import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { protegerGuard } from './proteger.guard';

describe('protegerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => protegerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
