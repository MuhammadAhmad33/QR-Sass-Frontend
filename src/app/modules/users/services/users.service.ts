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
}
