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
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { MatExpansionPanel } from '@angular/material/expansion';
import { CdkDragEnter } from '@angular/cdk/drag-drop';

import { InfoService } from '../services/info.service';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.scss'],
})
export class TeamlistComponent implements OnInit {
  errorToggle: boolean = false;
  toggle: boolean = false;
  teamMembers: TeamMember[] = [];
  teamsList: Team[] = [];
  progressValue: number = 0;
  isLoading: boolean = false;
  currentUser: any;
  connectedTo = [];
  isDragging: boolean = false;
  selectedTeam = null;
  @ViewChild('panel') panel: MatExpansionPanel;
  timeoutID;

  constructor(
    private databaseService: DatabaseService,
    private infoService: InfoService,
    public dialog: MatDialog,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  onDragStarted() {
    this.isDragging = true;
    console.log('DRAG STARTED', this.isDragging);
  }

  onDragEnded() {
    this.isDragging = false;
    console.log('DRAG ENDED', this.isDragging);
  }

  onMouseEnter(panel) {
    if (this.isDragging) {
      this.timeoutID = setTimeout(() => {
        panel.open();
      }, 1500);
    }
  }

  onMouseLeave(panel) {
    clearTimeout(this.timeoutID);
    panel.close;
  }

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
    if (selectedTeam.team_members.length == 12) {
      this.selectedTeam = selectedTeam;
      this.memberErrorMessage();
    } else {
      this.dialog.open(AddMemberDialogComponent, {
        minHeight: '20vh',
        minWidth: '30vw',
        data: { teamsList, selectedTeam },
      });
    }
  }

  memberErrorMessage() {
    this.errorToggle = true;
    setTimeout(() => {
      this.errorToggle = false;
    }, 3000);
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
    const newLength = event.container.data.length;
    if (newLength < 12) {
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        const teamMemberdata = event.container.data;
        this.databaseService.updateDNDMember(teamMemberdata, newID);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        const teamMemberdata = event.container.data;
        this.databaseService.updateDNDMember(teamMemberdata, newID);
      }
    } else {
      this.memberErrorMessage();
      console.log('ERROR--TOO MANY MEMBERS');
    }
  }
}
