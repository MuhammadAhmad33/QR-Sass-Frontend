import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from './services/brand.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {

  public brandId: string | null = null;
  public labels: any = [];
  visibleDialogUrl: boolean = false;
  urlQr: string = '';
  public qrCodeDownloadLink: SafeUrl = "";

  constructor(private route: ActivatedRoute, private router: Router, private brandService: BrandService) {
    this.brandId = this.route.snapshot.paramMap.get('brandId');
  }

  ngOnInit() {
    this.brandService.getBrands(this.brandId).subscribe(
      (response) => {
        this.labels = response;
        console.log(this.labels);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  viewBrand() {}

  editLabel() {}

  deleteLabel() {}

  getColspan() {
    return (this.labels.length > 0) ? 4 : 4;
  }

  createLabel() {
    this.router.navigate(['editor//brand/' + this.brandId + '/labels/create']);
  }

  showDialogQr(tinyUrl) {
    this.visibleDialogUrl = true;
    this.urlQr = 'https://qr-sass-frontend.vercel.app/label/' + tinyUrl['_id'];
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

}
