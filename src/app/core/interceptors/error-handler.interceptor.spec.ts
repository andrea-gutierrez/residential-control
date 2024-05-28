import {TestBed} from '@angular/core/testing';
import {HTTP_INTERCEPTORS, HttpClient, HttpInterceptorFn} from '@angular/common/http';

import {ErrorHandlerInterceptor} from './error-handler-interceptor.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('errorHandlerInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ErrorHandlerInterceptor,
        {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true},
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add auth headers ', () => {
    //arrange
    const url = '/mockendpoint';

    //act
    httpClient.get(url).subscribe();

    // assert
    const req = httpTestingController.expectOne(url);
    expect(req.request.headers.get('Authorization')).toEqual(
      'Bearer [the token]'
    );
  });
});
