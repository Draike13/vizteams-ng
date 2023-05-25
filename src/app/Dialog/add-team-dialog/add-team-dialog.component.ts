import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-team-dialog',
  templateUrl: './add-team-dialog.component.html',
  styleUrls: ['./add-team-dialog.component.scss'],
})
export class AddTeamDialogComponent implements OnInit {
  nameControl: FormControl;
  descControl: FormControl;

  constructor(private databaseService: DatabaseService) {
    this.nameControl = new FormControl('', Validators.required);
    this.descControl = new FormControl('', Validators.required);
  }
  getNameErrorMessage() {
    if (this.nameControl.hasError('required')) {
      return 'Team name required';
    }
    return ''; // Default return value when the condition is false
  }
  getDescErrorMessage() {
    if (this.descControl.hasError('required')) {
      return 'Please describe the team';
    }
    return ''; // Default return value when the condition is false
  }

  ngOnInit(): void {}

  createTeam() {
    let newTeam: any = {
      name: this.nameControl.value,
      description: this.descControl.value,
    };
    this.databaseService.createTeam(newTeam).subscribe(() => {
      this.databaseService.updateTeams();
    });
  }
}
