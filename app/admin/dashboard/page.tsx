"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../components/DashboardLayout';
import { 
  Calendar, 
  MessageSquare, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Home, 
  Star,
  Activity,
  Clock,
  CheckCircle
} from 'react-feather';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    todayBookings: 0,
    totalRevenue: 0,
    occupancyRate: 0,
    activeChats: 0,
    totalRooms: 0,
    availableRooms: 0,
    averageRating: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    // Load dashboard data
    loadDashboardData();
  }, [router]);

  const loadDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setRecentBookings(data.recentBookings);
        setRecentMessages(data.recentMessages);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Today\'s Bookings',
      value: stats.todayBookings,
      icon: Clock,
      color: 'bg-green-500',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '+18%',
      changeType: 'positive'
    },
    {
      title: 'Occupancy Rate',
      value: `${stats.occupancyRate}%`,
      icon: Hotel,
      color: 'bg-purple-500',
      change: '+3%',
      changeType: 'positive'
    },
    {
      title: 'Active Chats',
      value: stats.activeChats,
      icon: MessageSquare,
      color: 'bg-red-500',
      change: '2 new',
      changeType: 'neutral'
    },
    {
      title: 'Available Rooms',
      value: `${stats.availableRooms}/${stats.totalRooms}`,
      icon: Users,
      color: 'bg-indigo-500',
      change: '5 vacant',
      changeType: 'neutral'
    },
    {
      title: 'Average Rating',
      value: stats.averageRating.toFixed(1),
      icon: Star,
      color: 'bg-orange-500',
      change: '+0.2',
      changeType: 'positive'
    },
    {
      title: 'Website Activity',
      value: '1,234',
      icon: Activity,
      color: 'bg-pink-500',
      change: '+24%',
      changeType: 'positive'
    }
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C46A26]"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#4A3F36] mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome to La Brezi Suites Management Portal</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-sm px-2 py-1 rounded-full ${
                  card.changeType === 'positive' ? 'bg-green-100 text-green-600' :
                  card.changeType === 'negative' ? 'bg-red-100 text-red-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {card.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#4A3F36] mb-1">{card.value}</h3>
              <p className="text-gray-600 text-sm">{card.title}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#4A3F36]">Recent Bookings</h2>
              <button className="text-[#C46A26] hover:text-[#A85B1F] text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[
                { guest: 'John Smith', room: 'Executive Suite', date: '2025-01-20', status: 'Confirmed' },
                { guest: 'Maria Garcia', room: 'Double Room', date: '2025-01-21', status: 'Pending' },
                { guest: 'David Johnson', room: 'Single Room', date: '2025-01-22', status: 'Confirmed' },
                { guest: 'Sarah Wilson', room: 'Executive Suite', date: '2025-01-23', status: 'Confirmed' }
              ].map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-[#4A3F36]">{booking.guest}</p>
                    <p className="text-sm text-gray-600">{booking.room} - {booking.date}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' :
                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {booking.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#4A3F36]">Recent Messages</h2>
              <button className="text-[#C46A26] hover:text-[#A85B1F] text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[
                { sender: 'Guest Chat', message: 'What time is checkout?', time: '2 mins ago', unread: true },
                { sender: 'Sarah M.', message: 'Room service request for...', time: '15 mins ago', unread: true },
                { sender: 'Front Desk', message: 'New guest arriving early', time: '1 hour ago', unread: false },
                { sender: 'Mike T.', message: 'Pool maintenance complete', time: '2 hours ago', unread: false }
              ].map((message, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${message.unread ? 'bg-[#C46A26]' : 'bg-gray-300'}`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-[#4A3F36] text-sm">{message.sender}</p>
                      <p className="text-xs text-gray-500">{message.time}</p>
                    </div>
                    <p className="text-sm text-gray-600">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-[#4A3F36] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'New Booking', description: 'Create manual booking', icon: Calendar, color: 'bg-blue-500' },
              { title: 'Manage Rooms', description: 'Update room status', icon: Hotel, color: 'bg-green-500' },
              { title: 'View Messages', description: 'Check guest messages', icon: MessageSquare, color: 'bg-purple-500' },
              { title: 'Generate Report', description: 'Export analytics', icon: TrendingUp, color: 'bg-orange-500' }
            ].map((action, index) => (
              <button
                key={index}
                className="p-4 text-left border border-gray-200 rounded-lg hover:border-[#C46A26] hover:shadow-md transition-all"
              >
                <div className={`${action.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-medium text-[#4A3F36] mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;