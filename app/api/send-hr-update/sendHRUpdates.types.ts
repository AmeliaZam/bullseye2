export type ReportType = {
  name: string;
  title: string;
  image: string;
};

export type ResponseType = {
  managerName: string;
  email: string;
  reports: ReportType[];
};
