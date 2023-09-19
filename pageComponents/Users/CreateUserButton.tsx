'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const CreateUserButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="contained"
      className="bg-blue-500 mt-3"
      onClick={() => {
        router.push('/user-form');
      }}
    >
      New Item
    </Button>
  );
};

export default CreateUserButton;
