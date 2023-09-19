import OrdersTable from './OrdersTable';
import { ResponseType } from './OrdersTable.types';

type OrdersRootPropsType = {
  ordersTableData: ResponseType;
  salesTeamsData: string[];
};

const OrdersRoot = ({
  ordersTableData,
  salesTeamsData,
}: OrdersRootPropsType) => {
  return (
    <OrdersTable
      ordersTableData={ordersTableData}
      salesTeamsData={salesTeamsData}
    />
  );
};

export default OrdersRoot;
