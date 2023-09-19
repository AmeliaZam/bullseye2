'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import axios from 'axios';
import {
  CompanyType,
  UserRoleType,
  UserProfileRecordType,
  UserProfileRolesType,
  ManufacturerType,
} from './UserForm.types';

interface UserFormProps {
  id?: string;
  companies: CompanyType;
  userRoles: UserRoleType;
  userProfile?: UserProfileRecordType;
  userProfileRoles?: UserProfileRolesType;
  manufacturers: ManufacturerType;
  userProfileManufacturers: any;
}

interface RoleSelection {
  user_role_id: number;
  user_role_long: string | null;
}

interface ManufacturerSelection {
  lookup_id: number;
  lookup_long: string | null;
}

const defaultValues = {
  first_name: null,
  last_name: null,
  user_profile_adname: null,
  user_profile_email: null,
  company_id: null,
};

const PRIMARY_ROLE_ERROR_MESSAGE = 'Primary Role is required';

const UserForm = ({
  id,
  companies,
  userRoles,
  userProfile,
  userProfileRoles = [],
  manufacturers,
  userProfileManufacturers = [],
}: UserFormProps) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [selectedRoles, setSelectedRoles] = useState(userProfileRoles);
  const [selectedManufacturers, setSelectedManufacturers] = useState(
    userProfileManufacturers
  );

  const [primaryRoleError, setPrimaryRoleError] = useState(false);

  const [primaryRole, setPrimaryRole] = useState(
    selectedRoles.find((role) => role.user_profile_role_flag === 1)
      ?.user_role_id || ''
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      ...defaultValues,
      ...userProfile,
    },
  });

  const createUser = async (
    user: UserProfileRecordType,
    userSelectedRoles: UserProfileRolesType,
    userSelectedManufacturers: any
  ) => {
    try {
      await axios.post('/api/create-user', {
        user,
        userSelectedRoles,
        userSelectedManufacturers,
      });
      setSnackbarSeverity('success');
      setSnackbarMessage('Created successfully');
    } catch (e) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const updateUser = async (
    userId: string,
    user: UserProfileRecordType,
    userSelectedRoles: UserProfileRolesType,
    userOriginalRoles: UserProfileRolesType,
    userSelectedManufacturers: any,
    userOriginalManufacturers: any
  ) => {
    try {
      await axios.patch('/api/update-user', {
        userId,
        user,
        userSelectedRoles,
        userOriginalRoles,
        userSelectedManufacturers,
        userOriginalManufacturers,
      });

      setSnackbarSeverity('success');
      setSnackbarMessage('Updated successfully');
    } catch (e) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const onSubmit = (userData: UserProfileRecordType) => {
    if (!primaryRole) {
      setPrimaryRoleError(true);
      return;
    }
    if (!id) createUser(userData, selectedRoles, selectedManufacturers);
    else
      updateUser(
        id,
        userData,
        selectedRoles,
        userProfileRoles,
        selectedManufacturers,
        userProfileManufacturers
      );
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleCompanySelect = (event: SelectChangeEvent<unknown>) => {
    setValue('company_id', event.target.value as number, {
      shouldValidate: true,
    });
  };

  const handlePrimaryRoleSelect = (event: SelectChangeEvent<unknown>) => {
    const selectedRoleId = event.target.value;
    setPrimaryRole(selectedRoleId as string);
    setPrimaryRoleError(false);
    const updatedRoles = selectedRoles.map((role) => {
      if (role.user_role_id === selectedRoleId) {
        return {
          ...role,
          user_profile_role_flag: 1,
        };
      }

      if (role.user_profile_role_flag === 1) {
        return {
          ...role,
          user_profile_role_flag: 0,
        };
      }

      return role;
    });
    setSelectedRoles(updatedRoles);
  };

  const handleRoleChange = (role: RoleSelection, e: any) => {
    if (primaryRole === role.user_role_id && e.target.checked === false) {
      setPrimaryRole('');
      setPrimaryRoleError(true);
    }

    const index = selectedRoles?.findIndex(
      (selected) => selected?.user_role_id === role.user_role_id
    );
    if (index !== -1) {
      setSelectedRoles((prevRoles) =>
        prevRoles?.filter(
          (selected) => selected?.user_role_id !== role.user_role_id
        )
      );
    } else {
      setSelectedRoles((prevRoles) => [
        ...prevRoles,
        {
          user_role_id: role.user_role_id,
          user_profile_role_flag: userProfileRoles?.some(
            (profile) => profile.user_role_id === role.user_role_id
          )
            ? 1
            : 0,
          user_role_long: role.user_role_long,
        },
      ]);
    }
  };

  const handleManufacturerChange = (manufacturer: ManufacturerSelection) => {
    const index = selectedManufacturers?.findIndex(
      (selected) => selected?.lookup_id === manufacturer.lookup_id
    );

    if (index !== -1) {
      setSelectedManufacturers((prevManufacturers) =>
        prevManufacturers?.filter(
          (selected) => selected?.lookup_id !== manufacturer.lookup_id
        )
      );
    } else {
      setSelectedManufacturers((prevManufacturers) => [
        ...prevManufacturers,
        {
          lookup_id: manufacturer.lookup_id,
        },
      ]);
    }
  };

  if (!userProfile && id) return <p>No Data Found</p>;

  return (
    <>
      <Container className="my-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="First Name"
                {...register('first_name')}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Last Name"
                {...register('last_name')}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl
                fullWidth
                size="small"
                error={Boolean(errors.company_id)}
              >
                <InputLabel id="company">Company</InputLabel>
                <Select
                  labelId="company"
                  id="company"
                  label="Company"
                  {...register('company_id', {
                    required: 'Company is required',
                  })}
                  defaultValue={
                    companies.some(
                      ({ company_id }) => company_id === userProfile?.company_id
                    )
                      ? userProfile?.company_id
                      : ''
                  }
                  onChange={handleCompanySelect}
                >
                  {companies.map(({ company_id, company_name }) => {
                    return (
                      <MenuItem value={company_id} key={company_id}>
                        {company_name}
                      </MenuItem>
                    );
                  })}
                </Select>
                {errors.company_id && (
                  <FormHelperText>{errors.company_id.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                disabled
                fullWidth
                size="small"
                label="AD Login"
                {...register('user_profile_adname')}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Email"
                {...register('user_profile_email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={Boolean(errors.user_profile_email)}
                helperText={
                  errors.user_profile_email && errors.user_profile_email.message
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl
                fullWidth
                size="small"
                error={Boolean(primaryRoleError)}
              >
                <InputLabel id="primary-role">Primary Role</InputLabel>
                <Select
                  labelId="primary-role"
                  id="primary-role"
                  label="Primary Role"
                  value={primaryRole}
                  onChange={handlePrimaryRoleSelect}
                  className="max-h-80 overflow-y-auto"
                  MenuProps={{
                    classes: { paper: 'max-h-80 overflow-y-auto' },
                  }}
                >
                  {selectedRoles?.map((role) => (
                    <MenuItem
                      value={role?.user_role_id}
                      key={role?.user_role_id}
                    >
                      {role?.user_role_long}
                    </MenuItem>
                  ))}
                </Select>
                {primaryRoleError && (
                  <FormHelperText>{PRIMARY_ROLE_ERROR_MESSAGE}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={8}>
              <Typography variant="body1">Roles</Typography>
              <Box border={1} p={2} borderColor="GrayText">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl component="fieldset">
                      {userRoles
                        .slice(0, Math.ceil(userRoles.length / 2))
                        .map((role) => (
                          <FormControlLabel
                            key={role.user_role_id}
                            label={role.user_role_long}
                            control={
                              <Checkbox
                                checked={selectedRoles?.some(
                                  (selected) =>
                                    selected?.user_role_id === role.user_role_id
                                )}
                                onChange={(e) => handleRoleChange(role, e)}
                              />
                            }
                          />
                        ))}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl component="fieldset">
                      {userRoles
                        .slice(Math.ceil(userRoles.length / 2))
                        .map((role) => (
                          <FormControlLabel
                            key={role.user_role_id}
                            label={role.user_role_long}
                            control={
                              <Checkbox
                                checked={selectedRoles?.some(
                                  (selected) =>
                                    selected?.user_role_id === role.user_role_id
                                )}
                                onChange={(e) => handleRoleChange(role, e)}
                              />
                            }
                          />
                        ))}
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1">Manufacturer</Typography>
              <Box border={1} p={2} borderColor="GrayText">
                <FormControl component="fieldset">
                  {manufacturers?.map((manufacturer) => (
                    <FormControlLabel
                      key={manufacturer.lookup_id}
                      label={manufacturer.lookup_long}
                      control={
                        <Checkbox
                          checked={selectedManufacturers?.some(
                            (selected) =>
                              selected?.lookup_id === manufacturer.lookup_id
                          )}
                          onChange={() =>
                            handleManufacturerChange(manufacturer)
                          }
                        />
                      }
                    />
                  ))}
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="bg-blue-500"
              >
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

export default UserForm;
