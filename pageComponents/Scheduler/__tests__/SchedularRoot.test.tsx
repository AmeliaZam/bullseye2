import { render, screen } from '@testing-library/react';

import Schedular from '../SchedulerRoot';

const SCHEDULAR_DATA = {
  tasks: [
    {
      text: 'WJ9362 - A Plus Services, Inc.',
      number: 'iR ADV DX 6700Z',
      address: '123 Main Street, Clinton, MS',
    },
  ],

  resources: [
    {
      text: 'Truck 1 - Jackson',
      id: 1,
      color: '#1e90ff',
    },
    {
      text: 'Truck 2 - Jackson',
      id: 2,
      color: '#ff0000',
    },
  ],
};

describe('<Scheduler />', () => {
  it('schedular renders correctly', () => {
    render(<Schedular schedulerData={SCHEDULAR_DATA} />);

    expect(
      screen.getByText('WJ9362 - A Plus Services, Inc.')
    ).toBeInTheDocument();
    expect(screen.getByText('iR ADV DX 6700Z')).toBeInTheDocument();
    expect(screen.getByText('Truck 1 - Jackson')).toBeInTheDocument();
    expect(screen.getByText('Truck 2 - Jackson')).toBeInTheDocument();
  });
});
