import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import user from '@testing-library/user-event';
import { USER_DATA } from '@/mocks/handlers/userData';
import Sidebar, { SidebarDataType } from '../Sidebar';

const PAGE_NAME = 'Queue';
const INITIAL_USER = 'testjohn@test.com';
const INITIAL_USER_DATA: SidebarDataType = {
  fullname: 'Test John',
  pages: ['Home', 'About'],
  links: [
    { linkName: 'Google', linkAddress: 'https://www.google.com' },
    { linkName: 'Facebook', linkAddress: 'https://www.facebook.com' },
  ],
  impersonate: [
    { id: 'testjohn@test.com', displayname: 'Test John' },
    { id: 'testuser@test.com', displayname: 'Test User' },
  ],
};

const Component = () => (
  <Sidebar
    initialUserData={INITIAL_USER_DATA}
    pagename={PAGE_NAME}
    initialUser={INITIAL_USER}
  >
    <div>Page Content</div>
  </Sidebar>
);

describe('<Sidebar />', () => {
  it('component renders correctly', () => {
    render(<Component />);

    const appBar = screen.getByRole('banner');
    expect(appBar).toBeInTheDocument();
  });

  describe('sidebar renders correctly', () => {
    it('displays the correct page name', () => {
      render(<Component />);

      expect(screen.getByText(PAGE_NAME)).toBeInTheDocument();
    });

    it('displays the correct pages', () => {
      render(<Component />);

      const homePage = screen.getByText(INITIAL_USER_DATA.pages[0]);
      expect(homePage).toBeInTheDocument();

      const aboutPage = screen.getByText(INITIAL_USER_DATA.pages[1]);
      expect(aboutPage).toBeInTheDocument();
    });

    it('displays the correct links', () => {
      render(<Component />);

      const googleLink = screen.getByRole('link', {
        name: INITIAL_USER_DATA.links[0].linkName,
      });
      expect(googleLink).toHaveAttribute(
        'href',
        INITIAL_USER_DATA.links[0].linkAddress
      );

      const facebookLink = screen.getByRole('link', {
        name: INITIAL_USER_DATA.links[0].linkName,
      });
      expect(facebookLink).toHaveAttribute(
        'href',
        INITIAL_USER_DATA.links[0].linkAddress
      );
    });
  });

  it('impersonates user', async () => {
    render(<Component />);

    user.setup();

    const input = screen.getByLabelText('User');
    expect(input).toBeInTheDocument();

    await user.click(input);
    const userSmith = screen.getByText(USER_DATA.fullname);
    expect(userSmith).toBeInTheDocument();
    await user.click(userSmith);
    expect(screen.getAllByText(USER_DATA.fullname)).toHaveLength(2);
    const link = screen.getByRole('link', {
      name: USER_DATA.links[0].linkName,
    });
    expect(link).toHaveAttribute('href', USER_DATA.links[0].linkAddress);
  });
});
