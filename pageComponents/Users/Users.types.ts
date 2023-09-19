import { Prisma } from 'prisma/prisma-client';
import db from '@/utils/db';

export type CompanyRecordType = Partial<
  Prisma.PromiseReturnType<typeof db.company.findUnique>
>;

export type UserRecordType = Partial<
  Prisma.PromiseReturnType<typeof db.user_profile.findUnique>
>;

export type UserType = (UserRecordType & {
  company: CompanyRecordType | null;
})[];

export type DataType = UserRecordType & { company: CompanyRecordType } & {
  id: number;
};
