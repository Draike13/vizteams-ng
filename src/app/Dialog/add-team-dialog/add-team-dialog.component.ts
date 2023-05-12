import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-team-dialog',
  templateUrl: './add-team-dialog.component.html',
  styleUrls: ['./add-team-dialog.component.scss']
})
export class AddTeamDialogComponent implements OnInit {
  nameControl: FormControl;
  descControl: FormControl;

  constructor() { 
  this.nameControl = new FormControl()
  this.descControl = new FormControl()
  }

  ngOnInit(): void {
  }

}
