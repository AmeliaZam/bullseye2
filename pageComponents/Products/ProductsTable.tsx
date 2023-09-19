import { useState } from 'react';

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Container } from '@mui/material';

import { ResponseType } from './ProductsTable.types';
import ProductsTableFilter from './ProductsTableFilter';
import CreateProductButton from './CreateProductButton';
import LinkWithQueryParams from './LinkWithQueryParams';

const columns: GridColDef[] = [
  {
    field: 'modelID',
    headerName: 'Series',
    width: 150,
    renderCell: (params: GridRenderCellParams) => (
      <LinkWithQueryParams params={params.row} text={params.row.modelID} />
    ),
  },
  {
    field: 'make',
    headerName: 'Make',
    width: 150,
  },
  {
    field: 'model',
    headerName: 'Model',
    width: 150,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 150,
  },
  {
    field: 'speed',
    headerName: 'Speed',
    width: 150,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 450,
  },
  {
    field: 'outcost',
    headerName: 'Outcost',
    width: 150,
  },
  {
    field: 'MSRP',
    headerName: 'MSRP',
    width: 150,
  },
];

const ASCENDING = 'asc';
const DESCENDING = 'desc';

export type ProductsTableProps = {
  data: ResponseType;
};

const ProductsTable = ({ data }: ProductsTableProps) => {
  const [rows, setRows] = useState<ResponseType>(data);

  return (
    <>
      <ProductsTableFilter setRows={setRows} data={data} />
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
      <CreateProductButton />
    </>
  );
};

export default ProductsTable;
