import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RAPID_API } from '../constants/rapid-api.constant';

@Injectable()
export class RapidApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const rapidApiRequest = request.clone({
      setHeaders: {
        'x-rapidapi-key': RAPID_API.key,
        'x-rapid-api-host': RAPID_API.host
      }
    });

    return next.handle(rapidApiRequest);
  }
}
