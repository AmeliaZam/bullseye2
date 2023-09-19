import PriceListTable from './PriceListTable';
import { PriceBookType } from './PriceList.types';

type PriceListRootPropsType = {
  data: PriceBookType;
};

const PriceListRoot = ({ data }: PriceListRootPropsType) => {
  return <PriceListTable data={data} />;
};

export default PriceListRoot;
