import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Card, CardContent, Typography, Button, Box, Grid, Dialog, Paper, TextField, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { createRecipe } from '../Store/ArrRecipesSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const RecipeList = () => {
    const recipes = useSelector(state => state.ArrRecipes.value);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [recipe, setRecipe] = useState({ name: '', prepTime: '', ingredients: '', category: '', isFavorite: false, instructions: '', image: '' });

    const cardOpen = () => {
        setOpen(true);
    };

    const cardClose = () => {
        setOpen(false);
    };

    const cardChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRecipe({ ...recipe, [name]: type === 'checkbox' ? checked : value });
    };

    const Sumbit = () => {
        if (!recipe.name || !recipe.prepTime || !recipe.ingredients || !recipe.instructions || !recipe.category) {
            alert('יש למלאות את כל השדות ');
            return;  
        }
    
        const newRecipe = {
            ...recipe,
            id: recipes.length + 1,
            ingredients: recipe.ingredients.split('\n'),
            instructions: recipe.instructions.split('\n')
        };
        dispatch(createRecipe(newRecipe));
        setRecipe({
            name: '',
            prepTime: '',
            ingredients: '',
            category: '',
            isFavorite: false,
            instructions: '',
            image: ''
          });
        cardClose();
    };
    

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 'bold', textAlign: 'center' }}>
                {/* רשימת המתכונים */}
            </Typography>
            <Grid container spacing={4}>
                {recipes.map(recipe => (
                    <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                        <Card
                            sx={{
                                boxShadow: 3,
                                borderRadius: 2,
                                backgroundColor: '#f8f8f8',
                                position: 'relative',
                                cursor: 'pointer',
                                overflow: 'hidden', 
                            }}
                        >
                            <Link
                                to={`/recipeList/${recipe.id}`}
                                style={{
                                    textDecoration: 'none',
                                    display: 'block',
                                    color: 'inherit',
                                    position: 'relative',
                                }}
                            >
                                <img
                                    src={recipe.image}
                                    alt={recipe.name}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'cover', 
                                        display: 'block',
                                    }}
                                />
                                <CardContent
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'rgba(0, 0, 0, 0.6)',  
                                        color: 'white',
                                        padding: '16px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        height: '100%', 
                                    }}
                                >
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Box display="flex" alignItems="center">
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    marginRight: 1, 
                                                }}
                                            >
                                                {recipe.name}
                                            </Typography>
                                            {recipe.isFavorite ? (
                                                <FavoriteIcon sx={{ color: 'red' }} />
                                            ) : (
                                                <FavoriteBorderIcon sx={{ color: 'grey' }} />
                                            )}
                                        </Box>
                                    </Box>
                                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                                        <Box display="flex" alignItems="center">
                                            {recipe.prepTime}
                                            <AccessTimeOutlinedIcon
                                                style={{
                                                    marginLeft: '8px', 
                                                }}
                                            />
                                        </Box>
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                                      {recipe.category}   <RestaurantIcon sx={{fontSize:"15px"}}/>
                                    </Typography>
                                </CardContent>
                            </Link>
                        </Card>
                    </Grid>
                ))}

                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{
                            boxShadow: 3,
                            borderRadius: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                            cursor: 'pointer',
                            height: '430px',
                            backgroundColor: '#f8f8f8',
                        }}
                        onClick={cardOpen}
                    >
                        <AddIcon fontSize="large" sx={{ color: 'blue', marginBottom: 1 }} />
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'blue' }}>
                            להוספת מתכון
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

            <Dialog
                open={open}
                onClose={cardClose}
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
                                onChange={cardChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: !recipe.name ? 'red' : 'green',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="זמן הכנה"
                                variant="outlined"
                                name="prepTime"
                                value={recipe.prepTime}
                                onChange={cardChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'green',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="רכיבים (כל רכיב בשורה נפרדת)"
                                variant="outlined"
                                name="ingredients"
                                value={recipe.ingredients}
                                onChange={cardChange}
                                multiline
                                rows={4}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'green',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="הוראות הכנה (כל שלב בשורה נפרדת)"
                                variant="outlined"
                                name="instructions"
                                value={recipe.instructions}
                                onChange={cardChange}
                                multiline
                                rows={4}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'green',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="קישור לתמונה"
                                variant="outlined"
                                name="image"
                                value={recipe.image}
                                onChange={cardChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'green',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">קטגוריה</Typography>
                            <Select
                                fullWidth
                                name="category"
                                value={recipe.category}
                                onChange={cardChange}
                                displayEmpty
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'green',
                                        },
                                    },
                                }}
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
                                        onChange={cardChange}
                                        sx={{
                                            color: 'green',
                                            '&.Mui-checked': {
                                                color: 'green',
                                            },
                                        }}
                                    />
                                }
                                label="מועדף"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={Sumbit}
                                sx={{
                                    backgroundColor: 'green',
                                    '&:hover': {
                                        backgroundColor: 'darkgreen',
                                    },
                                }}
                            >
                                שמירה
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Dialog>
        </Box>
    );
};

export default RecipeList;
