import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../service/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      companyWebsite: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      this.authService.register(formValues).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
