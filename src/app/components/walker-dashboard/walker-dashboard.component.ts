import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-walker-dashboard',
  imports: [],
  templateUrl: './walker-dashboard.component.html',
  styles: ``,
})
export class WalkerDashboardComponent {
  private authService: AuthService = inject(AuthService);

  onLogout() {
    this.authService.logout();
  }
}
