import { Link } from 'react-router-dom';
import { ArrowRight, Phone, ShoppingBag, Heart, Clock, Award } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen">
      <section
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg)',
        }}
      >
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to Mom's Pizza
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Freshly Made, Mom's Love in Every Slice
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg"
            >
              <span>View Menu</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/order"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Order Now</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Special Offers</h2>
            <p className="text-gray-600 text-lg">Limited time deals you don't want to miss!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all">
              <img
                src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg"
                alt="Family Deal"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-red-600 mb-2">Family Feast</h3>
                <p className="text-gray-600 mb-4">2 Large Pizzas + Garlic Bread + 1.5L Coke</p>
                <p className="text-3xl font-bold text-gray-900 mb-4">₹799</p>
                <Link
                  to="/menu"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  Order Now
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all">
              <img
                src="https://images.pexels.com/photos/4394612/pexels-photo-4394612.jpeg"
                alt="Cheese Special"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-red-600 mb-2">Cheese Burst Special</h3>
                <p className="text-gray-600 mb-4">Extra Cheese with Liquid Cheese Crust</p>
                <p className="text-3xl font-bold text-gray-900 mb-4">₹349</p>
                <Link
                  to="/menu"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  Order Now
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all">
              <img
                src="https://images.pexels.com/photos/1582803/pexels-photo-1582803.jpeg"
                alt="Combo Deal"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-red-600 mb-2">Pizza + Coke Combo</h3>
                <p className="text-gray-600 mb-4">Any Medium Pizza with 2 Coke Cans</p>
                <p className="text-3xl font-bold text-gray-900 mb-4">₹349</p>
                <Link
                  to="/menu"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Mom's Pizza?</h2>
            <p className="text-gray-600 text-lg">We serve more than just pizza - we serve love!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Made with Love</h3>
              <p className="text-gray-600">Every pizza crafted with care and mom's special touch</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Hot and fresh pizza delivered to your doorstep</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Ingredients</h3>
              <p className="text-gray-600">Only the finest and freshest ingredients used</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Ordering</h3>
              <p className="text-gray-600">Order online or call us anytime</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Order Now Available on Zomato!</h2>
          <p className="text-xl mb-8">Get your favorite pizzas delivered through Zomato or call us directly</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:7037316981"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              <span>Call: 7037316981</span>
            </a>
            <a
              href="https://www.zomato.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
            >
              Order on Zomato
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Best pizza in Mainpuri! The cheese burst is absolutely amazing. Tastes just like home-cooked food with that special touch."
              </p>
              <p className="font-semibold text-gray-900">- Rahul Sharma</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Family feast deal is perfect for gatherings. Fresh ingredients and prompt delivery. Highly recommended!"
              </p>
              <p className="font-semibold text-gray-900">- Priya Verma</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The paneer tikka pizza is to die for! Quick service and great taste. Our go-to place for pizza cravings."
              </p>
              <p className="font-semibold text-gray-900">- Amit Kumar</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
