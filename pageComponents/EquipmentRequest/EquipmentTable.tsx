'use client';

import { useMemo, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowClassNameParams,
} from '@mui/x-data-grid';
import EquipmentTableFilter from './EquipmentTableFilter';
import {
  EquipmentRequestRecordType,
  EquipmentRequestType,
  DataType,
} from './EquipmentRequest.types';

const columns: GridColDef[] = [
  {
    field: 'equipment_request_no',
    headerName: 'ER No',
    width: 150,
  },
  {
    field: 'requested_by',
    headerName: 'Customer',
    width: 150,
  },
  // {
  //   field: 'model',
  //   headerName: 'Model(s)',
  //   width: 150,
  // },
  {
    field: 'req_delivery_date',
    headerName: 'Delivery Date',
    width: 150,
    renderCell: (params: GridRenderCellParams) =>
      `${
        new Date(params.row.req_delivery_date).toISOString().split('T', 1)[0]
      }`,
  },
  {
    field: 'equipment_request_date',
    headerName: 'EST. Book',
    width: 150,
    renderCell: (params: GridRenderCellParams) =>
      `${
        new Date(params.row.equipment_request_date)
          .toISOString()
          .split('T', 1)[0]
      }`,
  },
  // {
  //   field: 'status',
  //   headerName: 'Status',
  //   width: 150,
  // },
  {
    field: 'special_instr',
    headerName: 'Comment',
    width: 350,
  },
];

const ASCENDING = 'asc';
const DESCENDING = 'desc';

export type EquipmentTableProps = {
  data: EquipmentRequestType;
};

const EquipmentTable = ({ data }: EquipmentTableProps) => {
  const mappedData = useMemo(
    () =>
      data?.map((record: EquipmentRequestRecordType, i: number) => ({
        id: i,
        ...record,
      })),
    [data]
  );

  const [rows, setRows] = useState<DataType[]>(
    mappedData as unknown as DataType[]
  );

  if (!data || data.length === 0) {
    return <p>No Data Found</p>;
  }

  return (
    <>
      <EquipmentTableFilter
        setRows={setRows}
        data={mappedData as unknown as DataType[]}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        sortingOrder={[ASCENDING, DESCENDING]}
        getRowClassName={(params: GridRowClassNameParams) =>
          `bg-${params.row.rowColor}-500/70`
        }
        autoHeight
        disableRowSelectionOnClick
        disableVirtualization
      />
    </>
  );
};

export default EquipmentTable;
