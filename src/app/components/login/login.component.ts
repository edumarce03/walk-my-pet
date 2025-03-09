import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  private authService: AuthService = inject(AuthService);

  constructor() {}

  onLogin() {
    this.authService.login(this.email, this.password);
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
