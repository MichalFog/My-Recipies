import React, { useState } from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, Button, Box, Avatar, Badge, Dialog, Paper, Grid, TextField, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useSelector, useDispatch } from 'react-redux';
import { createRecipe } from '../Store/ArrRecipesSlice';

const AppBar = () => {
  const [open, setOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const [recipe, setRecipe] = useState({ name: '', prepTime: '', ingredients: '', category: '', isFavorite: false, instructions: '', image: '' });

  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.ArrRecipes.value);
  const favoriteRecipes = useSelector(state =>
    state.ArrRecipes.value.filter(recipe => recipe.isFavorite)
  );
  // const IDrecipe = recipes.find((r) => r.id === parseInt(id));

  const user = useSelector((state) => state.user_Slice);

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '');

  const CardOpen = () => {
    setOpen(true);
  };

  const CardClose = () => {
    setOpen(false);
  };

  const InputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecipe({
      ...recipe,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const Sumbit = () => {
    if (!recipe.name || !recipe.prepTime || !recipe.ingredients || !recipe.instructions || !recipe.category) {
      alert('יש למלאות את כל השדות');
      return;
    }
    const newRecipe = {
      ...recipe,
      id: recipes.length + 1,
      ingredients: recipe.ingredients.split('\n'),
      instructions: recipe.instructions.split('\n')
    };

    dispatch(createRecipe(newRecipe));
    setOpen(false);
  };

  return (
    <MuiAppBar
      position="sticky"
      sx={{
        backgroundColor: 'rgba(139, 69, 19, 0.7)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 16px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button component={Link} to="/login">
            <Avatar sx={{ bgcolor: 'black', color: 'white' }}>
              {getInitial(user.name)}
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
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                }
              }}
              onClick={CardOpen}
            />
          )}
          {user.name && (
            <Box
              sx={{ position: 'relative' }}
              onMouseEnter={() => setShowFavorites(true)}
              onMouseLeave={() => setShowFavorites(false)}
            >
              <Badge
                badgeContent={favoriteRecipes.length}
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: 'black',
                    color: 'white',
                    fontSize: '0.8rem',
                  },
                }}
                showZero
                overlap="circular"
              >
                <FavoriteIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
              </Badge>
            </Box>
          )}
          {showFavorites && (
            <Box
              onMouseEnter={() => setShowFavorites(true)}
              onMouseLeave={() => setShowFavorites(false)}
              sx={{
                position: 'absolute',
                top: '40px',
                // right: 0,
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
                  <Box
                    sx={{
                      padding: '8px 0',
                      borderBottom: '1px solid #ddd',
                      color: 'black',
                    }}
                  >
              <Button onClick={()=>setShowFavorites(false)} 
              component={Link} to={`/recipeList/${recipe.id}`}>
                      {recipe.name} ❤️
                      
                    </Button>

                  </Box>
                ))
              ) : (
                <Typography
                  variant="body2"
                  sx={{ textAlign: 'center', color: 'gray' }}
                >
                  אין מתכונים מועדפים
                </Typography>
              )}
            </Box>
          )}
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'cursive',
            textAlign: 'center',
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              fontFamily: "Shadows Into Light",
            }}
          >
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

      <Dialog
        open={open}
        onClose={CardClose}
        PaperProps={{
          style: { borderRadius: 16, padding: '20px', maxWidth: '500px', margin: 'auto' },
        }}
      >
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
                value={recipe.name}
                onChange={InputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="זמן הכנה"
                variant="outlined"
                name="prepTime"
                value={recipe.prepTime}
                onChange={InputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="רכיבים (כל רכיב בשורה נפרדת)"
                variant="outlined"
                name="ingredients"
                value={recipe.ingredients}
                onChange={InputChange}
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
                value={recipe.instructions}
                onChange={InputChange}
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
                value={recipe.image}
                onChange={InputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">קטגוריה</Typography>
              <Select
                fullWidth
                name="category"
                value={recipe.category}
                onChange={InputChange}
                displayEmpty
                required
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
                    checked={recipe.isFavorite}
                    onChange={InputChange}
                  />
                }
                label="מועדף"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={Sumbit}
                sx={{ width: "400px" }}
              >
                הוסף מתכון
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Dialog>
    </MuiAppBar>
  );
};

export default AppBar;
