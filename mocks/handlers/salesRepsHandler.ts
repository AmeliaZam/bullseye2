import { SALES_REPS_URL } from '@/utils/apiUrls';
import { rest } from 'msw';

export const SALES_REP_DATA = {
  id: 'Nashville',
  salesReps: ['David, Jackson', 'Gentry, Grant'],
};

export default rest.get(
  `${SALES_REPS_URL}/${SALES_REP_DATA.id}`,
  (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(SALES_REP_DATA));
  }
);
