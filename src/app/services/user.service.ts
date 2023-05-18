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
