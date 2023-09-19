import React from 'react';
import UserForm from '@/pageComponents/UserForm';
import db from '@/utils/db';

const UserFormPage = async () => {
  try {
    const companiesPromise = db.company.findMany();
    const userRolesPromise = db.user_role.findMany();
    const manufacturersPromise = db.lookup.findMany({
      where: {
        lookup_type_id: 12,
      },
      select: {
        lookup_id: true,
        lookup_long: true,
      },
    });

    const [companies, userRoles, manufacturers] = await Promise.all([
      companiesPromise,
      userRolesPromise,
      manufacturersPromise,
    ]);

    return (
      <UserForm
        companies={companies}
        userRoles={userRoles}
        manufacturers={manufacturers}
      />
    );
  } catch {
    return <h1>Failed to fetch data from API</h1>;
  }
};

export default UserFormPage;
