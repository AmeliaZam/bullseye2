import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { TextField } from '@mui/material';

import searchTable from '@/utils/searchTable';
import { DataType } from './PriceList.types';

type PriceListTableFilterPropsType = {
  setRows: Dispatch<SetStateAction<DataType[]>>;
  data: DataType[];
};

const PriceListTableFilter = ({
  setRows,
  data,
}: PriceListTableFilterPropsType) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm) setRows(searchTable(data, searchTerm));
    else setRows(data);
  }, [searchTerm, data, setRows]);

  return (
    <TextField
      id="outlined-search-input"
      label="Search"
      size="small"
      value={searchTerm}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(e.target.value)
      }
    />
  );
};

export default PriceListTableFilter;
