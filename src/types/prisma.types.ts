export type TopRankerResult = {
  id: string;
  name: string;
  roll_number: string;
  class: string;
  total_score: number;
  rank: number;
  school_name: string;
  school_code: string;
  center_name: string;
  center_code: string;
};

export interface Center {
  id: number;
  code: string;
  name: string;
}

export interface School {
  id: number;
  name: string;
  code: string;
}

export interface Result {
  id: string;
  name: string;
  roll_number: string;
  class: string;
  total_attempt: number;
  correct_attempt: number;
  total_score: number;
  centerId: number;
  schoolId: number;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentResult extends Result {
  rank: number;
  school: School;
  center: Center;
}
