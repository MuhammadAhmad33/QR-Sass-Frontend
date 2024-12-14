import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  public url = `${environment.UrlApi}url`;

  constructor(
    public http: HttpClient
  ) { }

  getUrls(): Observable<any> {
    return this.http.get<any>(`${environment.UrlApi}url`).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(() => error);
        })
    );
  }

  getUrl(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(() => error);
        })
    );
  }

  createUrl(data: any): Observable<any> {
    return this.http.post<any>(this.url, data).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(() => error);
        })
    );
  }

  updateUrl(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, data).pipe(
        map(res => {
            return res;
        }),
        catchError(error => {
            return throwError(() => error);
        })
    );
  }

  deleteUrl(id: string): Observable<any> {
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
