import { Heart, Users, Award, ChefHat } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg)',
        }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Story</h1>
          <p className="text-xl md:text-2xl">Freshly Made, Mom's Love in Every Slice</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Mom's Pizza</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Mom's Pizza was born from a simple dream - to share the warmth and love of home-cooked meals with everyone in Mainpuri. Our journey began with a mother's passion for cooking and her secret family recipes passed down through generations.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Every pizza we create is crafted with the same care and attention that a mother gives to her family's meals. We believe that food made with love tastes better, and that's exactly what we serve - pizza made with love, fresh ingredients, and traditional cooking techniques.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Located at Deewani Road Near Ishan Nadi Pull in Mainpuri, we've become a beloved part of the community, serving delicious pizzas that bring families and friends together. Whether you're celebrating a special occasion or just craving comfort food, Mom's Pizza is here to make your day special.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all">
            <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Made with Love</h3>
            <p className="text-gray-600">
              Every dish is prepared with care and attention, just like mom used to make
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all">
            <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-10 h-10 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Expert Chefs</h3>
            <p className="text-gray-600">
              Our skilled chefs bring years of experience and passion to every pizza
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality First</h3>
            <p className="text-gray-600">
              We never compromise on quality - only the finest ingredients make it to your plate
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Community Focus</h3>
            <p className="text-gray-600">
              We're proud to be part of the Mainpuri community and serve our neighbors
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-8 md:p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            To bring the comfort and joy of home-cooked food to every table in Mainpuri. We strive to create not just delicious pizzas, but memorable experiences that bring people together.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-5xl font-bold mb-2">5+</div>
              <div className="text-lg">Years of Service</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-lg">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">12+</div>
              <div className="text-lg">Signature Pizzas</div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
            What Makes Us Special
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">Fresh Ingredients Daily</h3>
              <p className="text-gray-700 leading-relaxed">
                We source fresh vegetables, premium cheese, and quality ingredients every single day. No frozen or pre-packaged items - just fresh, wholesome ingredients that make a real difference in taste.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">Traditional Recipes</h3>
              <p className="text-gray-700 leading-relaxed">
                Our recipes have been perfected over years, combining traditional cooking methods with modern flavors. Each pizza tells a story of heritage and innovation.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">Hand-Tossed Dough</h3>
              <p className="text-gray-700 leading-relaxed">
                Every pizza base is hand-tossed to perfection, ensuring the perfect texture and taste. We prepare our dough fresh daily using our special recipe.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">Customer First</h3>
              <p className="text-gray-700 leading-relaxed">
                Your satisfaction is our priority. We listen to feedback, customize orders, and go the extra mile to ensure you have the best experience every time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
