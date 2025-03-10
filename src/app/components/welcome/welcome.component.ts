import { Component, inject } from '@angular/core';
import { User } from '../../models/user.model';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './welcome.component.html',
  styles: ``,
})
export class WelcomeComponent {
  user: User | null = null;
  showRoleSelection: boolean = false;
  isLoading: boolean = true;
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);

  constructor() {
    onAuthStateChanged(this.auth, async (firebaseUser) => {
      if (firebaseUser) {
        this.user = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || '',
          emailVerified: firebaseUser.emailVerified,
          providerData: firebaseUser.providerData,
        };

        const userRole = await this.authService.getUserRole(firebaseUser.uid);
        this.isLoading = false;
        if (!userRole) {
          this.showRoleSelection = true;
        } else if (userRole === 'owner') {
          this.router.navigate(['/owner-dashboard']);
        } else {
          this.router.navigate(['/walker-dashboard']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  async selectRole(role: 'owner' | 'walker') {
    if (this.user) {
      await this.authService.setUserRole(this.user.uid, role);
      if (role === 'owner') {
        this.router.navigate(['/owner-dashboard']);
      } else {
        this.router.navigate(['/walker-dashboard']);
      }
    }
  }

  onLogout() {
    this.authService.logout();
  }

  getProviderLogo(providerId: string): string {
    switch (providerId) {
      case 'google.com':
        return 'assets/google.svg';
      case 'facebook.com':
        return 'assets/facebook.svg';
      case 'github.com':
        return 'assets/github.svg';
      default:
        return 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    }
  }
}
