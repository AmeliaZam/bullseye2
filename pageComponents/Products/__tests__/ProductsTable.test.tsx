import { useRouter } from 'next/router';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ResponseType } from '../ProductsTable.types';
import ProductsTable from '../ProductsTable';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const pushMock = vi.fn();
const routerDefaults = {
  push: pushMock,
};

const data: ResponseType = [
  {
    id: 1,
    type: 'Model',
    modelID: '1',
    accessoryID: '',
    make: 'Canon',
    model: 'CapturePerfect',
    category: 'Software - Solutions',
    productNum: '1941B001AC',
    speed: '',
    description: 'CapturePerfect 3.1',
    outcost: '$63',
    MSRP: '$80',
    discontinued: 'N',
    notes: '',
  },
];

describe('<ProductsTable />', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => routerDefaults);
  });

  it('table renders correctly', () => {
    render(<ProductsTable data={data} />);

    expect(screen.getByText('Canon')).toBeInTheDocument();
    expect(screen.getByText('CapturePerfect')).toBeInTheDocument();
    expect(screen.getByText('CapturePerfect 3.1')).toBeInTheDocument();
    expect(screen.getByText('$63')).toBeInTheDocument();
    expect(screen.getByText('$80')).toBeInTheDocument();
  });

  it('moves to create new product page when add new item button clicked', async () => {
    const user = userEvent.setup();
    render(<ProductsTable data={data} />);

    const createButton = screen.getByRole('button', { name: /New Item/i });

    expect(createButton).toBeInTheDocument();

    await user.click(createButton);

    expect(pushMock).toHaveBeenCalledWith('/add-new-product');
  });
});
