export interface Subject {
  name: string;
  driveLink: string;
}

export interface Paper {
  year: string;
  type: string;
  subjects: Subject[];
}
