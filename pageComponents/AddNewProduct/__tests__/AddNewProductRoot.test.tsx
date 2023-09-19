import { render, screen } from '@testing-library/react';

import AddNewProductRoot from '../AddNewProductRoot';

const CREATE_NEW_PRODUCT_FORM_DATA = {
  modelID: '1',
  productNum: '2',
  accessoryID: '3',
  make: 'Canon',
  model: 'CapturePerfect',
  category: 'Software - Solutions',
  outcost: '$63',
  MSRP: '$70',
  speed: '50',
  description: 'Cleaning Cards for Canon Check Scanner (15pcs/box)',
  notes:
    'w/ Ranger Driver for Windows with IQA, Scanning Utility for Windows with Canon Driver (USB Cable included)',
};

describe('<AddNewProductRoot />', () => {
  const Component = () => (
    <AddNewProductRoot createProductFormData={CREATE_NEW_PRODUCT_FORM_DATA} />
  );
  it('form renders correctly', () => {
    render(<Component />);

    expect(screen.getByLabelText('Make')).toHaveValue('Canon');
    expect(screen.getByLabelText('Model')).toHaveValue('CapturePerfect');
    expect(screen.getByLabelText('Category')).toHaveValue(
      'Software - Solutions'
    );
    expect(screen.getByLabelText('Description')).toHaveValue(
      'Cleaning Cards for Canon Check Scanner (15pcs/box)'
    );
    expect(screen.getByLabelText('Notes')).toHaveValue(
      'w/ Ranger Driver for Windows with IQA, Scanning Utility for Windows with Canon Driver (USB Cable included)'
    );
  });
});
