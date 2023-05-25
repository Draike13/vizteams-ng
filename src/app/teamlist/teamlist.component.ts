import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { TeamMember } from '../models/teamMember.model';
import { AddMemberDialogComponent } from '../Dialog/add-member-dialog/add-member-dialog.component';
import { AddTeamDialogComponent } from '../Dialog/add-team-dialog/add-team-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Team } from '../models/team.model';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { InfoService } from '../services/info.service';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.scss'],
})
export class TeamlistComponent implements OnInit {
  toggle: boolean = false;
  teamMembers: TeamMember[] = [];
  teamsList: Team[] = [];
  progressValue: number = 0;
  isLoading: boolean = false;
  currentUser: any;
  connectedTo = [];

  constructor(
    private databaseService: DatabaseService,
    private infoService: InfoService,
    public dialog: MatDialog,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  populateConnectedTo() {
    this.connectedTo = [];
    this.databaseService.teamList$.subscribe((value) => {
      this.teamsList = value;
      for (let team of this.teamsList) {
        this.connectedTo.push(team.name);
      }
    });
  }

  togglePanel() {
    this.toggle = !this.toggle;
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
    this.populateConnectedTo();
    this.infoService.selectedMember$.next(undefined);
    this.infoService.infoDisplay$.next(undefined);
  }

  displayTeam(team: Team) {
    this.infoService.selectedMember$.next(undefined);
    this.infoService.infoDisplay$.next(team);
    this.teamMembers = team.team_members;
  }

  ngOnInit(): void {
    // Check if there is a currentUser logged in
    const isLoggedIn = this.authService.getToken();

    // If there is a user, run the progress bar
    if (isLoggedIn) {
      const totalSteps = 100; // Total number of loading steps
      const intervalDuration = 10; // Duration between each step in milliseconds
      this.isLoading = true;
      // Start the loading progress
      const loadingInterval = setInterval(() => {
        // Increment the progress value
        this.progressValue += 1;

        // Check if the loading is complete
        if (this.progressValue >= totalSteps) {
          clearInterval(loadingInterval); // Stop the loading progress
          this.isLoading = false; // Hide the progress bar
        }
      }, intervalDuration);

      this.databaseService.teamList$.subscribe((value) => {
        this.teamsList = value;
      });
      this.databaseService.updateTeams();
      this.populateConnectedTo();
    }
  }

  drop(event: CdkDragDrop<any>, newID: number) {
    console.log('EVENT', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const teamMemberdata = event.container.data;
      this.databaseService.updateDNDMember(teamMemberdata, newID);
    } else {
      console.log('EVENT', event);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const teamMemberdata = event.container.data;
      this.databaseService.updateDNDMember(teamMemberdata, newID);
    }
  }
}
