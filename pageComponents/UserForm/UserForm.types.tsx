import { Prisma } from 'prisma/prisma-client';
import db from '@/utils/db';

export type CompanyType = Prisma.PromiseReturnType<typeof db.company.findMany>;
export type UserRoleType = Prisma.PromiseReturnType<
  typeof db.user_role.findMany
>;
export type UserProfileRecordType = Partial<
  Prisma.PromiseReturnType<typeof db.user_profile.findUnique>
>;

export type UserProfileRolesRecordType = Partial<
  Prisma.PromiseReturnType<typeof db.user_profile_role.findUnique>
>;

export type UserProfileRolesType =
  | (UserProfileRolesRecordType & {
      user_role_long: string | null | undefined;
    })[]
  | undefined;

export type ManufacturerRecordType = Partial<
  Prisma.PromiseReturnType<typeof db.lookup.findUnique>
>;
export type ManufacturerType =
  | (ManufacturerRecordType & {
      lookup_id: number;
      lookup_long: string | null;
    })[]
  | undefined;
