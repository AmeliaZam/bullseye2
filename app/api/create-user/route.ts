import { NextResponse } from 'next/server';
import db from '@/utils/db';

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  const { user, userSelectedRoles, userSelectedManufacturers } =
    await req.json();

  try {
    const createdUserProfile = await db.user_profile.create({
      data: {
        first_name: user?.first_name,
        last_name: user?.last_name,
        company_id: user?.company_id,
        user_profile_adname: user?.user_profile_adname,
        user_profile_email: user?.user_profile_email,
      },
    });

    const createdUserProfileId = createdUserProfile.user_profile_id;

    await db.user_profile_role.createMany({
      data: userSelectedRoles.map((role) => ({
        user_profile_id: createdUserProfileId,
        user_role_id: role.user_role_id,
        user_profile_role_flag: role.user_profile_role_flag,
      })),
    });

    // await db.user_profile_manufacturer.createMany({
    //   data: userSelectedManufacturers.map((manufacturer) => ({
    //     user_profile_id: createdUserProfileId,
    //     manufacturer_lu: manufacturer.lookup_id,
    //   })),
    // });

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
