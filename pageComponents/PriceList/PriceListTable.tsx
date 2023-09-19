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
import { Grid, Stack } from '@mui/material';

import PriceListTableFilter from './PriceListTableFilter';
import ImportButton from './ImportButton';
import {
  PriceBookRecordType,
  PriceBookType,
  DataType,
} from './PriceList.types';
import DownloadButton from './DownloadButton';
import CreatePriceListButton from './CreatePriceListButton';

const columns: GridColDef[] = [
  // {
  //   field: 'model',
  //   headerName: 'Type',
  //   width: 150,
  // },
  {
    field: 'series',
    headerName: 'Model ID',
    width: 150,
  },
  {
    field: 'model',
    headerName: 'Model',
    width: 150,
  },
  {
    field: 'pricebook_team',
    headerName: 'Make',
    width: 150,
  },
  {
    field: 'cg',
    headerName: 'Category',
    width: 150,
  },
  // {
  //   field: 'categoryDescription',
  //   headerName: 'Category Description',
  //   width: 150,
  // },
  {
    field: 'required',
    headerName: 'Required Model',
    width: 150,
  },
  {
    field: 'product_no',
    headerName: 'Product Number',
    width: 150,
  },
  // {
  //   field: 'speed',
  //   headerName: 'Speed',
  //   width: 150,
  // },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
  },
  {
    field: 'dealer_cost',
    headerName: 'Outcost',
    width: 150,
    renderCell: (params: GridRenderCellParams) =>
      `$${[params.row.dealer_cost]}`,
  },
  {
    field: 'msrp',
    headerName: 'MSRP',
    width: 150,
    renderCell: (params: GridRenderCellParams) => `$${[params.row.msrp]}`,
  },
  {
    field: 'discontinued',
    headerName: 'Discontinued',
    width: 150,
  },
  {
    field: 'notes',
    headerName: 'Notes',
    width: 150,
  },
];

const ASCENDING = 'asc';
const DESCENDING = 'desc';

export type PriceListTableProps = {
  data: PriceBookType;
};

const PriceListTable = ({ data }: PriceListTableProps) => {
  const router = useRouter();

  const mappedData = useMemo(
    () =>
      data?.map((record: PriceBookRecordType, i: number) => ({
        id: i,
        ...record,
      })),
    [data]
  );

  const [rows, setRows] = useState<DataType[]>(
    mappedData as unknown as DataType[]
  );

  const handleRowClick = (params: GridRowParams) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { price_book_id } = params.row;
    router.push(`/price-book/${price_book_id}`);
  };

  const excelSheetData = rows.map((row) => {
    const { id, ...withoutId } = row;
    return withoutId;
  });

  if (!data || data.length === 0) {
    return <p>No Data Found</p>;
  }

  return (
    <>
      <Grid container justifyContent="space-between" className="my-3">
        <Stack direction="row" spacing={1}>
          <ImportButton />
          <DownloadButton data={excelSheetData} />
        </Stack>
        <PriceListTableFilter
          setRows={setRows}
          data={mappedData as unknown as DataType[]}
        />
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
      <CreatePriceListButton />
    </>
  );
};

export default PriceListTable;
