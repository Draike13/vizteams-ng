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
      .get('https://picsum.photos/v2/list?page=2&limit=100/100.jpg')
      .subscribe((res) => {
        console.log(res);
        this.getPicsum = res;
      });
  }
}
