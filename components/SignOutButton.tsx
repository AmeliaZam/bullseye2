import { Button } from '@mui/material';
import { signOut } from 'next-auth/react';

const SignOutButton = () => {
  return (
    <Button
      color="inherit"
      onClick={() => signOut({ redirect: true, callbackUrl: '/signin' })}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
