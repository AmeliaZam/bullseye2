import EquipmentRequest from '@/pageComponents/EquipmentRequest';
import db from '@/utils/db';

const EquipmentRequestPage = async () => {
  try {
    const data = await db.equipment_request.findMany();

    return <EquipmentRequest data={data} />;
  } catch {
    return <h1>Failed to fetch data from API</h1>;
  }
};

export default EquipmentRequestPage;
