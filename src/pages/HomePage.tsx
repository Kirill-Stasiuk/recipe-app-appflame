import { useRef, useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import RecipeCard from '../components/RecipeCard';
import FilterModal from '../components/FilterModal';
import { getRecipes } from '../api/recipe';
import type { Recipe } from '../types/Recipe';
import ErrorMessage from '../components/ErrorMessage';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    maxCookingTime: '',
    minIngredients: '',
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['recipes', filters],
    queryFn: ({ pageParam = 1 }) => getRecipes(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length === 10 ? pages.length + 1 : undefined,
  });

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchNextPage, hasNextPage]);

  const handleApplyFilters = () => {
    refetch();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
        >
          Filter
        </button>
      </div>

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onApply={handleApplyFilters}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <ErrorMessage message={'Something went wrong'} />
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.pages.flat().map((recipe: Recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <div ref={loaderRef} className="mt-8 text-center text-gray-500">
            {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Scroll to load more' : 'No more recipes'}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;