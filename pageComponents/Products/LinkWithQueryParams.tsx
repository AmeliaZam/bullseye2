import Link from 'next/link';
import { FormValues } from '../AddNewProduct/AddNewProduct.types';

type LinkWithQueryParamsPropsType = {
  params: FormValues;
  text: string;
};

const LinkWithQueryParams = ({
  params,
  text,
}: LinkWithQueryParamsPropsType) => {
  const {
    modelID,
    productNum,
    accessoryID,
    make,
    model,
    category,
    outcost,
    MSRP,
    speed,
    description,
    notes,
  } = params;
  return (
    <Link
      href={`/add-new-product?modelID=${modelID}&productNum=${productNum}&accessoryID=${accessoryID}&make=${make}&model=${model}&category=${category}&outcost=${outcost}&MSRP=${MSRP}&speed=${speed}&description=${description}&notes=${notes}`}
      className="underline"
    >
      {text}
    </Link>
  );
};

export default LinkWithQueryParams;
