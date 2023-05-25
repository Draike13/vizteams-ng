import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { TeamMember } from '../models/teamMember.model';
import { Team } from '../models/team.model';
import Swal from 'sweetalert2';
import { InfoService } from '../services/info.service';
import { MatDialog } from '@angular/material/dialog';

import { EditTeamDialogComponent } from '../Dialog/edit-team-dialog/edit-team-dialog.component';
import { EditMemberDialogComponent } from '../Dialog/edit-member-dialog/edit-member-dialog.component';

@Component({
  selector: 'app-info-container',
  templateUrl: './info-container.component.html',
  styleUrls: ['./info-container.component.scss'],
})
export class InfoContainerComponent implements OnInit {
  infoDisplay?: Team;
  selectedMember?: TeamMember;
  opened: boolean;
  constructor(
    private databaseService: DatabaseService,
    private infoService: InfoService,
    public dialog: MatDialog
  ) {
    this.infoService.infoDisplay$.subscribe((res) => {
      this.infoDisplay = res;
    });
    this.infoService.selectedMember$.subscribe((res) => {
      this.selectedMember = res;
    });
  }

  ngOnInit(): void {
    this.infoService.infoDisplay$.subscribe((res) => {
      this.infoDisplay = res;
    });
  }

  deleteTeam(team_id) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to remove this Team?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.isConfirmed === true) {
        this.databaseService.deleteTeam(team_id).subscribe(() => {
          this.databaseService.updateTeams();
        });
      }
      this.infoService.infoDisplay$.next(undefined);
    });
  }

  deleteMember(member) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to remove this Member?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.isConfirmed === true) {
        this.databaseService.deleteMember(member).subscribe(() => {
          this.databaseService.updateTeams();
        });
      }
      this.infoService.infoDisplay$.next(undefined);
    });
  }

  clickedMember(member) {
    this.infoService.selectedMember$.next(member);
  }
  clickedTeam() {
    this.infoService.selectedMember$.next(undefined);
  }
  editTeam(team) {
    this.dialog.open(EditTeamDialogComponent, {
      data: team,
      minHeight: '30vh',
      minWidth: '40vw',
    });

    this.reset();
  }
  editMember(member: TeamMember, team: Team) {
    this.dialog.open(EditMemberDialogComponent, {
      data: [member, team],
      minHeight: '20vh',
      minWidth: '30vw',
    });
    this.reset();
  }
  reset() {
    this.infoService.selectedMember$.next(undefined);
    this.infoService.infoDisplay$.next(undefined);
  }
}
