import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { ToggleButtonChangeEvent } from 'primeng/togglebutton';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.scss'
})
export class QrComponent {
  myForm: FormGroup;
  submittedData: any = null;
  imageUrl: string | ArrayBuffer | null = null;
  showLogo = true;

  products!: Product[];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.myForm = this.fb.group({
      name: [''],
      age: ['', [Validators.required, Validators.min(0)]],
      logo: [true]
    });
  }

  ngOnInit() {
    this.myForm.valueChanges.subscribe(value => {
      this.submittedData = value;
    });

    this.productService.getProductsSmall().then((data) => {
      this.products = data;
    });
  }

  uploadedFiles: any[] = [];

  onUpload(event:UploadEvent) {
    console.log(event['files']);
  }

  onSelect(event: any) {
    console.log(event);
    const file = event.currentFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result;
      console.log(this.imageUrl);
    };
  }

  onChangeLogo(event: ToggleButtonChangeEvent) {
    this.myForm.patchValue({ logo: event.checked ? true : false });
    this.showLogo = event.checked;
  }

}