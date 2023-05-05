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
  hide = true;

  constructor(private dialogService: DialogService) {
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
      return 'You must enter a value';
    }

    if (this.emailControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }
}
