import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../models/teamMember.model';
import { AddMemberDialogComponent } from '../Dialog/add-member-dialog/add-member-dialog.component';
import { AddTeamDialogComponent } from '../Dialog/add-team-dialog/add-team-dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from '../models/team.model';

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.scss'],
})
export class TeamlistComponent implements OnInit {
  teamMembers: TeamMember[] = [
    {
      name: 'Member1',
      title: 'MemberTitle',
      coverImagePath: '',
      id: '1',
    },
    {
      name: 'Member2',
      title: 'MemberTitle',
      coverImagePath: 'https://picsum.photos/200',
      id: '2',
    },
    {
      name: 'Member3',
      title: 'MemberTitle',
      coverImagePath: '',
      id: '3',
    },
    {
      name: 'Member4',
      title: 'MemberTitle',
      coverImagePath:
        'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
      id: '4',
    },
    {
      name: 'Member5',
      title: 'MemberTitle',
      coverImagePath: '',
      id: '5',
    },
    {
      name: 'Member6',
      title: 'MemberTitle',
      coverImagePath: '',
      id: '6',
    },
    {
      name: 'Member7',
      title: 'MemberTitle',
      coverImagePath:
        'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
      id: '7',
    },
    {
      name: 'Member8',
      title: 'MemberTitle',
      coverImagePath: '',
      id: '8',
    },
    {
      name: 'Member9',
      title: 'MemberTitle',
      coverImagePath: '',
      id: '9',
    },
    {
      name: 'Member10',
      title: 'MemberTitle',
      coverImagePath: '',
      id: '10',
    },
    {
      name: 'Member11',
      title: 'MemberTitle',
      coverImagePath: '',
      id: '11',
    },
    {
      name: 'Member12',
      title: 'MemberTitle',
      coverImagePath: '',
      id: '12',
    },
  ];

  teamsList: Team[] = [
    { name: 'P2P', id: 0, members: this.teamMembers },
    { name: 'Catalog', id: 1, members: this.teamMembers },
    { name: 'Cornerstone', id: 2, members: this.teamMembers },
    { name: 'Data Crispr', id: 3, members: this.teamMembers },
    { name: 'CLO', id: 4, members: this.teamMembers },
    { name: 'SSO', id: 5, members: this.teamMembers },
    { name: 'VizGan', id: 6, members: this.teamMembers },
    { name: 'Tam', id: 7, members: this.teamMembers },
  ];
  constructor(public dialog: MatDialog) {}

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

  ngOnInit(): void {}
}
