import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ResponseType } from '../OrdersTable.types';
import OrdersTable from '../OrdersTable';

const ordersTableData: ResponseType = [
  {
    id: 1,
    orderNo: 'HQB00',
    customerName: 'Tractor Supply',
    salesSchedule: 'May - 2023',
    salesTeam: 'Nashville',
    salesManager: 'Mooney, David',
    salesRep: 'Gentry, Grant',
  },
  {
    id: 2,
    orderNo: 'QBC00',
    customerName: 'James Harry',
    salesSchedule: 'June - 2023',
    salesTeam: 'Asheville',
    salesManager: 'John, Doe',
    salesRep: 'David, Jackson',
  },
];

const salesTeamsData = [
  'Nashville',
  'Knoxville',
  'Birmingham',
  'Major Accounts',
  'Asheville',
  'Jackson',
];

const Component = () => (
  <OrdersTable
    ordersTableData={ordersTableData}
    salesTeamsData={salesTeamsData}
  />
);

describe('<OrdersTable />', () => {
  it('table renders correctly', () => {
    render(<Component />);

    expect(screen.getByText('HQB00')).toBeInTheDocument();
    expect(screen.getByText('Tractor Supply')).toBeInTheDocument();
    expect(screen.getByText('May - 2023')).toBeInTheDocument();
    expect(screen.getByText('Nashville')).toBeInTheDocument();
    expect(screen.getByText('Mooney, David')).toBeInTheDocument();
    expect(screen.getByText('Gentry, Grant')).toBeInTheDocument();
  });

  it('shows searched orders only', async () => {
    const user = userEvent.setup();

    render(<Component />);

    await user.click(screen.getByRole('button', { name: 'Search' }));

    await user.click(screen.getByRole('button', { name: 'Sales Team All' }));
    await user.click(screen.getByRole('option', { name: 'Nashville' }));

    await user.click(screen.getByRole('button', { name: 'Sales Rep -' }));
    await user.click(screen.getByRole('option', { name: 'Gentry, Grant' }));

    await user.type(
      screen.getByRole('textbox', { name: 'Customer Name' }),
      'Tractor Supply'
    );

    await user.type(screen.getByRole('textbox', { name: 'Order No' }), 'HQB00');

    await user.click(screen.getByRole('button', { name: 'Booked Month -' }));
    await user.click(screen.getByRole('option', { name: 'May' }));

    await user.click(screen.getByRole('button', { name: 'Choose date' }));
    await user.click(screen.getByRole('button', { name: '2023' }));

    await user.click(screen.getByTestId('search-button'));

    screen.getByRole('dialog').remove();

    expect(screen.getByText('HQB00')).toBeInTheDocument();
    expect(screen.getByText('Tractor Supply')).toBeInTheDocument();
    expect(screen.getByText('May - 2023')).toBeInTheDocument();
    expect(screen.getByText('Nashville')).toBeInTheDocument();
    expect(screen.getByText('Mooney, David')).toBeInTheDocument();
    expect(screen.getByText('Gentry, Grant')).toBeInTheDocument();

    expect(screen.queryByText('QBC00')).not.toBeInTheDocument();
    expect(screen.queryByText('James Harry')).not.toBeInTheDocument();
    expect(screen.queryByText('June - 2023')).not.toBeInTheDocument();
    expect(screen.queryByText('Asheville')).not.toBeInTheDocument();
    expect(screen.queryByText('John, Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('David, Jackson')).not.toBeInTheDocument();
  });
});
