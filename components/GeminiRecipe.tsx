import React, { useState } from 'react';
import { ChefHat, Sparkles, X } from 'lucide-react';
import { getRecipeSuggestion } from '../services/geminiService';
import { useStore } from '../context/StoreContext';

const GeminiRecipe: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<string | null>(null);
  const { cart } = useStore();

  const handleGenerateRecipe = async () => {
    if (cart.length === 0) {
      setRecipe("Your cart is empty! Add some ingredients to get a custom recipe.");
      return;
    }

    setLoading(true);
    setRecipe(null);
    const ingredients = cart.map(item => item.name);
    const result = await getRecipeSuggestion(ingredients);
    setRecipe(result);
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
      >
        <ChefHat size={24} />
        <span className="font-semibold hidden md:inline">Ask Chef AI</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 border-b border-orange-100 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Sparkles className="text-orange-500" size={20} />
                  Chef AI Assistant
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Create a recipe from items in your cart
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500">Cooking up a recipe for you...</p>
                </div>
              ) : recipe ? (
                <div className="prose prose-sm prose-orange">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {recipe}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                    <ChefHat size={32} />
                  </div>
                  <p className="text-gray-600 mb-6">
                    I can suggest a delicious recipe based on the {cart.length} item{cart.length !== 1 ? 's' : ''} currently in your cart!
                  </p>
                  <button 
                    onClick={handleGenerateRecipe}
                    className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors w-full"
                  >
                    Suggest a Recipe
                  </button>
                </div>
              )}
            </div>
            
            {recipe && (
              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                <button 
                  onClick={() => setRecipe(null)}
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium px-4 py-2"
                >
                  Clear
                </button>
                <button 
                  onClick={handleGenerateRecipe}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 ml-2"
                >
                  Try Another
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GeminiRecipe;
