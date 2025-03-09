import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styles: ``,
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  private authService: AuthService = inject(AuthService);

  onRegister() {
    this.authService.register(this.email, this.password);
  }
}
