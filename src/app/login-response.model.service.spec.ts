import { TestBed } from '@angular/core/testing';

import { LoginResponseModelService } from './login-response.model.service';

describe('LoginResponseModelService', () => {
  let service: LoginResponseModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginResponseModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
