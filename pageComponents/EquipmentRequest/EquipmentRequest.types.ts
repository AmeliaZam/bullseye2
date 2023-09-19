import { Prisma } from 'prisma/prisma-client';
import db from '@/utils/db';

export type EquipmentRequestRecordType = Partial<
  Prisma.PromiseReturnType<typeof db.equipment_request.findUnique>
>;

export type EquipmentRequestType = EquipmentRequestRecordType[] | undefined;

export type DataType = EquipmentRequestRecordType & { id: number };
