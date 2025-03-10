import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-owner-dashboard',
  imports: [],
  templateUrl: './owner-dashboard.component.html',
  styles: ``,
})
export class OwnerDashboardComponent {
  private authService: AuthService = inject(AuthService);

  onLogout() {
    this.authService.logout();
  }
}
