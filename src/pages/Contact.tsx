import { useState } from 'react';
import { Phone, MapPin, Mail, Clock, MessageCircle, Send } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const whatsappMessage = encodeURIComponent(
    "Hi! I'd like to order from Mom's Pizza"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg)',
        }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl md:text-2xl">We'd love to hear from you!</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
                  <p className="text-gray-700">
                    <a href="tel:7037316981" className="hover:text-red-600 transition-colors">
                      7037316981
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <a href="tel:9696351353" className="hover:text-red-600 transition-colors">
                      9696351353
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-700">
                    Deewani Road Near Ishan Nadi Pull<br />
                    Mainpuri, Uttar Pradesh
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Opening Hours</h3>
                  <p className="text-gray-700">Monday - Sunday</p>
                  <p className="text-gray-900 font-semibold">11:00 AM - 11:00 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp</h3>
                  <a
                    href={`https://wa.me/917037316981?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Chat with Us
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Us on Map</h3>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3544.9876543210!2d79.0276543!3d27.2345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDE0JzA0LjQiTiA3OcKwMDEnMzkuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mom's Pizza Location"
                ></iframe>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>

              {submitted && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            <div className="mt-8 bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Quick Order?</h3>
              <p className="mb-6">Call us directly for faster service!</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:7037316981"
                  className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>7037316981</span>
                </a>
                <a
                  href="tel:9696351353"
                  className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>9696351353</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
