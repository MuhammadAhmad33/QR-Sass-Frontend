import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../service/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    public layoutService: LayoutService, 
    public router: Router, 
    public authService: AuthService, 
    private fb: FormBuilder
  ) { 
    this.registerForm = this.fb.group({
      companyName: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      companyWebsite: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      this.authService.registerCompany({ companyName: formValues.companyName, companyWebsite: formValues.companyWebsite}).subscribe(
        response => {
          if (response) {
            this.authService.addUserToCompany({ email: formValues.email, password: formValues.password, name: formValues.name, company: response['_id'] }).subscribe(
              response => {
                if (response) {
                  this.router.navigate(['/']);
                } else {
                  console.error('Error en el registro:', response);
                }
              },
              error => {
                console.error('Error en la solicitud:', error);
              }
            );
          } else {
            console.error('Error en el registro:', response);
          }
        },
        error => {
          console.error('Error en la solicitud:', error);
        }
      );
    }
  }
}
