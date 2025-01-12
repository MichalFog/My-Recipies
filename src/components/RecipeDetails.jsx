import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Card, CardContent, Typography, IconButton, Box, Grid, Divider, CardMedia } from '@mui/material';
import { updateFavorite } from '../Store/ArrRecipesSlice';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const RecipeDetails = () => {
    const { id } = useParams();
    const recipes = useSelector(state => state.ArrRecipes.value);
    const [recipe, setRecipe] = useState(null);
    const [liked, setLiked] = useState(false);
    const [moreRecipes, setMoreRecipes] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const selectedRecipe = recipes.find(recipe => recipe.id === parseInt(id));
        setRecipe(selectedRecipe);
        if (selectedRecipe) {
            setLiked(selectedRecipe.isFavorite);

            const relatedRecipes = recipes
                .filter(r => r.category === selectedRecipe.category && r.id !== selectedRecipe.id)
                .slice(0, 3);
            setMoreRecipes(relatedRecipes);
        }
    }, [id, recipes]);

    if (!recipe) {
        return <Typography variant="h4" color="textSecondary" align="center">המתכון אינו נמצא 😏</Typography>;
    }

    const ChangeLike = () => {
        const newLikedState = !liked;
        setLiked(newLikedState);
        dispatch(updateFavorite({ id: recipe.id, isFavorite: newLikedState }));
        setRecipe({ ...recipe, isFavorite: newLikedState });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundImage: `url(${recipe.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    backgroundImage: `url(${recipe.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                }}
            />
            <Box
                sx={{
                    flex: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                }}
            >
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Card elevation={0} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                        <CardContent>
                            <Typography variant="h4" component="div" sx={{
                                fontWeight: 'bold',
                                color: 'goldenrod',
                                marginBottom: 2,
                                fontSize: '2rem',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            }}>
                                {recipe.name}
                                <IconButton onClick={ChangeLike} sx={{ color: liked ? 'red' : 'default', marginBottom: 2 }}>
                                    {liked ? <FavoriteIcon sx={{ fontSize: 30 }} /> : <FavoriteBorderIcon sx={{ fontSize: 30 }} />}
                                </IconButton>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{
                                marginBottom: 2,
                                fontSize: '1.1rem',
                            }}>
                                <AccessTimeOutlinedIcon /> {recipe.prepTime}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{
                                marginBottom: 2,
                                fontSize: '1.1rem',
                            }}>
                               {recipe.category} <RestaurantIcon/>
                            </Typography>
                            <Divider sx={{ marginY: 2 }} />
                            <Typography variant="h6" sx={{
                                fontWeight: 'bold',
                                marginBottom: 2,
                                fontSize: '1.5rem',
                                color: 'goldenrod',
                            }}>:רכיבים</Typography>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li style={{ marginBottom: '8px', fontSize: '1.2rem' }}>{ingredient}</li>
                                ))}
                            </ul>
                            <Divider sx={{ marginY: 2 }} />
                            <Typography variant="h6" sx={{
                                fontWeight: 'bold',
                                marginBottom: 2,
                                fontSize: '1.5rem',
                                color: 'goldenrod',
                            }}>:הוראות הכנה</Typography>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {recipe.instructions.map((instruction, index) => (
                                    <li style={{ marginBottom: '8px', fontSize: '1.2rem' }}>{instruction}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </Box>

                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h5" sx={{
                        marginBottom: 2,
                        textAlign: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'primary.main',
                    }}>
                        :מתכונים נוספים מאותה קטגוריה
                    </Typography>
                    <Grid container spacing={2}>
                        {moreRecipes.map(recipe => (
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
                                            <Typography variant="h6" sx={{
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                            }}>
                                                {recipe.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{
                                                marginTop: 1,
                                                fontSize: '0.9rem',
                                            }}>
                                                <AccessTimeOutlinedIcon sx={{ fontSize: 14 }} /> {recipe.prepTime}
                                            </Typography>
                                            <Typography variant="body2" sx={{
                                                marginTop: 1,
                                                fontSize: '0.9rem',
                                            }}>
                                               {recipe.category}   <RestaurantIcon sx={{fontSize:"15px"}}/>
                                            </Typography>
                                        </CardContent>
                                    </Link>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default RecipeDetails;
