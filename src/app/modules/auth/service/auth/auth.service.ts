import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = `${environment.UrlApi}auth/`;

  constructor(
    public http: HttpClient
  ) { }

  register(values: any) {
    return this.http.post(`${this.url}register`, values);
  }

  login(values: any) {
    return this.http.post(`${this.url}login`, values);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
