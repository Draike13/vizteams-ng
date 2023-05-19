import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog,
    private authService: AuthService
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
    }
  }

  dropImage(event: CdkDragDrop<any[]>) {
    console.log('DROPPED!', event);
    if (event.previousContainer !== event.container) {
      // Move the image from the source container to the target container
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Reorder the image within the same container
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
