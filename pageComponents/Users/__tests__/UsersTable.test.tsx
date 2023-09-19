import { useRouter } from 'next/navigation';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UsersTable from '../UsersTable';
import { UserType } from '../Users.types';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const pushMock = vi.fn();
const routerDefaults = {
  push: pushMock,
};

const data: UserType = [
  {
    first_name: 'Jacob',
    last_name: 'James',
    user_profile_adname: 'RJY\\jacob.james',
    user_profile_email: 'jacob.james@gmail.com',
    company: {
      company_id: 1,
      company_name: 'RJYoung',
    },
  },
];

describe('<UsersTable />', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => routerDefaults);
  });

  it('table renders correctly', () => {
    render(<UsersTable data={data} />);

    expect(screen.getByText('Jacob')).toBeInTheDocument();
    expect(screen.getByText('James')).toBeInTheDocument();
    expect(screen.getByText('RJYoung')).toBeInTheDocument();
    expect(screen.getByText('RJY\\jacob.james')).toBeInTheDocument();
    expect(screen.getByText('jacob.james@gmail.com')).toBeInTheDocument();
  });

  it('moves to create new user page when add new item button clicked', async () => {
    const user = userEvent.setup();
    render(<UsersTable data={data} />);

    const createButton = screen.getByRole('button', { name: /New Item/i });

    expect(createButton).toBeInTheDocument();

    await user.click(createButton);

    expect(pushMock).toHaveBeenCalledWith('/user-form');
  });
});
