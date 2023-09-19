import { Prisma } from 'prisma/prisma-client';
import db from '@/utils/db';

export type PriceBookRecordType = Partial<
  Prisma.PromiseReturnType<typeof db.price_book.findUnique>
>;

export type PriceBookType = PriceBookRecordType[] | undefined;

export type DataType = PriceBookRecordType & { id: number };
