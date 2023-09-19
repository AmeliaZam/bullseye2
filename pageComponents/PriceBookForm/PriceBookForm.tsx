'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import { PriceBookRecordType } from '@/pageComponents/PriceList/PriceList.types';
import axios from 'axios';

interface PriceBookFormProps {
  id?: string;
  data?: PriceBookRecordType | null;
}

const defaultValues: PriceBookRecordType = {
  series: null,
  model: null,
  pricebook_team: null,
  cg: null,
  required: null,
  product_no: null,
  description: null,
  dealer_cost: null,
  msrp: null,
  discontinued: null,
  notes: null,
};

const PriceBookForm = ({ id, data }: PriceBookFormProps) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  const { handleSubmit, register } = useForm({
    defaultValues: { ...defaultValues, ...data },
  });

  const createPriceBook = async (pricebook: PriceBookRecordType) => {
    try {
      await axios.post('/api/create-price-book', { pricebook });
      setSnackbarSeverity('success');
      setSnackbarMessage('Created successfully');
    } catch (e) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const updatePriceBook = async (
    pricebook: PriceBookRecordType,
    pricebookId: string
  ) => {
    try {
      await axios.patch('/api/update-price-book', { pricebook, pricebookId });
      setSnackbarSeverity('success');
      setSnackbarMessage('Updated successfully');
    } catch (e) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const onSubmit = (priceBookData: PriceBookRecordType) => {
    if (!id) createPriceBook(priceBookData);
    else updatePriceBook(priceBookData, id);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Container className="my-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="number"
                size="small"
                label="Model ID"
                {...register('series', {
                  valueAsNumber: true,
                })}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="text"
                size="small"
                label="Model"
                {...register('model')}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox {...register('required')} />}
                  label="Required Model"
                />
              </FormGroup>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Make"
                {...register('pricebook_team')}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="number"
                size="small"
                label="Category"
                {...register('cg', {
                  valueAsNumber: true,
                })}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Product Number"
                {...register('product_no')}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <TextField
                fullWidth
                type="text"
                size="small"
                label="Description"
                multiline
                rows={2}
                {...register('description')}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel htmlFor="outlined-adornment-amount">
                  Outcost
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Outcost"
                  type="number"
                  {...register('dealer_cost', {
                    valueAsNumber: true,
                  })}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel htmlFor="outlined-adornment-amount">
                  MSRP
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="MSRP"
                  type="number"
                  {...register('msrp', {
                    valueAsNumber: true,
                  })}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox {...register('discontinued')} />}
                  label="Discontinued"
                />
              </FormGroup>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <TextField
                fullWidth
                type="text"
                size="small"
                label="Notes"
                multiline
                rows={2}
                {...register('notes')}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={1}>
              <Button type="submit" variant="contained" className="bg-blue-500">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity as AlertColor}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default PriceBookForm;
