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

  login() {
    const loginData = {
      email: 'user@example.com',
      password: 'password',
    };

    this.http.post<any>('/api/login', loginData).subscribe((response) => {
      // Store token in local storage
      localStorage.setItem('jwtToken', response.token);

      // Update UI
      this.updateUseroremail();
    });
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

  //   if (this.isLoggedIn()) {
  //     // Change text of button
  //     this.Useroremail.textContent = {{email}};
  //   }
  }
}
