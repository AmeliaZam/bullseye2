import { useForm, Controller } from 'react-hook-form';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { FormValues } from './AddNewProduct.types';

type AddNewProductRootProps = {
  createProductFormData: FormValues;
};

const defaultValues = {
  modelID: '',
  productNum: '',
  accessoryID: '',
  make: '',
  model: '',
  category: '',
  outcost: '',
  MSRP: '',
  speed: '',
  description: '',
  notes: '',
};

const AddNewProductRoot = ({
  createProductFormData,
}: AddNewProductRootProps) => {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: { ...defaultValues, ...createProductFormData },
  });

  const onSubmit = (data: typeof defaultValues) => console.log(data);

  return (
    <Container className="my-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="modelID"
              control={control}
              render={({ field }) => (
                <TextField fullWidth size="small" label="Series" {...field} />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Product Number"
              {...register('productNum')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Accessory"
              {...register('accessoryID')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Make"
              {...register('make')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="text"
              size="small"
              label="Model"
              {...register('model')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="text"
              size="small"
              label="Category"
              {...register('category')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="outlined-adornment-amount">
                Outcost
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Outcost"
                {...register('outcost')}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="outlined-adornment-amount">MSRP</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="MSRP"
                {...register('MSRP')}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="text"
              size="small"
              label="Speed"
              {...register('speed')}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <TextField
              fullWidth
              type="text"
              size="small"
              label="Description"
              multiline
              rows={2}
              {...register('description')}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <TextField
              fullWidth
              type="text"
              size="small"
              label="Notes"
              {...register('notes')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={1}>
            <Button type="submit" variant="contained" className="bg-blue-500">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddNewProductRoot;
