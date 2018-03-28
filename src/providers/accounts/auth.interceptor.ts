/**
 * Interceptor to go send auth JWT Token on every request (except at login)
 */

import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AuthInteceptor implements HttpInterceptor {
  constructor() {
    console.log('Hello UsersProvider Provider')
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.indexOf('login') !== -1 ||
      req.url.indexOf('signin') !== -1 ||
      req.url.indexOf('username') !== -1
    ) {
      // console.log('--- sin')
      return next.handle(req)
    } else {
      const token = localStorage.getItem('auth-token')
      const authReq = req.clone({
        headers: req.headers.append('Authorization', token)
      })
      return next.handle(authReq)
    }
  }
}
