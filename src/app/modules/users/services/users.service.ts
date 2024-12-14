import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public url = `${environment.UrlApi}users`;

  constructor(
    public http: HttpClient
  ) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${environment.UrlApi}users`).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(() => error);
        })
    );
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(() => error);
        })
    );
  }

  createUser(data: any): Observable<any> {
    return this.http.post<any>(this.url, data).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(() => error);
        })
    );
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, data).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(() => error);
        })
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(() => error);
        })
    );
  }
}
