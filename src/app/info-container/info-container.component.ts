import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { TeamMember } from '../models/teamMember.model';
import { Team } from '../models/team.model';
import Swal from 'sweetalert2';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-info-container',
  templateUrl: './info-container.component.html',
  styleUrls: ['./info-container.component.scss'],
})
export class InfoContainerComponent implements OnInit {
  infoDisplay?: Team;
  selectedMember?: TeamMember;
  constructor(
    private databaseService: DatabaseService,
    private infoService: InfoService
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
      console.log('TEAM TO DELTE', team_id);
      if (result.isConfirmed === true) {
        this.databaseService.deleteTeam(team_id).subscribe(() => {
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
}
