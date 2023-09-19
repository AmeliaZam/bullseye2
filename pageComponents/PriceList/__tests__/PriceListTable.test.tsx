import { useRouter } from 'next/navigation';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PriceListTable from '../PriceListTable';
import { PriceBookType } from '../PriceList.types';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const pushMock = vi.fn();
const routerDefaults = {
  push: pushMock,
};

const data: PriceBookType = [
  {
    series: 1,
    model: 'CapturePerfect',
    pricebook_team: 'Canon',
    required: true,
    product_no: '41664BL95AB',
    description: 'Scan to Worldox V1.1, 1L-5L',
    discontinued: true,
    notes: 'notes xyz',
  },
];

describe('<PriceListTable />', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => routerDefaults);
  });

  it('table renders correctly', () => {
    render(<PriceListTable data={data} />);

    expect(screen.getByText('CapturePerfect')).toBeInTheDocument();
    expect(screen.getByText('Canon')).toBeInTheDocument();
    expect(screen.getByText('41664BL95AB')).toBeInTheDocument();
    expect(screen.getByText('Scan to Worldox V1.1, 1L-5L')).toBeInTheDocument();
    expect(screen.getByText('notes xyz')).toBeInTheDocument();
  });

  it('moves to create new product page when add new item button clicked', async () => {
    const user = userEvent.setup();
    render(<PriceListTable data={data} />);

    const createButton = screen.getByRole('button', { name: /New Item/i });

    expect(createButton).toBeInTheDocument();

    await user.click(createButton);

    expect(pushMock).toHaveBeenCalledWith('/price-book');
  });
});
