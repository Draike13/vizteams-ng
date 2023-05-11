import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  userUrl = 'http://localhost:3000/users';

  createUser(newUser: any) {
    return this.http.post(this.userUrl, newUser);
  }
}
