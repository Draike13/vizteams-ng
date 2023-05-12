import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  userUrl = 'http://localhost:3000/users';

  createUser(newUser: any) {
    return this.http.post(this.userUrl, newUser);
  }

  login(email: string, password: string): Observable<any> {
    const loginData = {
      email: email,
      password: password,
    };

    return this.http.post<any>('/api/login', loginData);
  }

  logout() {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');

    // Update UI
    this.updateUseroremail();
  }

  isLoggedIn() {
    // Check if token is present in local storage
    return !!localStorage.getItem('jwtToken');
  }

  updateUseroremail() {
    const button = document.querySelector('button');

    // if (this.isLoggedIn()) {
    //   // Change text of button
    //   this.Useroremail.textContent = {{email}};
    // }
  }
}

