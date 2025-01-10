export interface Years {
  year: string;
  driveLink: string;
}

export interface Paper {
  class: string;
  type: string;
  years: Years[];
}

export interface CenterProps {
  id: number;
  name: string;
  code: string;
  emoji: string;
}
export interface SchoolProps {
  id: number;
  name: string;
  center_id: number;
  center_code: string;
  center_name: string;
  school_code: string;
}
