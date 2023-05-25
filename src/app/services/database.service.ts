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
  teamUrl = `${this.apiUrl}teams/`;
  memberUrl = `${this.apiUrl}team_members/`;
  teamList$: Subject<Team[]> = new Subject();

  constructor(private http: HttpClient) {}

  updateTeams() {
    return this.http.get<Team[]>(this.teamUrl).subscribe((teamList) => {
      this.teamList$.next(teamList);
    });
  }

  updateMembers() {
    return this.http.get<Team[]>(this.teamUrl).subscribe((teamList) => {
      this.teamList$.next(teamList);
    });
  }

  updateDNDMember(data, newID) {
    // Make an HTTP request to update the TeamMember table
    for (let member of data) {
      member.team_id = newID;
      this.http
        .put<TeamMember[]>(this.memberUrl + member.id, member)
        .subscribe({
          next: (updatedTeamMember) => {
            console.log('TeamMember updated successfully.', updatedTeamMember);
          },
          error: (error) => {
            console.error('Failed to update TeamMember.', error);
          },
        });
    }
  }

  getTeamsList() {
    return this.http.get(this.teamUrl);
  }

  createTeam(newTeam: any) {
    return this.http.post<Team>(this.teamUrl, newTeam);
  }
  editTeam(team: any, team_id: number) {
    console.log(team);
    console.log(team_id);
    return this.http.put<Team>(this.teamUrl + team_id, team);
  }

  deleteTeam(team_id) {
    console.log('TEAMID:', team_id);
    console.log(this.teamUrl + '/');
    return this.http.delete<Team>(this.teamUrl + team_id);
  }

  deleteMember(member) {
    return this.http.delete<TeamMember>(this.memberUrl + member.id);
  }

  newTeamMember(newTeamMember) {
    return this.http.post<TeamMember>(this.memberUrl, newTeamMember);
  }
}
