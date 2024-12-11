import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrademarksService {
  
  public url = `${environment.UrlApi}trademarks`;

  constructor(
    public http: HttpClient
  ) { }

  getTrademarks() {
    return this.http.get(`${this.url}`);
  }

  getTrademark(id: number) {
    return this.http.get(`${this.url}:${id}`);
  }

  createTrademark(values: any) {
    return this.http.post(`${this.url}/create`, values);
  }

  updateTrademark(id: number, values: any) {
    return this.http.put(`${this.url}:${id}`, values);
  }

  deleteTrademark(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
