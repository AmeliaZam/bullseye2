import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ResponseType } from './MonthlyScheduler.types';

type MonthlySchedulerProps = {
  data: ResponseType;
};

const MonthlyScheduler = ({
  data: { companies, selectedCompanies, schedule },
}: MonthlySchedulerProps) => {
  const router = useRouter();
  const [selectedCompaniesInDropdown, setSelectedCompaniesInDropdown] =
    useState(selectedCompanies);

  const handleCompanyChange = (
    event: SelectChangeEvent<typeof selectedCompaniesInDropdown>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedCompaniesInDropdown(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleDayCellMount = (info: any) => {
    const cellDate = info.date.toISOString().slice(0, 10);
    const event = schedule.find((ev) => ev.date === cellDate);

    if (!event) {
      // eslint-disable-next-line no-param-reassign
      info.el.style.backgroundColor = 'white';
      return;
    }

    const topEl = document.createElement('div');
    const contentEl = document.createElement('div');
    const scheduledEl = document.createElement('div');
    const unscheduledEl = document.createElement('div');

    scheduledEl.textContent = `Scheduled: ${event.scheduled}`;
    unscheduledEl.textContent = `Unscheduled: ${event.unscheduled}`;

    contentEl.appendChild(scheduledEl);
    contentEl.appendChild(unscheduledEl);
    topEl.appendChild(contentEl);

    topEl.style.position = 'absolute';
    topEl.style.bottom = '0';
    topEl.style.left = '0';
    topEl.style.fontSize = '14px';

    const containerEl = info.el.getElementsByClassName('fc-daygrid-day-top')[0];
    containerEl.insertBefore(topEl, containerEl.firstChild);

    const today = new Date().toISOString().slice(0, 10);

    if (event.scheduled > 0 && event.unscheduled === 0) {
      // eslint-disable-next-line no-param-reassign
      info.el.style.backgroundColor = 'lightblue';
    } else if (event.unscheduled > 0) {
      if (event.date < today) {
        // eslint-disable-next-line no-param-reassign
        info.el.style.backgroundColor = 'red';
      } else {
        // eslint-disable-next-line no-param-reassign
        info.el.style.backgroundColor = 'yellow';
      }
    }
  };

  const handleDateClick = (info: any) => {
    const event = schedule.find((ev) => ev.date === info.dateStr);
    if (event) router.push(`/scheduler/${event.schedulerId}`);
  };

  return (
    <>
      <Box className="flex justify-end mb-2">
        <FormControl variant="outlined" size="small" sx={{ minWidth: 170 }}>
          <InputLabel id="company-select-label">Company</InputLabel>
          <Select
            multiple
            labelId="company-select-label"
            id="company-select"
            value={selectedCompaniesInDropdown}
            onChange={handleCompanyChange}
            label="Company"
          >
            {companies.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dayCellDidMount={handleDayCellMount}
        dateClick={handleDateClick}
      />
    </>
  );
};

export default MonthlyScheduler;
