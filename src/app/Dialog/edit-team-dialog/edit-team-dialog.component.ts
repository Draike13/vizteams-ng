import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-team-dialog',
  templateUrl: './edit-team-dialog.component.html',
  styleUrls: ['./edit-team-dialog.component.scss'],
})
export class EditTeamDialogComponent implements OnInit {
  nameControl: FormControl;
  descControl: FormControl;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private databaseService: DatabaseService
  ) {
    console.log(this.data);
    this.nameControl = new FormControl(this.data.name, Validators.required);
    this.descControl = new FormControl(
      this.data.description,
      Validators.required
    );
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

  editTeam() {
    let team: any = {
      name: this.nameControl.value,
      description: this.descControl.value,
    };
    let team_id: number = this.data.id;
    this.databaseService.editTeam(team, team_id).subscribe(() => {
      this.databaseService.updateTeams();
    });
  }

  ngOnInit(): void {}
}
