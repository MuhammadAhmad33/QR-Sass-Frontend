import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  public url = `${environment.UrlApi}labels/`;

  constructor(
    public http: HttpClient
  ) { }

  getBrands(brandId: string) {
    return this.http.get(`${this.url}brand/${brandId}`);
  }

  createLabel(label: any) {
    return this.http.post(`${this.url}`, label);
  }
}
