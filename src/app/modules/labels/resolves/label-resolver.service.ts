import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UrlService } from '../../url/service/url.service';

@Injectable({
  providedIn: 'root'
})
export class LabelResolver implements Resolve<any> {
  constructor(private urlService: UrlService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.urlService.getUrl(id);
  }
}