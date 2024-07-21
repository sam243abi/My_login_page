import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email: string='';
  username: string='';
  password: string='';

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    this.authService.register({ email: this.email, username: this.username, password: this.password }).subscribe(() => {
      this.router.navigate(['/login']);
    }, (error) => {
      alert(error.error.message || 'Registration failed');
    });
  }
}
