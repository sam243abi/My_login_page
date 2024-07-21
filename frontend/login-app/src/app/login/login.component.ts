import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string='';
  password: string='';
  passwordFieldType: string ='password';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login({ username: this.username, password: this.password }).subscribe((response: any) => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/home']);
    }, (error) => {
      alert('Login failed');
    });
  }
  togglePasswordVisiblity(): void{
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
