import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Clock, Phone, MapPin, Package, CheckCircle, XCircle } from 'lucide-react';

interface OrderWithItems {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_address?: string;
  order_type: string;
  total_amount: number;
  status: string;
  notes?: string;
  created_at: string;
  order_items: {
    quantity: number;
    price: number;
    menu_items: {
      name: string;
    };
  }[];
}

export const Admin = () => {
  if (!localStorage.getItem("adminLoggedIn")) {
    return <Navigate to="/admin-login" replace />;
  }
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            quantity,
            price,
            menu_items (
              name
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'preparing':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(order => order.status === statusFilter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage all orders in one place</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{orders.length}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {orders.filter(o => o.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'confirmed').length}
              </div>
              <div className="text-sm text-gray-600">Confirmed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {orders.filter(o => o.status === 'preparing').length}
              </div>
              <div className="text-sm text-gray-600">Preparing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {orders.filter(o => o.status === 'delivered').length}
              </div>
              <div className="text-sm text-gray-600">Delivered</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'confirmed', 'preparing', 'delivered', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  statusFilter === status
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{order.customer_name}</h3>
                    <p className="text-sm opacity-90">
                      Order placed: {new Date(order.created_at).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className={`inline-block px-4 py-2 rounded-lg font-semibold border ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="flex items-start space-x-3 mb-4">
                      <Phone className="w-5 h-5 text-red-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-semibold text-gray-900">
                          <a href={`tel:${order.customer_phone}`} className="hover:text-red-600">
                            {order.customer_phone}
                          </a>
                        </p>
                      </div>
                    </div>

                    {order.customer_email && (
                      <div className="flex items-start space-x-3 mb-4">
                        <Package className="w-5 h-5 text-red-600 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-semibold text-gray-900">{order.customer_email}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start space-x-3">
                      <Package className="w-5 h-5 text-red-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Order Type</p>
                        <p className="font-semibold text-gray-900 capitalize">{order.order_type}</p>
                      </div>
                    </div>
                  </div>

                  {order.order_type === 'delivery' && order.delivery_address && (
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Delivery Address</p>
                        <p className="font-semibold text-gray-900">{order.delivery_address}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Order Items:</h4>
                  <div className="space-y-2">
                    {order.order_items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">
                          {item.quantity}x {item.menu_items.name}
                        </span>
                        <span className="font-semibold text-gray-900">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                    <span className="text-2xl font-bold text-red-600">₹{order.total_amount}</span>
                  </div>
                </div>

                {order.notes && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600 mb-1">Special Instructions:</p>
                    <p className="text-gray-900">{order.notes}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateOrderStatus(order.id, 'confirmed')}
                    disabled={order.status === 'confirmed' || order.status === 'delivered'}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm</span>
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    disabled={order.status === 'preparing' || order.status === 'delivered'}
                    className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Preparing</span>
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'delivered')}
                    disabled={order.status === 'delivered'}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Delivered</span>
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                    disabled={order.status === 'cancelled' || order.status === 'delivered'}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
