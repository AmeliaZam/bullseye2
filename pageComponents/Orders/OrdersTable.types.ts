export type ResponseType = {
  id: number;
  orderNo: string;
  customerName: string;
  salesSchedule: string;
  salesTeam: string;
  salesManager: string;
  salesRep: string;
}[];

export type SearchType = {
  salesTeam: string;
  salesRep: string;
  customerName: string;
  orderNo: string;
  bookedMonth: string;
  bookedYear: Date | null;
};

export type SearchObjectType = {
  salesTeam: string;
  salesRep: string;
  customerName: string;
  orderNo: string;
  bookedMonth: string;
  bookedYear: string;
};
