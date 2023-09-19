import { NextResponse } from 'next/server';
import db from '@/utils/db';

// eslint-disable-next-line import/prefer-default-export
export async function PATCH(req: Request) {
  const {
    userId,
    user,
    userSelectedRoles,
    userOriginalRoles,
    userSelectedManufacturers,
    userOriginalManufacturers,
  } = await req.json();

  const originalRoleIds = userOriginalRoles.map(
    (record) => record.user_role_id
  );

  const updatedRoleIds = userSelectedRoles.map((record) => record.user_role_id);

  const roleIdsToDelete = originalRoleIds.filter(
    (roleId) => !updatedRoleIds.includes(roleId)
  );

  const roleIdsToCreate = updatedRoleIds.filter(
    (roleId) => !originalRoleIds.includes(roleId)
  );

  const roleIdsToUpdateFlag = userOriginalRoles
    .filter((role) =>
      userSelectedRoles.some(
        (selectedRole) =>
          selectedRole.user_role_id === role.user_role_id &&
          selectedRole.user_profile_role_flag === 0
      )
    )
    .map((role) => role.user_role_id);

  const originalManufacturerIds = userOriginalManufacturers.map(
    (record) => record.lookup_id
  );

  const updatedManufacturerIds = userSelectedManufacturers.map(
    (record) => record.lookup_id
  );

  const manufacturerIdsToDelete = originalManufacturerIds.filter(
    (manufacturerId) => !updatedManufacturerIds.includes(manufacturerId)
  );

  const manufacturerIdsToCreate = updatedManufacturerIds.filter(
    (manufacturerId) => !originalManufacturerIds.includes(manufacturerId)
  );

  try {
    await db.user_profile.update({
      where: {
        user_profile_id: Number(userId),
      },
      data: {
        first_name: user?.first_name,
        last_name: user?.last_name,
        company_id: user?.company_id,
        user_profile_adname: user?.user_profile_adname,
        user_profile_email: user?.user_profile_email,
      },
    });

    await db.user_profile_role.deleteMany({
      where: {
        user_profile_id: Number(userId),
        user_role_id: { in: roleIdsToDelete },
      },
    });

    await db.user_profile_role.updateMany({
      where: {
        user_profile_id: Number(userId),
        user_role_id: { in: roleIdsToUpdateFlag },
      },
      data: {
        user_profile_role_flag: 0,
      },
    });

    const createRolePromises = userSelectedRoles
      .filter((record) => roleIdsToCreate.includes(record.user_role_id))
      .map((record) => {
        return db.user_profile_role.create({
          data: {
            user_profile_id: Number(userId),
            user_role_id: record.user_role_id,
            user_profile_role_flag: record.user_profile_role_flag,
          },
        });
      });

    await Promise.all(createRolePromises);

    // await db.user_profile_manufacturer.deleteMany({
    //   where: {
    //     user_profile_id: Number(userId),
    //     manufacturer_lu: { in: manufacturerIdsToDelete },
    //   },
    // });

    // const createManufacturerPromises = userSelectedManufacturers
    //   .filter((record) => manufacturerIdsToCreate.includes(record.lookup_id))
    //   .map((record) => {
    //     return db.user_profile_manufacturer.create({
    //       data: {
    //         user_profile_id: Number(userId),
    //         manufacturer_lu: record.lookup_id,
    //       },
    //     });
    //   });

    // await Promise.all(createManufacturerPromises);

    return NextResponse.json(
      {
        message: 'success',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'failed',
      },
      { status: 500 }
    );
  }
}
