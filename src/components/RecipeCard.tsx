import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../hooks/AuthContext';
import { useRouter } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeRecipe, unlikeRecipe } from '../api/recipe';
import type { Recipe } from '../types/Recipe';

type Props = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => (recipe.isLiked ? unlikeRecipe(recipe.id) : likeRecipe(recipe.id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || 'Failed to like the recipe');
    },
  });

  const handleLike = () => {
    if (!user) {
      router.navigate({ to: '/login' });
      return;
    }
    likeMutation.mutate();
  };

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col gap-2">
      <h2 className="font-semibold text-lg">{recipe.title}</h2>
      <p className="text-sm text-gray-600">
        {recipe.description.length > 100
          ? recipe.description.slice(0, 100) + '...'
          : recipe.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{recipe.cookingTime} min</span>
        <button
          onClick={handleLike}
          className={`relative text-xl transition cursor-pointer ${
            recipe.isLiked ? 'text-red-500' : 'text-gray-400'
          }`}
          disabled={likeMutation.isPending}
        >
          {recipe.isLiked ? <FaHeart /> : <FaRegHeart />}
          {likeMutation.isPending && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </button>
      </div>
      <span className="text-xs text-gray-400">{recipe.likeCount} likes</span>
    </div>
  );
};

export default RecipeCard;
