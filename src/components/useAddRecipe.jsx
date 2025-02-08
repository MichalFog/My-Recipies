import { createRecipe } from '../Store/ArrRecipesSlice';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import {useDispatch,useSelector}from 'react-redux';
import {  Typography, Button,  Paper, Grid, TextField, MenuItem, FormControlLabel, Checkbox,Select,Dialog } from '@mui/material';


const useAddRecipe=()=>
{
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.ArrRecipes.value);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        const imageUrl = data.image || '/HomePage.webp';
        const newRecipe = {
          ...data,
          id: recipes.length + 1,
          ingredients: data.ingredients.split('\n'),
          instructions: data.instructions.split('\n'),
          image: imageUrl,  
        };
    
        dispatch(createRecipe(newRecipe));
        setOpen(false);
      };
    
      const openCard = () => {
        setOpen(true);
      };
    
      const closeCard = () => {
        setOpen(false);
      };
      return {
        openCard,
        closeCard,
        open,
        register,
        handleSubmit,
        onSubmit,
        form: (
          <Dialog open={open} onClose={closeCard} PaperProps={{ style: { borderRadius: 16, padding: '20px', maxWidth: '500px', margin: 'auto' } }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h5" gutterBottom align="center">
                  הוסף מתכון חדש
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="שם המתכון *"
                      variant="outlined"
                      name="name"
                      {...register("name", { required: true })}
                      error={Boolean(errors.name)}
                      helperText={errors.name ? "שם המתכון הוא שדה חובה" : ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="זמן הכנה"
                      variant="outlined"
                      name="prepTime"
                      {...register("prepTime", { required: true ,min:1})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="רכיבים (כל רכיב בשורה נפרדת)"
                      variant="outlined"
                      name="ingredients"
                      {...register("ingredients", { required: true })}
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="הוראות הכנה (כל שלב בשורה נפרדת)"
                      variant="outlined"
                      name="instructions"
                      {...register("instructions", { required: true })}
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="קישור לתמונה"
                      variant="outlined"
                      name="image"
                      {...register("image")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">קטגוריה</Typography>
                    <Select
                      fullWidth
                      name="category"
                      {...register("category", { required: true })}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>בחר קטגוריה</MenuItem>
                      <MenuItem value="בשרי">בשרי</MenuItem>
                      <MenuItem value="חלבי">חלבי</MenuItem>
                      <MenuItem value="פרווה">פרווה</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isFavorite"
                          {...register("isFavorite")}
                        />
                      }
                      label="מועדף"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ width: "400px" }}
                    >
                      הוסף מתכון
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          </Dialog>
        )
      };
    };
export default useAddRecipe;