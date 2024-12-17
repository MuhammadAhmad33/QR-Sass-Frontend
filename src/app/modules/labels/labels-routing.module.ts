import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabelsComponent } from './labels.component';

// create resolvable routes


const routes: Routes = [
   { path: ':id', component: LabelsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabelsRoutingModule { }
