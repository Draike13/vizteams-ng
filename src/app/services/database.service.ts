import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Team } from '../models/team.model';
import { TeamMember } from '../models/teamMember.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  apiUrl = environment.apiUrl;
  teamUrl = `${this.apiUrl}teams`;
  teamList$: Subject<Team[]> = new Subject();
  infoPanel$: Subject<Team> = new Subject();

  constructor(private http: HttpClient) {
    console.log(this.apiUrl);
  }

  updateTeams() {
    return this.http.get<Team[]>(this.teamUrl).subscribe((teamList) => {
      this.teamList$.next(teamList);
    });
  }

  getMembers(id: number) {
    return this.http.get<TeamMember[]>(`${this.teamUrl}/${id}/team_members`);
  }

  getTeamsList() {
    return this.http.get(this.teamUrl);
  }

  createTeam(newTeam: any) {
    return this.http.post<Team[]>(this.teamUrl, newTeam);
  }
}
