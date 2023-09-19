import EquipmentTable from './EquipmentTable';
import { EquipmentRequestType } from './EquipmentRequest.types';

type EquipmentRequestRootPropsType = {
  data: EquipmentRequestType;
};

const EquipmentRequestRoot = ({ data }: EquipmentRequestRootPropsType) => {
  return <EquipmentTable data={data} />;
};

export default EquipmentRequestRoot;
