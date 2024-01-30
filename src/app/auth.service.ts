import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userDetails: any;

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post('http://localhost:8000/auth/login', credentials).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMsg = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
        }
        return throwError(errorMsg);
      })
    );
  }

  setUserDetails(user: any) {
    this.userDetails = user;
  }

  getUserDetails() {
    return this.userDetails;
  }
}
