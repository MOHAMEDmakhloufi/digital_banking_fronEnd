import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse} from '@angular/common/http';
import { AuthService } from './auth.service';
import {catchError, tap, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.authService.getAccessToken();
    if (accessToken) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      });
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          this.router.navigate(['/login']);
          return throwError(error);
        })

      );
    }
    return next.handle(request).pipe(
      tap(
        (event) => {},
        (error) => {
          this.router.navigate(['/login']);
        }
      )
    );
  }
}
