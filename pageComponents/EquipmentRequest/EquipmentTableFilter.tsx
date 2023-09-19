import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import {
  FormControl,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  TextField,
} from '@mui/material';

import searchTable from '@/utils/searchTable';
import { DataType } from './EquipmentRequest.types';

type EquipmentTableFilterProps = {
  setRows: Dispatch<SetStateAction<DataType[]>>;
  data: DataType[];
};

const EquipmentTableFilter = ({ setRows, data }: EquipmentTableFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm) setRows(searchTable(data, searchTerm));
    else setRows(data);
  }, [searchTerm, data, setRows]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className="mb-3"
    >
      <FormControl>
        <InputLabel id="demo-simple-select-label">Company name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value="company"
          size="small"
          label="Company Name"
          onChange={() => {
            // todo
          }}
        >
          <MenuItem value="company">Company name</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="outlined-search"
        label="Search"
        size="small"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
    </Grid>
  );
};

export default EquipmentTableFilter;
