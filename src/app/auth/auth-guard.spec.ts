import { TestBed } from '@angular/core/testing';
import { Router, Route, UrlSegment } from '@angular/router';
import { authGuard } from './auth-guard';

describe('authGuard', () => {
  let guard: authGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [authGuard,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });
    guard = TestBed.inject(authGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow loading', () => {
    const route = {} as Route;
    const segments: UrlSegment[] = [];
    const result = guard.canLoad(route, segments);
    expect(result).toBeTrue();
  });
});

