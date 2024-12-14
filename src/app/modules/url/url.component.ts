import { Component, ElementRef, ViewChild } from '@angular/core';
import { UrlService } from './service/url.service';
import { Table } from 'primeng/table';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrl: './url.component.scss'
})
export class UrlComponent {

  urls: any;

  fullUrl: string = '';
  tinyUrl: string = '';
  id: string = '';

  visible: boolean = false;
  visibleDialogUrl: boolean = false;
  urlQr: string = '';

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private urlService: UrlService
  ) { }

  ngOnInit() {
    /* this.urlService.createUrl({ fullUrl: 'https://www.google.com', tinyUrl: 'https://www.localhost/labels/6534645' }).subscribe((data: any) => {
      console.log(data);
    }); */

    this.getUrls();
  }

  getUrls() {
    this.urlService.getUrls().subscribe((data: any) => {
         this.urls = data;
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

  getColspan() {
    return 4;
  }

  createUrl() {
    if(!this.id) {
      if(this.fullUrl) {
        this.urlService.createUrl({fullUrl: this.fullUrl, tinyUrl: this.tinyUrl}).subscribe((data: any) => {
            this.clearForm();
        });
      }
    } else {
      this.urlService.updateUrl(this.id, {fullUrl: this.fullUrl, tinyUrl: this.tinyUrl}).subscribe((data: any) => {
          this.clearForm();
      });
    }
  }

  clearForm() {
    this.getUrls();
    this.visible = false;
    this.fullUrl = '';
    this.tinyUrl = '';
  }

  editUrl(id: any) {
    this.urlService.getUrl(id).subscribe((url: any) => {
        this.visible = true;
        this.fullUrl = url.fullUrl;
        this.tinyUrl = url.tinyUrl;
        this.id = url._id;
    });
  }

  showCreateUrlDialog() {
    this.visible = true;
  }

  deleteUrl(id: any) {
    this.urlService.deleteUrl(id).subscribe((data: any) => {
        this.getUrls();
    });
  }

  showDialogQr(tinyUrl) {
    this.visibleDialogUrl = true;
    this.urlQr = tinyUrl;
  }

  downloadQr() {
    console.log(this.urlQr);
    this.downloadURI(this.urlQr, 'qr-code.png');
  }

  downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href
    link.click();
  }
}
