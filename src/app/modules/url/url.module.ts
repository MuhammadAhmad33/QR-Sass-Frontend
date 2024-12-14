import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrlRoutingModule } from './url-routing.module';
import { UrlComponent } from './url.component';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [UrlComponent],
  imports: [
    CommonModule,
    FormsModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    TagModule,
    UrlRoutingModule
  ]
})
export class UrlModule { }
