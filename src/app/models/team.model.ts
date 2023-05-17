import { TeamMember } from './teamMember.model';

export interface Team {
  id: number;
  name: string;
  description: string;
  team_members?: TeamMember[];
}
