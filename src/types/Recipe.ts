export type Recipe = {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  cookingTime: number;
  likeCount: number;
  isLiked: boolean;
};

export type RecipeData = {
  title: string;
  description: string;
  cookingTime: number;
  ingredients: string[];
};

export type RecipeFilters = {
  search?: string;
  maxCookingTime?: string;
  minIngredients?: string;
};