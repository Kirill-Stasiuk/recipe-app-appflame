import React, { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    search: string;
    maxCookingTime: string;
    minIngredients: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<Props['filters']>>;
  onApply: () => void;
};

const FilterModal = ({ isOpen, onClose, filters, setFilters, onApply }: Props) => {
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 400);

  const [maxCookingTime, setMaxCookingTime] = useState(filters.maxCookingTime);
  const [minIngredients, setMinIngredients] = useState(filters.minIngredients);

  useEffect(() => {
    setFilters((f) => ({ ...f, search: debouncedSearch }));
  }, [debouncedSearch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Filter Recipes</h2>

        <label className="block text-sm font-medium mb-1">Search</label>
        <input
          type="text"
          placeholder="e.g. chicken, soup..."
          className="w-full border p-2 mb-3"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1">Max Cooking Time (minutes)</label>
        <input
          type="number"
          placeholder="e.g. 30"
          className="w-full border p-2 mb-3"
          value={maxCookingTime}
          onChange={(e) => setMaxCookingTime(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1">Min Ingredients</label>
        <input
          type="number"
          placeholder="e.g. 3"
          className="w-full border p-2 mb-3"
          value={minIngredients}
          onChange={(e) => setMinIngredients(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded cursor-pointer">Cancel</button>
          <button
            onClick={() => {
              setFilters((f) => ({
                ...f,
                maxCookingTime,
                minIngredients,
              }));
              onApply();
              onClose();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
