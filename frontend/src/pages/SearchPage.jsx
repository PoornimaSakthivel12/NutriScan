import { useState } from 'react';
import { Search as SearchIcon, Filter, Sparkles, ArrowRight } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import { SAMPLE_FOODS } from '../data/foodsData';
import SafetyDisclaimer from '../components/SafetyDisclaimer';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Fruit', 'Vegetable', 'Nut', 'Dry Fruit', 'Prepared Food', 'Grain'];

  const filteredFoods = SAMPLE_FOODS.filter(food => {
    const matchesQuery = 
      food.name.toLowerCase().includes(query.toLowerCase()) ||
      food.category.toLowerCase().includes(query.toLowerCase()) ||
      food.benefits?.some(b => b.toLowerCase().includes(query.toLowerCase()));

    const matchesCategory = 
      activeCategory === 'All' || 
      food.category === activeCategory ||
      (activeCategory === 'Nut' && (food.category === 'Nut' || food.category === 'Dry Fruit'));

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50/70 p-5 pb-28">
      {/* Header */}
      <header className="mb-4 pt-2">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">🔍 Food Search</h1>
        <p className="text-xs text-gray-500 font-medium">
          Instant nutrition, ingredient, and safety profiles
        </p>
      </header>

      {/* Search Input */}
      <div className="relative mb-3">
        <SearchIcon className="absolute left-4 top-3.5 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search e.g. Papaya, Almond, Tomato, Dosa..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white border border-gray-200/90 rounded-2xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-primary-green shadow-xs text-xs font-medium text-gray-800 placeholder-gray-400"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-3 text-xs text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-4">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat 
                ? 'bg-primary-green text-white shadow-sm' 
                : 'bg-white text-gray-600 border border-gray-200/80 hover:bg-gray-50'
            }`}
          >
            {cat === 'Prepared Food' ? '🍛 Prepared' : cat === 'Nut' ? '🥜 Nuts & Dry' : cat}
          </button>
        ))}
      </div>

      {/* Results Count & Food List */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center px-1 text-xs text-gray-500">
          <span>Found {filteredFoods.length} foods</span>
          {query && <span className="italic">filtering by "{query}"</span>}
        </div>

        {filteredFoods.length > 0 ? (
          filteredFoods.map(food => (
            <FoodCard key={food.id} food={food} />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 p-6 space-y-2">
            <div className="text-4xl mb-2">🔎</div>
            <h3 className="font-bold text-gray-800 text-sm">No exact foods found</h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Try searching for common staples like "Papaya", "Almond", "Tomato", "Idli", or "Fried Rice".
            </p>
          </div>
        )}
      </div>

      <SafetyDisclaimer type="general" />
    </div>
  );
};

export default SearchPage;
