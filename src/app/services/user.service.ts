import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUserSubject = new BehaviorSubject<any>(null);

  constructor() {}

  setCurrentUser(user) {
    this.currentUserSubject.next(user);
  }

  public get currentUser() {
    return this.currentUserSubject.value;
  }
}
