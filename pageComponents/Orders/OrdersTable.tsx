import { useState } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container } from '@mui/material';

import { ResponseType } from './OrdersTable.types';
import OrdersTableFilter from './OrdersTableFilter';

const columns: GridColDef[] = [
  {
    field: 'orderNo',
    headerName: 'Order No',
    width: 170,
  },
  {
    field: 'customerName',
    headerName: 'Customer Name',
    width: 170,
  },
  {
    field: 'salesSchedule',
    headerName: 'Sales Schedule',
    width: 170,
  },
  {
    field: 'salesTeam',
    headerName: 'Sales Team',
    width: 170,
  },
  {
    field: 'salesManager',
    headerName: 'Sales Manager',
    width: 170,
  },
  {
    field: 'salesRep',
    headerName: 'Sales Rep',
    width: 170,
  },
];

const ASCENDING = 'asc';
const DESCENDING = 'desc';

export type OrdersTableProps = {
  ordersTableData: ResponseType;
  salesTeamsData: string[];
};

const OrdersTable = ({ ordersTableData, salesTeamsData }: OrdersTableProps) => {
  const [rows, setRows] = useState<ResponseType>(ordersTableData);

  return (
    <>
      <OrdersTableFilter
        setRows={setRows}
        data={ordersTableData}
        salesTeamsData={salesTeamsData}
      />
      <Container className="mt-3">
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          sortingOrder={[ASCENDING, DESCENDING]}
          autoHeight
          disableRowSelectionOnClick
          disableVirtualization
        />
      </Container>
    </>
  );
};

export default OrdersTable;
