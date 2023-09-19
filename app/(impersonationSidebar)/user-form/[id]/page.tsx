import React from 'react';
import UserForm from '@/pageComponents/UserForm';
import db from '@/utils/db';

interface UserFormPageParams {
  id: string;
}

interface UserFormPageProps {
  params: UserFormPageParams;
}

const UserFormPage = async ({ params }: UserFormPageProps) => {
  const { id } = params;

  try {
    const companiesPromise = db.company.findMany();
    const userRolesPromise = db.user_role.findMany();
    const userProfilePromise = db.user_profile.findUnique({
      where: {
        user_profile_id: Number(id),
      },
    });
    const userProfileRolesPromise = db.user_profile_role.findMany({
      where: {
        user_profile_id: Number(id),
      },
      select: {
        user_role_id: true,
        user_profile_role_flag: true,
      },
    });
    const manufacturersPromise = db.lookup.findMany({
      where: {
        lookup_type_id: 12,
      },
      select: {
        lookup_id: true,
        lookup_long: true,
      },
    });

    // const userProfileManufacturersPromise = db.user_profile_manufacturer.findMany({
    //   where: {
    //     user_profile_id: Number(id),
    //   },
    //   select: {
    //     user_profile_id: true,
    //     lookup_id: 'manufacturer_lu',
    //   },
    // });

    const userProfileManufacturersPromise = [
      {
        user_profile_id: 1,
        lookup_id: 300,
      },
      {
        user_profile_id: 1,
        lookup_id: 301,
      },
    ];

    const [
      companies,
      userRoles,
      userProfile,
      userProfileRoles,
      manufacturers,
      userProfileManufacturers,
    ] = await Promise.all([
      companiesPromise,
      userRolesPromise,
      userProfilePromise,
      userProfileRolesPromise,
      manufacturersPromise,
      userProfileManufacturersPromise,
    ]);

    const updatedUserProfileRoles = userProfileRoles.map((x) => ({
      ...x,
      user_role_long: userRoles.find((y) => y.user_role_id === x.user_role_id)
        ?.user_role_long,
    }));

    return (
      <UserForm
        id={id}
        companies={companies}
        userRoles={userRoles}
        userProfile={userProfile}
        userProfileRoles={updatedUserProfileRoles}
        manufacturers={manufacturers}
        userProfileManufacturers={userProfileManufacturers}
      />
    );
  } catch {
    return <h1>Failed to fetch data from API</h1>;
  }
};

export default UserFormPage;
