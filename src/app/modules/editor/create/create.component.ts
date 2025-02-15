import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { BrandService } from '../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  labelForm: FormGroup;
  public brandId: string | null = null;

  constructor(private fb: FormBuilder, private brandService: BrandService,private route: ActivatedRoute, private router: Router) {
    // get brandId from url
    this.brandId = this.route.snapshot.paramMap.get('brandId');

    this.labelForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      brand: [this.brandId],
      nutritionDeclaration: this.fb.array([
        this.fb.group({
          name: ['Valor energético kJ'],
          value: ['', Validators.required]
        }),
        this.fb.group({
          name: ['Valor energético kcal'],
          value: ['', Validators.required]
        }),
        this.fb.group({
          name: ['Grasas'],
          value: ['', Validators.required]
        }),
        this.fb.group({
          name: ['de las cuales saturadas'],
          value: ['', Validators.required]
        }),
        this.fb.group({
          name: ['Hidratos de carbono'],
          value: ['', Validators.required]
        }),
        this.fb.group({
          name: ['de los cuales azucares'],
          value: ['', Validators.required]
        }),
        this.fb.group({
          name: ['Protenías'],
          value: ['', Validators.required]
        }),
        this.fb.group({
          name: ['Sal'],
          value: ['', Validators.required]
        }),
      ])
    });
  }

  get nutritionDeclaration() {
    return this.labelForm.get('nutritionDeclaration') as FormArray;
  }

  submitForm() {
    console.log(this.labelForm.value);

    // check if form is valid
    if (this.labelForm.invalid) {
      return;
    }

    this.brandService.createLabel(this.labelForm.value).subscribe(
      (response) => {
        console.log('Label created successfully', response);
        this.router.navigate(['/editor/brand/' + this.brandId + '/labels']);
      },
      (error) => {
        console.error('Error creating label', error);
      }
    );
  }
}