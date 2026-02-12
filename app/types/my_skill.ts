import { type skill_tag } from './skill_tag';

export interface my_skill {
  id: number;
  skill_name: string;
  years_of_experience: number;
  skill_tag: skill_tag;
  background_color: string;
  created_at: Date;
}