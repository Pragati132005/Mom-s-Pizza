import { useState, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';

export const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const { addToCart } = useCart();

  const categories = ['All', 'Veg', 'Cheese', 'Special', 'Combos'];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_available', true)
        .order('category', { ascending: true });

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    setAddedItems(prev => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 2000);
  };

  const filteredItems =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-xl text-gray-600">
            Discover our delicious range of handcrafted pizzas
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all"
            >
              <div className="relative h-64">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full font-bold text-sm">
                  {item.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 h-12">{item.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-red-600">₹{item.price}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
                      addedItems.has(item.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {addedItems.has(item.id) ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
