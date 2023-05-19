import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../Dialog/sign-up-in-dialog/sign-up.component';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  emailControl: FormControl;
  passControl: FormControl;
  hide = true;
  passConfirmControl: FormControl;
  hideConfirm = true;
  inOrUp: boolean = true;
  newUser;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: Router,
    public dialog: MatDialog
  ) {
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.passControl = new FormControl();
    this.passConfirmControl = new FormControl();
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

  onSubmit() {
    const user = {
      email: this.emailControl.value,
      password: this.passControl.value,
    };
    this.setToken(user);
  }

  setToken(user) {
    this.authService.login(user).subscribe((res: any) => {
      if (res.payload.token != null) {
        this.userService.setCurrentUser(res.payload.email);
        this.authService.setToken(res.payload.token);
        console.log('LOGGED IN: ', this.userService.currentUser);
      }
    });
  }

  loggle() {
    this.inOrUp = !this.inOrUp;
  }

  createUser() {
    let newUser: any = {
      email: this.emailControl.value,
      password: this.passControl.value,
      password_confirmation: this.passConfirmControl.value,
    };
    this.authService.createUser(newUser).subscribe((res) => {
      this.setToken(newUser);
    });
  }

  ngOnInit(): void {}
}
