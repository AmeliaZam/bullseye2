import { render, screen } from '@testing-library/react';

import { EquipmentRequestType } from '../EquipmentRequest.types';
import EquipmentTable from '../EquipmentTable';

const data: EquipmentRequestType = [
  {
    equipment_request_no: 'HOD901',
    requested_by: 'LHC GROUP INC',
    special_instr: 'this is special instruction',
  },
];

describe('<EquipmentTable />', () => {
  it('table renders correctly', () => {
    render(<EquipmentTable data={data} />);

    expect(screen.getByText('HOD901')).toBeInTheDocument();
    expect(screen.getByText('LHC GROUP INC')).toBeInTheDocument();
    expect(screen.getByText('this is special instruction')).toBeInTheDocument();
  });
});
