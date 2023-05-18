import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamMember } from '../models/teamMember.model';
import { AddMemberDialogComponent } from '../Dialog/add-member-dialog/add-member-dialog.component';
import { AddTeamDialogComponent } from '../Dialog/add-team-dialog/add-team-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Team } from '../models/team.model';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.scss'],
})
export class TeamlistComponent implements OnInit {
  toggle: boolean = false;
  teamMembers: TeamMember[] = [];
  teamsList: Team[] = [];
  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog
  ) {}

  togglePanel() {
    this.toggle = !this.toggle;
    console.log(this.toggle);
  }

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
