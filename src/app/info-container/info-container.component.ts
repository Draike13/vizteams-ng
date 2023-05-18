import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { TeamMember } from '../models/teamMember.model';
import { Team } from '../models/team.model';

@Component({
  selector: 'app-info-container',
  templateUrl: './info-container.component.html',
  styleUrls: ['./info-container.component.scss'],
})
export class InfoContainerComponent implements OnInit {
  infoDisplay?: Team;
  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.infoPanel$.subscribe((res) => {
      this.infoDisplay = res;
      console.log(this.infoDisplay);
    });
  }
}
