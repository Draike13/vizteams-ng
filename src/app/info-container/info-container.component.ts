import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { TeamMember } from '../models/teamMember.model';
import { Team } from '../models/team.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-container',
  templateUrl: './info-container.component.html',
  styleUrls: ['./info-container.component.scss'],
})
export class InfoContainerComponent implements OnInit {
  infoDisplay?: Team;
  selectedMember?: TeamMember;
  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.infoPanel$.subscribe((res) => {
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
        this.databaseService.deleteTeam(team_id).subscribe((res) => {
          this.databaseService.updateTeams();
        });
      }
      this.infoDisplay = undefined;
    });
  }
  clickedMember(member) {
    this.selectedMember = member;
    console.log(this.selectedMember);
  }
  clickedTeam() {
    this.selectedMember = undefined;
    console.log(this.selectedMember);
  }
}
