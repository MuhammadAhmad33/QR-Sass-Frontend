import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    email!: string;

    constructor(public layoutService: LayoutService, public authService: AuthService, public router: Router, ) { }

    login() {
        this.authService.login({ email: this.email, password: this.password }).subscribe(
            response => {
                if (response) {
                    console.log('LoginComponent: onSubmit: response', response);
                    localStorage.setItem('token', response['accessToken']);
                    this.router.navigate(['/dashboard']);
                };
            },
            error => {
                console.log('LoginComponent: onSubmit: error', error);
            }
        );
    }
}
