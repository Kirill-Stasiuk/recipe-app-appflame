import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createRecipe } from '../api/recipe';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from '@tanstack/react-router';
import ErrorMessage from '../components/ErrorMessage';

const AddRecipePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    cookingTime: 0,
    ingredients: [''],
  });

  const mutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      alert('Recipe added!');
      navigate({ to: '/' });
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || 'Failed to add recipe');
    },
  });

  const handleIngredientChange = (index: number, value: string) => {
    const updated = [...form.ingredients];
    updated[index] = value;
    setForm((prev) => ({ ...prev, ingredients: updated }));
  };

  const addIngredient = () => {
    setForm((prev) => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  const removeIngredient = (index: number) => {
    const updated = form.ingredients.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, ingredients: updated }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  if (!user) {
    navigate({ to: '/login' });
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Recipe</h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        required
      />

      <textarea
        className="w-full border p-2 mb-3"
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm((f) => ({ ...f, description: e.target.value }))
        }
        required
      />

      <input
        type="number"
        className="w-full border p-2 mb-3"
        placeholder="Cooking Time (minutes)"
        value={form.cookingTime}
        onChange={(e) =>
          setForm((f) => ({ ...f, cookingTime: +e.target.value }))
        }
        required
      />

      <div className="mb-3">
        <label className="block font-semibold mb-1">Ingredients</label>
        {form.ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              className="flex-1 border p-2"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              required
            />
            {form.ingredients.length > 1 && (
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="text-red-500 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="text-blue-500 text-sm mt-1"
        >
          + Add Ingredient
        </button>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {mutation.isPending ? 'Submitting...' : 'Submit'}
      </button>

      {mutation.isError && (
        <ErrorMessage
          message={
            mutation.error?.response?.data?.message || 'Something went wrong'
          }
        />
      )}
    </form>
  );
};

export default AddRecipePage;
