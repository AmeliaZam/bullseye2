import { useRouter } from 'next/router';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResponseType, ScheduleType } from '../MonthlyScheduler.types';
import MonthlySchedular from '../MonthlyScheduler';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const pushMock = vi.fn();
const routerDefaults = {
  push: pushMock,
};

const companies: string[] = ['Bristol', 'Chattanooga', 'Nashville'];
const selectedCompanies: string[] = ['Nashville'];
const schedule: ScheduleType = [
  {
    schedulerId: 1,
    date: '2023-04-29',
    scheduled: 9,
    unscheduled: 6,
  },
  {
    schedulerId: 2,
    date: '2023-04-30',
    scheduled: 9,
    unscheduled: 8,
  },
];

const data: ResponseType = {
  companies,
  selectedCompanies,
  schedule,
};

describe('<MonthlySchedular />', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => routerDefaults);
  });

  it('table renders correctly', () => {
    render(<MonthlySchedular data={data} />);

    expect(screen.getByText(/Scheduled: 9/i)).toBeInTheDocument();
    expect(screen.getByText(/Unscheduled: 8/i)).toBeInTheDocument();
  });
});
