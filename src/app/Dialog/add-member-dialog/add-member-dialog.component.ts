import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.scss'],
})
export class AddMemberDialogComponent implements OnInit {
  picsum$: Subject<any>;
  getPicsum: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http
      .get('https://picsum.photos/v2/list?limit=100')
      .subscribe((res: any) => {
        console.log(res);
        for (let img of res) {
          console.log(img.download_url);
        }
        this.getPicsum = res;
      });
  }
}
