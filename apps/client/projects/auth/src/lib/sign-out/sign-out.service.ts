import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class SignOutService {
  private authService = inject(AuthService);
  private router = inject(Router);

  async signOut(): Promise<boolean> {
    await this.authService.signOut();
    return await this.navigateToTheSignInPage();
  }

  private navigateToTheSignInPage(): Promise<boolean> {
    return this.router.navigateByUrl('/sign-in');
  }

}
