import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpInDialogComponent } from '../Dialog/sign-up-in-dialog/sign-up-in-dialog.component';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  signUpIn() {
    this.dialog.open(SignUpInDialogComponent, {
      minHeight: '30vh',
      minWidth: '25vw',
    });
  }

  ngOnInit(): void {
    this.authService.autoSignIn();
    this.userService.currentUserSubject.subscribe((user) => {
      this.currentUser = user;
    });
  }

  showProfile() {}

  logout() {
    this.authService.signOut();
  }
}
