import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamMember } from '../models/teamMember.model';
import { AddMemberDialogComponent } from '../Dialog/add-member-dialog/add-member-dialog.component';
import { AddTeamDialogComponent } from '../Dialog/add-team-dialog/add-team-dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from '../models/team.model';
import { DatabaseService } from '../services/database.service';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.scss'],
})
export class TeamlistComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  teamsList: Team[] = [];
  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog
  ) {}

  addMember(teamsList: Team[], selectedTeam: Team) {
    this.dialog.open(AddMemberDialogComponent, {
      minHeight: '20vh',
      minWidth: '30vw',
      data: { teamsList, selectedTeam },
    });
  }
  addTeam() {
    this.dialog.open(AddTeamDialogComponent, {
      minHeight: '30vh',
      minWidth: '40vw',
    });
  }
  displayTeam(team: Team) {
    this.databaseService.infoPanel$.next(team);
  }

  ngOnInit(): void {
    this.databaseService.teamList$.subscribe((value) => {
      this.teamsList = value;
    });
    this.databaseService.updateTeams();
  }
}
