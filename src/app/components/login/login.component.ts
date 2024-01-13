import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginId: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const loginRequest = { loginId: this.loginId, password: this.password };

    this.authService.login(loginRequest).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        this.authService.setUserData(response.user);

        const userType = response.user.type;

        if (userType === 'ENGINEER') {
          this.router.navigate(['/dashboard']);
        } else if (userType === 'MANAGER') {
          this.router.navigate(['/manager-dashboard']);
        } else {
          console.error('Invalid user type:', userType);
          this.errorMessage = 'Invalid user type. Please try again.';
        }
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }
}
