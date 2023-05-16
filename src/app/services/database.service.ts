import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  teamUrl = 'http://localhost:3000/teams';
  teamList$: Subject<Team[]> = new Subject();

  constructor(private http: HttpClient) {}

  updateTeams() {
    return this.http.get<Team[]>(this.teamUrl).subscribe((teamlist) => {
      this.teamList$.next(teamlist);
    });
  }

  getTeamsList() {
    return this.http.get(this.teamUrl);
  }

  createTeam(newTeam: any) {
    return this.http.post<Team[]>(this.teamUrl, newTeam);
  }
}
