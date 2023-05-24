import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
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
    this.nameControl = new FormControl();
    this.descControl = new FormControl();
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

  // editTeam(selectedTeam) {

  // }

  ngOnInit(): void {
    this.nameControl.setValue(this.data.name);
    this.descControl.setValue(this.data.description);
  }
}
