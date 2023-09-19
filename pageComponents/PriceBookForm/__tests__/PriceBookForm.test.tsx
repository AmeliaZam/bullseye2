import { render, screen } from '@testing-library/react';

import PriceBookForm from '../PriceBookForm';

const pricebookId = '254720';

const UPDATE_PRICE_LIST_FORM_DATA = {
  series: 1,
  pricebook_team: 'Canon',
  model: 'CapturePerfect',
  required: false,
  product_no: '41664BL95AB',
  description: 'Scan to Worldox V1.1, 1L-5L',
  discontinued: true,
  notes: 'notes xyz',
};

describe('<PriceBookForm />', () => {
  it('renders add form', () => {
    render(<PriceBookForm />);

    expect(screen.getByLabelText('Model ID')).toHaveValue(null);
    expect(screen.getByLabelText('Model')).toHaveValue('');
    expect(screen.getByLabelText('Required Model')).not.toBeChecked();
    expect(screen.getByLabelText('Make')).toHaveValue('');
    expect(screen.getByLabelText('Category')).toHaveValue(null);
    expect(screen.getByLabelText('Product Number')).toHaveValue('');
    expect(screen.getByLabelText('Description')).toHaveValue('');
    expect(screen.getByLabelText('Discontinued')).not.toBeChecked();
    expect(screen.getByLabelText('Notes')).toHaveValue('');
  });

  it('renders update form', () => {
    render(
      <PriceBookForm data={UPDATE_PRICE_LIST_FORM_DATA} id={pricebookId} />
    );

    expect(screen.getByLabelText('Model ID')).toHaveValue(1);
    expect(screen.getByLabelText('Model')).toHaveValue('CapturePerfect');
    expect(screen.getByLabelText('Required Model')).not.toBeChecked();
    expect(screen.getByLabelText('Make')).toHaveValue('Canon');
    expect(screen.getByLabelText('Product Number')).toHaveValue('41664BL95AB');
    expect(screen.getByLabelText('Description')).toHaveValue(
      'Scan to Worldox V1.1, 1L-5L'
    );
    expect(screen.getByLabelText('Discontinued')).toBeChecked();
    expect(screen.getByLabelText('Notes')).toHaveValue('notes xyz');
  });
});
