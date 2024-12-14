import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlComponent } from './url.component';

const routes: Routes = [
  { path: '', component: UrlComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UrlRoutingModule { }
