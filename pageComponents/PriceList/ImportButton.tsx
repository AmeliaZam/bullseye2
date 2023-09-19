'use client';

import React, { ChangeEvent, useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import readXLSXFile from '@/utils/readXLSXFile';
import axios from 'axios';

const ImportButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setIsLoading(true);
      const jsonData = await readXLSXFile(file);

      await axios.post('/api/xlsx', { jsonData });

      setSnackbarSeverity('success');
      setSnackbarMessage('File data saved successfully');
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage(
        `Error reading XLSX file. Offending row: ${error?.response?.data?.offendingRow}`
      );
    } finally {
      setOpenSnackbar(true);
      setIsLoading(false);
    }

    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  return (
    <>
      <Button
        disabled={isLoading}
        variant="contained"
        component="label"
        className="bg-blue-500"
      >
        {isLoading ? <span>Importing ...</span> : <span>Import</span>}
        <input type="file" accept=".xlsx" hidden onChange={handleFileChange} />
      </Button>

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

export default ImportButton;
