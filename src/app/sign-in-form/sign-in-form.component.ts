import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  emailControl: FormControl;
  passControl: FormControl;
  hide = true;

  constructor(private userService: UserService) {
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.passControl = new FormControl();
  }

  ngOnInit(): void {
    console.log(this.emailControl.hasError);
  }

  getErrorMessage() {
    if (this.passControl.hasError('required')) {
      return 'This field is required';
    }

    if (this.emailControl.hasError('required')) {
      return 'This field is required';
    }

    return this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }
  login() {
    const email = 'example@example.com';
    const password = 'password123';

    this.userService.login(email, password).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        // Do something with the response, such as storing the JWT token
      },
      (error: any) => {
        console.error('Login error:', error);
        // Handle the error, such as displaying an error message to the user
      }
    );
  }
}
