import { Phone, MapPin, Clock, Pizza } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Pizza className="w-8 h-8 text-red-500" />
              <span className="text-2xl font-bold">Mom's Pizza</span>
            </div>
            <p className="text-gray-400 mb-4">
              Freshly Made, Mom's Love in Every Slice
            </p>
            <p className="text-gray-400 text-sm">
              Experience the warmth of home-cooked pizza with premium ingredients and traditional recipes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">7037316981</p>
                  <p className="text-gray-300">9696351353</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <p className="text-gray-300">
                  Deewani Road Near Ishan Nadi Pull, Mainpuri
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
              <div className="text-gray-300">
                <p>Monday - Sunday</p>
                <p className="font-semibold">11:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 Mom's Pizza. All rights reserved. Made with love for pizza lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};
