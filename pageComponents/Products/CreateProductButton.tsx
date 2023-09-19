import { Button, Container, Grid } from '@mui/material';
import { useRouter } from 'next/router';

const CreateProductButton = () => {
  const router = useRouter();

  return (
    <Container className="mt-3">
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Button
          variant="contained"
          className="bg-blue-500"
          onClick={() => router.push('/add-new-product')}
        >
          New Item
        </Button>
      </Grid>
    </Container>
  );
};

export default CreateProductButton;
