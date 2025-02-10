import React, { useState } from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, Button, Box, Avatar, Badge, Dialog } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useSelector } from 'react-redux';
import {useAddRecipe} from '../components/useAddRecipe';  

const AppBar = () => {
  const [showFavorites, setShowFavorites] = useState(false);

  const favoriteRecipes = useSelector(state =>
    state.ArrRecipes.value.filter(recipe => recipe.isFavorite)
  );

  const user = useSelector((state) => state.user_Slice);
  const { openCard, closeCard, open, form } = useAddRecipe();  

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
              onClick={openCard}  
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
              onMouseLeave={() => setShowFavorites(false)}  
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

      {open && (
        <Dialog open={open} onClose={closeCard} PaperProps={{ style: { borderRadius: 16, padding: '20px', maxWidth: '500px', margin: 'auto' } }}>
          {form} 
        </Dialog>
      )}
    </MuiAppBar>
  );
};

export default AppBar;
