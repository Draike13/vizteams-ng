import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { TeamMember } from 'src/app/models/teamMember.model';
@Component({
  selector: 'app-edit-member-dialog',
  templateUrl: './edit-member-dialog.component.html',
  styleUrls: ['./edit-member-dialog.component.scss'],
})
export class EditMemberDialogComponent implements OnInit {
  picsum: any;
  pageIndex = 1;
  pageLength = 100;
  pageSize = 5;
  pageEvent: PageEvent;
  clicked: boolean = false;
  selectedPic = null;

  img_url: string;
  team_id: number;

  fnameControl: FormControl;
  lnameControl: FormControl;
  titleControl: FormControl;
  teamControl: FormControl;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private databaseService: DatabaseService,
    private http: HttpClient
  ) {
    this.fnameControl = new FormControl(this.data[0].fname, Validators.required);
    this.lnameControl = new FormControl(this.data[0].lname, Validators.required);
    this.titleControl = new FormControl(this.data[0].title, Validators.required);
    this.teamControl = new FormControl(this.data[0].team_id, Validators.required);
  }

  editMember() {
    let member: TeamMember = {
      fname: this.fnameControl.value,
      lname: this.lnameControl.value,
      title: this.titleControl.value,
      team_id: this.teamControl.value,
      img_url: this.img_url,
    };
    let member_id: number = this.data[0].id;
    this.databaseService.editMember(member, member_id).subscribe(() => {
      this.databaseService.updateTeams();
      this.databaseService.updateMembers();
    });
  }

  ngOnInit(): void {
    this.picsumAvatar();
  }

  focusImage(selectedPic) {
    this.selectedPic = selectedPic;
    this.img_url = `http://picsum.photos/id/${selectedPic.id}/100.jpg`;
  }
  event(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.picsumAvatar();
  }
  picsumAvatar() {
    this.http
      .get(`https://picsum.photos/v2/list?page=${this.pageIndex}&limit=5`)
      .subscribe((res: any) => {
        this.picsum = res;
      });
  }

  getfnameErrorMessage() {
    if (this.fnameControl.hasError('required')) {
      return 'First name required';
    }
    return ''; // Default return value when the condition is false
  }
  getlnameErrorMessage() {
    if (this.lnameControl.hasError('required')) {
      return 'Last name required';
    }
    return ''; // Default return value when the condition is false
  }
  gettitleErrorMessage() {
    if (this.titleControl.hasError('required')) {
      return 'Title required';
    }
    return ''; // Default return value when the condition is false
  }
  getteamidErrorMessage() {
    if (this.teamControl.hasError('required')) {
      return 'Team required';
    }
    return ''; // Default return value when the condition is false
  }
}
