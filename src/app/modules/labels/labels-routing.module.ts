import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabelsComponent } from './labels.component';
import { LabelResolver } from './resolves/label-resolver.service';

const routes: Routes = [
  { path: ':id', component: LabelsComponent, resolve: { label: LabelResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabelsRoutingModule { }