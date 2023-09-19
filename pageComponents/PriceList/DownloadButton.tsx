import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import { PriceBookRecordType } from './PriceList.types';

type DownloadButtonPropsType = {
  data: PriceBookRecordType[];
};

const DownloadButton = ({ data }: DownloadButtonPropsType) => {
  const handleExport = () => {
    const dataWithConvertedBigInt = data.map((obj) => {
      return { ...obj, price_book_id: String(obj?.price_book_id) };
    });
    const worksheet = XLSX.utils.json_to_sheet(dataWithConvertedBigInt);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PriceList');
    const date = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `priceBook-${date}.xlsx`, { compression: true });
  };

  return (
    <Button
      variant="contained"
      className="bg-blue-500"
      onClick={() => {
        handleExport();
      }}
    >
      Download Excel
    </Button>
  );
};

export default DownloadButton;
