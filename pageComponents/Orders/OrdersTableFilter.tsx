import { Dispatch, SetStateAction, useState } from 'react';
import {
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import { getSalesRepsData } from '@/utils/api';
import searchOrders from '@/pageComponents/Orders/searchOrdersTable';
import { ResponseType, SearchType } from './OrdersTable.types';
import monthsMapping from './monthsMapping';

type OrdersTableFilterProps = {
  setRows: Dispatch<SetStateAction<ResponseType>>;
  data: ResponseType;
  salesTeamsData: string[];
};

const INITIAL_SEARCH = {
  salesTeam: 'all',
  salesRep: '-',
  customerName: '',
  orderNo: '',
  bookedMonth: '-',
  bookedYear: null,
};

const OrdersTableFilter = ({
  setRows,
  data,
  salesTeamsData,
}: OrdersTableFilterProps) => {
  const [open, setOpen] = useState(false);
  const [salesReps, setSalesReps] = useState<string[]>([]);
  const [search, setSearch] = useState<SearchType>(INITIAL_SEARCH);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setSearch({ ...search, [name]: value });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearch({ ...search, [name]: value });
  };

  const handleSearch = () => {
    setRows(
      searchOrders(data, {
        ...search,
        bookedYear:
          search.bookedYear === null
            ? ''
            : `${search.bookedYear.getFullYear()}`,
        salesTeam: search.salesTeam === 'all' ? '' : search.salesTeam,
        salesRep: search.salesRep === '-' ? '' : search.salesRep,
        bookedMonth: search.bookedMonth === '-' ? '' : search.bookedMonth,
      })
    );
    setOpen(false);
  };

  const handleSalesTeamChange = async (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    if (value === 'all') {
      setSearch({
        ...search,
        [name]: value,
        salesRep: '-',
      });
      setSalesReps([]);
      return;
    }
    const { data: salesRepsData } = await getSalesRepsData(value);
    setSalesReps(salesRepsData.salesReps);
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const handleClearSearch = () => {
    setSearch(INITIAL_SEARCH);
    setRows(data);
    setOpen(false);
  };

  return (
    <Container className="mt-3">
      <Button variant="outlined" onClick={handleOpen}>
        Search
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="search-orders-dialog"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Search Orders
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="sales-team-label">Sales Team</InputLabel>
                <Select
                  labelId="sales-team-label"
                  id="sales-team"
                  name="salesTeam"
                  value={search.salesTeam}
                  onChange={handleSalesTeamChange}
                >
                  <MenuItem value="all">All</MenuItem>
                  {salesTeamsData.map((team: string) => (
                    <MenuItem key={team} value={team}>
                      {team}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="sales-rep-label">Sales Rep</InputLabel>
                <Select
                  labelId="sales-rep-label"
                  id="sales-rep"
                  name="salesRep"
                  value={search.salesRep}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="-">-</MenuItem>
                  {salesReps.map((team: string) => (
                    <MenuItem key={team} value={team}>
                      {team}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="customer-name"
                label="Customer Name"
                variant="standard"
                name="customerName"
                value={search.customerName}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="order-number"
                label="Order No"
                variant="standard"
                name="orderNo"
                value={search.orderNo}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="month-select-label">Booked Month</InputLabel>
                <Select
                  labelId="month-select-label"
                  id="month-select"
                  name="bookedMonth"
                  value={search.bookedMonth}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="-">-</MenuItem>
                  {monthsMapping.map((month) => (
                    <MenuItem key={month.name} value={month.value}>
                      {month.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={['year']}
                  label="Booked Year"
                  value={search.bookedYear}
                  onChange={(newValue) => {
                    setSearch({
                      ...search,
                      bookedYear: newValue ? new Date(newValue) : newValue,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" fullWidth />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClearSearch}>Clear All</Button>
          <Button onClick={handleSearch} data-testid="search-button">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrdersTableFilter;
