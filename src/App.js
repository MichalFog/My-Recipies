import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar';
const LazyHome = React.lazy(() => import('./components/Home'));
const LazyRecipeList = React.lazy(() => import('./components/RecipeList'));
const LazyLogin=React.lazy(()=> import('./components/Login'));
const LazyRecipeDetails=React.lazy(()=> import('./components/RecipeDetails'));

function App() {
  return (
    <>
      <AppBar />
      <Suspense fallback={<div>טוען...</div>}>
        <Routes>
          <Route path="/" element={<LazyHome />} />
          <Route path="/recipeList" element={<LazyRecipeList />} />
          <Route path="/recipeList/:id" element={<LazyRecipeDetails/>}/>
          <Route path="/login" element={<LazyLogin />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
