import Users from '@/pageComponents/Users';
import db from '@/utils/db';

const UsersPage = async () => {
  try {
    const data = await db.user_profile.findMany({
      include: {
        company: true,
      },
    });

    return <Users data={data} />;
  } catch {
    return <h1>Failed to fetch data from API</h1>;
  }
};

export default UsersPage;
