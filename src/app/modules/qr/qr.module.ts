import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrRoutingModule } from './qr-routing.module';
import { QrComponent } from './qr.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [QrComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FileUploadModule,
    ToggleButtonModule,
    TableModule,
    QrRoutingModule
  ],
})
export class QrModule { }
