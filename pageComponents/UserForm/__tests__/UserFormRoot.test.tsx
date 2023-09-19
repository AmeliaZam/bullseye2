import { render, screen } from '@testing-library/react';

import UserFormRoot from '../UserFormRoot';

const userId = '1';

const companies = [
  {
    company_id: 1,
    company_name: 'RJY West',
    address_name: 'RJ Young Company',
    address_line1: '701 Bluff City Hwy',
    address_line2: '',
    address_state_lu: 142,
    city: 'Chattanooga',
    company_address_note: '',
    country: '',
    county: '',
    postal_code: '3741',
  },
  {
    company_id: 2,
    company_name: 'RJY Bristol',
    address_name: 'RJ Young Company',
    address_line1: '701 Bluff City Hwy',
    address_line2: '',
    address_state_lu: 142,
    city: 'Chattanooga',
    company_address_note: '',
    country: '',
    county: '',
    postal_code: '3741',
  },
];

const userRoles = [
  {
    user_role_id: 1,
    user_role_short: 'SP',
    user_role_long: 'Sales Person',
    user_role_flag: null,
  },
  {
    user_role_id: 2,
    user_role_short: 'SM',
    user_role_long: 'Sales Manager',
    user_role_flag: null,
  },
  {
    user_role_id: 3,
    user_role_short: 'ER',
    user_role_long: 'Equipment Request',
    user_role_flag: null,
  },
];

const UPDATE_USER_FORM_DATA = {
  last_name: 'adam',
  first_name: 'smith',
  company_id: 1,
  user_profile_adname: 'test',
  user_profile_email: 'adamsmith@gmail.com',
};

describe('<UserFormRoot />', () => {
  it('renders add form', () => {
    render(<UserFormRoot companies={companies} userRoles={userRoles} />);

    expect(screen.getByLabelText('Last Name')).toHaveValue('');
    expect(screen.getByLabelText('First Name')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue('');
    expect(screen.getByLabelText('AD Login')).toHaveValue('');
  });

  it('renders update form', () => {
    render(
      <UserFormRoot
        id={userId}
        companies={companies}
        userRoles={userRoles}
        userProfile={UPDATE_USER_FORM_DATA}
      />
    );

    expect(screen.getByLabelText('Last Name')).toHaveValue('adam');
    expect(screen.getByLabelText('First Name')).toHaveValue('smith');
    expect(screen.getByLabelText('AD Login')).toHaveValue('test');
    expect(screen.getByLabelText('Email')).toHaveValue('adamsmith@gmail.com');
  });

  it('roles checkboxes are correctly checked and unchecked', () => {
    render(<UserFormRoot companies={companies} userRoles={userRoles} />);

    expect(screen.getByLabelText('Sales Person')).not.toBeChecked();
    expect(screen.getByLabelText('Sales Manager')).not.toBeChecked();
    expect(screen.getByLabelText('Equipment Request')).not.toBeChecked();
  });
});
