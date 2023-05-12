import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpInDialogComponent } from '../Dialog/sign-up-in-dialog/sign-up-in-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: any;

  constructor(public dialog: MatDialog) {}

  signUpIn() {
    this.dialog.open(SignUpInDialogComponent, {
      minHeight: '30vh',
      minWidth: '25vw',
    });
  }
  ngOnInit(): void {}

  showProfile (){}
}
