import { TeamMember } from './teamMember.model';

export interface Team {
  id: number;
  name: string;
  members?: TeamMember[];
}
