import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = `${environment.UrlApi}auth`;

  constructor(
    public http: HttpClient
  ) { }

  register(values: any) {
    return this.http.post(`${this.url}/register`, values);
  }

  registerCompany(values:any): Observable<any> {
    return this.http.post<any>(`${environment.UrlApi}companies/create`, values).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(() => error);
        })
    );
  }

  addUserToCompany(values:any): Observable<any> {
    return this.http.post<any>(`${environment.UrlApi}users/create`, values).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(() => error);
        })
    );
  }

  login(values: any) {
    return this.http.post(`${this.url}/login`, values);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  comapanies(): Observable<any> {
    return this.http.get<any>(`${environment.UrlApi}companies/6759c4717d20b5feef750f33/users`).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(() => error);
        })
    );
  }
}
