import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { valiloginGuard } from './valilogin.guard';

describe('valiloginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => valiloginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
