import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { TeamMember } from '../models/teamMember.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  infoDisplay$: Subject<Team> = new Subject();
  selectedMember$: Subject<TeamMember> = new Subject();
  constructor() {}
}
