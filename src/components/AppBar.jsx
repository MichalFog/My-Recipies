import React, { useState } from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, Button, Box, Avatar, Badge, Dialog, Paper, Grid, TextField, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useSelector, useDispatch } from 'react-redux';
import { createRecipe } from '../Store/ArrRecipesSlice';
import { useForm } from 'react-hook-form';

const AppBar = () => {
  const [open, setOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.ArrRecipes.value);
  const favoriteRecipes = useSelector(state =>
    state.ArrRecipes.value.filter(recipe => recipe.isFavorite)
  );

  const user = useSelector((state) => state.user_Slice);

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

  const CardOpen = () => {
    setOpen(true);
  };

  const CardClose = () => {
    setOpen(false);
  };

  return (
    <MuiAppBar position="sticky" sx={{ backgroundColor: 'rgba(139, 69, 19, 0.7)', transition: 'transform 0.3s ease', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 16px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button component={Link} to="/login">
            <Avatar sx={{ bgcolor: 'black', color: 'white' }}>
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>
          </Button>
          {user.name && (
            <PostAddIcon
              sx={{
                color: 'white',
                fontSize: '1.5rem',
                backgroundColor: 'transparent',
                borderRadius: '50%',
                transition: 'background-color 0.3s',
                '&:hover': { backgroundColor: 'white', color: 'black' }
              }}
              onClick={CardOpen}
            />
          )}
          {user.name && (
            <Box sx={{ position: 'relative' }} onMouseEnter={() => setShowFavorites(true)} onMouseLeave={() => setShowFavorites(true)}>
              <Badge badgeContent={favoriteRecipes.length} sx={{ '& .MuiBadge-badge': { backgroundColor: 'black', color: 'white', fontSize: '0.8rem' } }} showZero overlap="circular">
                <FavoriteIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
              </Badge>
            </Box>
          )}
          {showFavorites && (
            <Box
              sx={{
                position: 'absolute',
                top: '40px',
                backgroundColor: 'white',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                padding: '10px',
                zIndex: 10,
                minWidth: '135px',
              }}
            >
              {favoriteRecipes.length > 0 ? (
                favoriteRecipes.map((recipe) => (
                  <Box sx={{ padding: '8px 0', borderBottom: '1px solid #ddd', color: 'black' }} key={recipe.id}>
                    <Button onClick={() => setShowFavorites(false)} component={Link} to={`/recipeList/${recipe.id}`}>
                      {recipe.name} ❤️
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray' }}>
                  אין מתכונים מועדפים
                </Typography>
              )}
            </Box>
          )}
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'cursive', textAlign: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontFamily: "Shadows Into Light" }}>
            Flavors of Festivity
          </Link>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            בית
          </Button>
          <Button color="inherit" component={Link} to="/recipeList">
            רשימת מתכונים
          </Button>
        </Box>
      </Toolbar>

      <Dialog open={open} onClose={CardClose} PaperProps={{ style: { borderRadius: 16, padding: '20px', maxWidth: '500px', margin: 'auto' } }}>
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
                  {...register("prepTime", { required: true ,valueAsNumber: true,min:1})}
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
    </MuiAppBar>
  );
};

export default AppBar;
