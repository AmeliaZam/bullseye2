'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowClassNameParams,
  GridRowParams,
} from '@mui/x-data-grid';
import { Grid } from '@mui/material';

import PriceListTableFilter from './UsersTableFilter';
import {
  UserRecordType,
  UserType,
  DataType,
  CompanyRecordType,
} from './Users.types';
import CreateUserButton from './CreateUserButton';

const columns: GridColDef[] = [
  {
    field: 'first_name',
    headerName: 'First Name',
    width: 200,
  },
  {
    field: 'last_name',
    headerName: 'Last Name',
    width: 200,
  },
  {
    field: 'company',
    headerName: 'Company',
    width: 200,
    renderCell: (params: GridRenderCellParams) =>
      `${params.row.company.company_name}`,
  },
  {
    field: 'user_profile_adname',
    headerName: 'AD Login',
    width: 200,
  },
  {
    field: 'user_profile_email',
    headerName: 'Email',
    width: 200,
  },
];

const ASCENDING = 'asc';
const DESCENDING = 'desc';

export type UsersTableProps = {
  data: UserType;
};

const UsersTable = ({ data }: UsersTableProps) => {
  const router = useRouter();

  const mappedData = useMemo(
    () =>
      data?.map(
        (
          record: UserRecordType & { company: CompanyRecordType },
          i: number
        ) => ({
          id: i,
          ...record,
        })
      ),
    [data]
  );

  const [rows, setRows] = useState<DataType[]>(mappedData);

  const handleRowClick = (params: GridRowParams) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { user_profile_id } = params.row;
    router.push(`/user-form/${user_profile_id}`);
  };

  if (!data || data.length === 0) {
    return <p>No Data Found</p>;
  }

  return (
    <>
      <Grid container justifyContent="space-between" className="my-3">
        <PriceListTableFilter setRows={setRows} data={mappedData} />
      </Grid>
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
        onRowClick={handleRowClick}
        disableVirtualization
      />
      <CreateUserButton />
    </>
  );
};

export default UsersTable;
