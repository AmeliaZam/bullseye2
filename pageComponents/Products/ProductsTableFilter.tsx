import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Container, Grid, TextField } from '@mui/material';

import searchTable from '@/utils/searchTable';

type ProductsTableFilterProps = {
  setRows: Dispatch<SetStateAction<any[]>>;
  data: any[];
};

const ProductsTableFilter = ({ setRows, data }: ProductsTableFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm) setRows(searchTable(data, searchTerm));
    else setRows(data);
  }, [searchTerm, data, setRows]);

  return (
    <Container className="mt-3">
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <TextField
          id="search-input"
          label="Search"
          size="small"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
      </Grid>
    </Container>
  );
};

export default ProductsTableFilter;
