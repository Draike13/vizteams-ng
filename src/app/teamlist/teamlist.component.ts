import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.scss']
})
export class TeamlistComponent implements OnInit {


teams = []


  constructor() { }

  ngOnInit(): void {
  }

}
