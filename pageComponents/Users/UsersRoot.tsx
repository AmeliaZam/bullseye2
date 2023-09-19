import UsersTable from './UsersTable';
import { UserType } from './Users.types';

type UsersRootPropsType = {
  data: UserType;
};

const UsersRoot = ({ data }: UsersRootPropsType) => {
  return <UsersTable data={data} />;
};

export default UsersRoot;
