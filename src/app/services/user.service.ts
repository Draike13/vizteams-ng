import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUserSubject = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  userUrl = `${this.apiUrl}users`;

  setCurrentUser(user) {
    this.currentUserSubject.next(user);
  }

  public get currentUser() {
    return this.currentUserSubject.value;
  }
}
