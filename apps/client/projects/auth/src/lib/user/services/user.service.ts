import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private storage = inject(Storage);

  async setUser(user: User): Promise<void> {
    await this.storage.set('user', user);
  }

  getUser(): Observable<User> {
    return from(this.storage.get('user'));
  }

}
