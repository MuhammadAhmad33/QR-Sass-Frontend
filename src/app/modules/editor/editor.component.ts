import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from './services/brand.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {

  public brandId: string | null = null;
  public labels: any = [];

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

}
