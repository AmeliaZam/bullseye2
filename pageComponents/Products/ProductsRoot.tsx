import ProductsTable from './ProductsTable';
import { ResponseType } from './ProductsTable.types';

type ProductsRootPropsType = {
  data: ResponseType;
};

const ProductsRoot = ({ data }: ProductsRootPropsType) => {
  return <ProductsTable data={data} />;
};

export default ProductsRoot;
