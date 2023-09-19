'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const CreatePriceListButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="contained"
      className="bg-blue-500 mt-3"
      onClick={() => {
        router.push('/price-book');
      }}
    >
      New Item
    </Button>
  );
};

export default CreatePriceListButton;
