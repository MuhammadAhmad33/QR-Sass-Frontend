import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor.component';

const routes: Routes = [
  {
    path: 'brand/:brandId/labels',
    component: EditorComponent
  },
  { path: 'brand/:brandId/labels/create', loadChildren: () => import('./create/create.module').then(m => m.CreateModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
