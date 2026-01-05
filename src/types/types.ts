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
  address?: string;
}
export interface SchoolProps {
  id: number;
  name: string;
  center_id: number;
  center_code: string;
  center_name: string;
  school_code: string;
}

export type AdmitCardData = {
  id: string;
  rollNo: string;
  appNo: string;
  name: string;
  gender: string;
  fatherName: string;
  address: string;
  examDate: string;
  examTime: string;
  venue: string;
  school: string;
  reportingTime: string;
  lastEntryTime: string;
};
