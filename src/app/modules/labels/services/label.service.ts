import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  public url = `${environment.UrlApi}labels`;

    constructor(
      public http: HttpClient
    ) { }

    getLabels() {
      return this.http.get(`${this.url}`);
    }

    getLabel(id: string) {
      return this.http.get(`${this.url}/${id}`);
    }

    createLabel(values: any) {
      return this.http.post(`${this.url}/create`, values);
    }

    updateLabel(id: string, values: any) {
      return this.http.put(`${this.url}/${id}`, values);
    }

    deleteLabel(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
}
