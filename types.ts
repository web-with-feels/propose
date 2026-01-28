export enum AppStage {
  LANDING = 'LANDING',
  STORY = 'STORY',
  GAME = 'GAME',
  LETTER = 'LETTER',
  PROPOSAL = 'PROPOSAL',
  ACCEPTED = 'ACCEPTED'
}

export interface Memory {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
}