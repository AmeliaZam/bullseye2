import { signIn } from 'next-auth/react';

import { Button, Grid } from '@mui/material';

const SignInButton = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Button
        variant="outlined"
        onClick={() => signIn('azure-ad', { callbackUrl: '/' })}
      >
        Sign in
      </Button>
    </Grid>
  );
};

export default SignInButton;
