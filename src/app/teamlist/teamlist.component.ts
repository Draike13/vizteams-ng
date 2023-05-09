import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { TeamMember } from '../models/teamMember.model';

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
      coverImagePath: 'assets/avatar.png',
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
      coverImagePath: 'assets/avatar.png',
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
      coverImagePath: 'assets/avatar.png',
      id: '5',
    },
    {
      name: 'Member6',
      title: 'MemberTitle',
      coverImagePath: 'assets/avatar.png',
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
      coverImagePath: 'assets/avatar.png',
      id: '8',
    },
    {
      name: 'Member9',
      title: 'MemberTitle',
      coverImagePath: 'assets/avatar.png',
      id: '9',
    },
    {
      name: 'Member10',
      title: 'MemberTitle',
      coverImagePath: 'assets/avatar.png',
      id: '10',
    },
    {
      name: 'Member11',
      title: 'MemberTitle',
      coverImagePath: 'assets/avatar.png',
      id: '11',
    },
    {
      name: 'Member12',
      title: 'MemberTitle',
      coverImagePath: 'assets/avatar.png',
      id: '12',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
