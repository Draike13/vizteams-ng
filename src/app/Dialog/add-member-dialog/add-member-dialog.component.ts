import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { TeamMember } from 'src/app/models/teamMember.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.scss'],
})
export class AddMemberDialogComponent implements OnInit {
  picsum: any;
  pageIndex = 1;
  pageLength = 100;
  pageSize = 5;
  pageEvent: PageEvent;
  clicked: boolean = false;
  selectedPic = null;

  fnameControl: FormControl;
  lnameControl: FormControl;
  titleControl: FormControl;
  teamControl: FormControl;
  img_url: string;
  team_id: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private databaseService: DatabaseService
  ) {
    this.fnameControl = new FormControl();
    this.lnameControl = new FormControl();
    this.titleControl = new FormControl();
    this.teamControl = new FormControl();
  }

  ngOnInit(): void {
    this.picsumAvatar();
  }

  picsumAvatar() {
    this.http
      .get(`https://picsum.photos/v2/list?page=${this.pageIndex}&limit=5`)
      .subscribe((res: any) => {
        this.picsum = res;
        console.log(res);
      });
  }

  event(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    console.log(e.pageIndex);
    this.picsumAvatar();
  }
  focusImage(selectedPic) {
    this.selectedPic = selectedPic;
    this.img_url = `http://picsum.photos/id/${selectedPic.id}/100.jpg`;
  }

  addMember() {
    let newMember: TeamMember = {
      fname: this.fnameControl.value,
      lname: this.lnameControl.value,
      title: this.titleControl.value,
      team_id: this.data.selectedTeam.id,
      img_url: this.img_url,
    };
    this.databaseService.newTeamMember(newMember).subscribe(() => {
      this.databaseService.updateMembers();
    });
    console.log(newMember);
  }
}
