import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  userUrl = `${this.apiUrl}users`;

  userUrl = 'http://localhost:3000/users';

  createUser(newUser: any) {
    return this.http.post(this.userUrl, newUser);
  }

  public get currentUser() {
    return this.currentUserSubject.value;
  }
}
