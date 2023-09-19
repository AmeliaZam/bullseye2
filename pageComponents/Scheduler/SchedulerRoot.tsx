import React from 'react';

import Scheduler, {
  AppointmentDragging,
  Resource,
} from 'devextreme-react/scheduler';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import SchedulingItems from './SchedulingItems';
import Appointment from './Appointment';
import { TaskType, SchedulerDataType } from './SchedulerRoot.types';

const VIEWS = [
  { type: 'day', intervalCount: 0 },
  { type: 'week' },
  { type: 'month' },
];

type SchedulerRootPropsType = {
  schedulerData: SchedulerDataType;
};

type SchedulerRootStateType = {
  company: string;
  tasks: TaskType[];
  appointments: any[];
};

export default class SchedulerRoot extends React.Component<
  SchedulerRootPropsType,
  SchedulerRootStateType
> {
  constructor(props: SchedulerRootPropsType) {
    super(props);
    this.state = {
      company: 'RJ Young',
      tasks: props.schedulerData.tasks,
      appointments: [],
    };
    this.onAppointmentRemove = this.onAppointmentRemove.bind(this);
    this.onAppointmentAdd = this.onAppointmentAdd.bind(this);
  }

  // @ts-ignore
  onAppointmentRemove(e) {
    const { appointments, tasks } = this.state;
    const index = appointments.indexOf(e.itemData);

    if (index >= 0) {
      appointments.splice(index, 1);
      tasks.push(e.itemData);

      this.setState({
        tasks: [...tasks],
        appointments: [...appointments],
      });
    }
  }

  // @ts-ignore
  onAppointmentAdd(e) {
    const { appointments, tasks } = this.state;
    const index = tasks.indexOf(e.fromData);

    if (index >= 0) {
      tasks.splice(index, 1);
      appointments.push(e.itemData);

      this.setState({
        tasks: [...tasks],
        appointments: [...appointments],
      });
    }
  }

  handleChange = (e: SelectChangeEvent) => {
    this.setState({ company: e.target.value as string });
  };

  render() {
    const { company, tasks, appointments } = this.state;
    const { schedulerData } = this.props;

    return (
      <div className="m-5">
        <Grid container spacing={2} className="mb-5">
          <Grid item xs={12} md={3} lg={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="company-select-label">Company</InputLabel>
              <Select
                labelId="company-select-label"
                id="company-select"
                value={company}
                label="Company"
                onChange={this.handleChange}
              >
                <MenuItem value="RJ Young">RJ Young</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={3} lg={2}>
            <SchedulingItems tasks={tasks} />
          </Grid>
          <Grid item xs={12} md={9} lg={10}>
            <Scheduler
              timeZone="America/Los_Angeles"
              id="scheduler"
              dataSource={appointments}
              groups={['priorityId']}
              // @ts-ignore
              views={VIEWS}
              startDayHour={0}
              editing
              appointmentComponent={Appointment}
            >
              <AppointmentDragging
                group="appointmentsGroup"
                onRemove={this.onAppointmentRemove}
                onAdd={this.onAppointmentAdd}
              />

              <Resource
                fieldExpr="priorityId"
                allowMultiple={false}
                dataSource={schedulerData.resources}
                label="Priority"
              />
            </Scheduler>
          </Grid>
        </Grid>
      </div>
    );
  }
}
