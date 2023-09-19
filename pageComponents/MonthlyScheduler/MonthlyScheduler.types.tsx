export type ScheduleType = {
  schedulerId: number;
  date: string;
  scheduled: number;
  unscheduled: number;
}[];

export type ResponseType = {
  companies: string[];
  selectedCompanies: string[];
  schedule: ScheduleType;
};
