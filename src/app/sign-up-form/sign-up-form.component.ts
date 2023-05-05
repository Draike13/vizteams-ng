import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {
  emailControl: FormControl;
  passControl: FormControl;
  passConfirmControl: FormControl;
  hide = true;
  hideConfirm = true;

  constructor(private dialogService: DialogService) {
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.passControl = new FormControl();
    this.passConfirmControl = new FormControl();
  }

  ngOnInit(): void {
    console.log(this.emailControl.hasError);
  }

  getErrorMessage() {
    if (this.passControl.hasError('required')) {
      return 'This field is required';
    }
    if (this.passConfirmControl.hasError('required')) {
      return 'This field is required';
    }

    if (this.emailControl.hasError('required')) {
      return 'This field is required';
    }

    return this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }
}
