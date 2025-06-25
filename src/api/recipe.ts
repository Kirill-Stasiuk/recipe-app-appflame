import type { RecipeData, RecipeFilters } from '../types/Recipe';
import axios from './axios';

export const getRecipes = async (
  page: number,
  filters: RecipeFilters
) => {
  const params: Record<string, string | number> = { page };

  if (filters.search) params.search = filters.search;
  if (filters.maxCookingTime) params.maxCookingTime = filters.maxCookingTime;
  if (filters.minIngredients) params.minIngredients = filters.minIngredients;

  const res = await axios.get('/recipes', { params });
  return res.data;
};

export const likeRecipe = async (id: number) => {
  const res = await axios.patch(`/recipes/${id}/like`);
  return res.data;
};

export const unlikeRecipe = (id: number) => {
  return axios.delete(`/recipes/${id}/like`);
};

export const createRecipe = async (data: RecipeData) => {
  const res = await axios.post('/recipes', data);
  return res.data;
};
