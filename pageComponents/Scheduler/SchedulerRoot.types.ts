export type SchedulerDataType = {
  tasks: TaskType[];
  resources: ResouceType[];
};

export type TaskType = {
  text: string;
  number: string;
  address: string;
};

type ResouceType = {
  text: string;
  id: number;
  color: string;
};
