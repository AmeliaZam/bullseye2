import { USER_IMPERSONATION_URL } from '@/utils/apiUrls';
import { rest } from 'msw';

export const USER_DATA = {
  id: 'testuser@test.com',
  fullname: 'Test User',
  pages: ['Test User page 1', 'Test User page 2'],
  links: [
    {
      linkName: 'Test User link 1',
      linkAddress: 'https://testuserlink1.com',
    },
  ],
  impersonate: [
    {
      linkName: 'Test User link 2',
      linkAddress: 'https://testuserlink2.com',
    },
  ],
};

export default rest.get(
  `${USER_IMPERSONATION_URL}/${USER_DATA.id}`,
  (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(USER_DATA));
  }
);
