import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

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
  focusImage(selctedPic) {
    this.selectedPic = selctedPic;
  }
}
