import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { TeamMember } from '../models/teamMember.model';
import { Token } from '@angular/compiler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private route: Router,
    private userService: UserService
  ) {}

  login(user) {
    return this.http.post(`${this.apiUrl}auth/login`, user);
  }

  autoSignIn() {
    // get token from browser
    const token = this.getToken();
    if (!token) {
      return;
    }
    this.http
      .get(`${this.apiUrl}users`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .subscribe((res: any) => {
        console.log('PAYLOAD', res);
        if (res.email != null) {
          this.userService.setCurrentUser(res.email);
        }
      });
  }

  createUser(newUser) {
    return this.http.post(`${this.apiUrl}users`, newUser)
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }

  setToken(token: any) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  logout() {
    const token = this.getToken();
    this.http
      .delete('http://localhost:3000/users/logout', {
        headers: {
          Authorization: 'Bearer ' + token.value,
        },
      })
      .subscribe((res: any) => {
        if (res.success) {
          this.removeToken();
          this.userService.setCurrentUser(null);
        }
      });
  }
}
