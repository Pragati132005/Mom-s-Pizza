import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ShoppingCart, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Order, OrderItem } from '../types';

export const OrderOnline = () => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [showForm, setShowForm] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    delivery_address: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const order: Order = {
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email || undefined,
        delivery_address: orderType === 'delivery' ? formData.delivery_address : undefined,
        order_type: orderType,
        total_amount: getTotalPrice(),
        notes: formData.notes || undefined,
      };

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems: OrderItem[] = cart.map((item) => ({
        order_id: orderData.id,
        menu_item_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setOrderSubmitted(true);
      clearCart();
      setFormData({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        delivery_address: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (orderSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order! We'll contact you shortly to confirm your order.
          </p>
          <div className="space-y-3">
            <Link
              to="/menu"
              className="block w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Order More
            </Link>
            <Link
              to="/"
              className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && !showForm) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious pizzas to get started!</p>
          <Link
            to="/menu"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Order</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Cart Items</h2>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-red-600 font-bold">₹{item.price}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold text-lg w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 p-2 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  Proceed to Checkout
                </button>
              )}
            </div>

            {showForm && (
              <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>

                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div className="flex gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        orderType === 'delivery'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Home Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('pickup')}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        orderType === 'pickup'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Pickup
                    </button>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="customer_phone"
                      value={formData.customer_phone}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      name="customer_email"
                      value={formData.customer_email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Delivery Address *
                      </label>
                      <textarea
                        name="delivery_address"
                        value={formData.delivery_address}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors disabled:bg-gray-400"
                  >
                    {submitting ? 'Placing Order...' : 'Place Order'}
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  <span>{orderType === 'delivery' ? '₹40' : '₹0'}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{getTotalPrice() + (orderType === 'delivery' ? 40 : 0)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> We accept cash on delivery. For any queries, call us at{' '}
                  <a href="tel:7037316981" className="text-red-600 font-semibold">
                    7037316981
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
