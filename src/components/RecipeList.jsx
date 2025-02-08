import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Card, CardContent, Typography,  Box, Grid, Dialog,  } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { createRecipe } from '../Store/ArrRecipesSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useForm } from 'react-hook-form';
import useAddRecipe from '../components/useAddRecipe';  

const RecipeList = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const recipes = useSelector(state => state.ArrRecipes.value);
    const dispatch = useDispatch();
    const [recipe, setRecipe] = useState({ name: '', prepTime: '', ingredients: '', category: '', isFavorite: false, instructions: '', image: '' });
    const { openCard, closeCard, open, form } = useAddRecipe();  

    
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 'bold', textAlign: 'center' }}>
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
                                        {recipe.category}   <RestaurantIcon sx={{ fontSize: "15px" }} />
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
                        onClick={openCard}
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
                onClose={closeCard}
                PaperProps={{
                    style: { borderRadius: 16, padding: '20px', maxWidth: '500px', margin: 'auto' },
                }}
            >
                {form}
            </Dialog>
        </Box>
    );
};

export default RecipeList;