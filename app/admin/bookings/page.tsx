"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search,
  Download,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'react-feather';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      // Mock data - in production, this would come from your API
      const mockBookings = [
        {
          id: 'BK001',
          guestName: 'John Smith',
          email: 'john@example.com',
          phone: '+1 234 567 8900',
          roomType: 'Executive Suite',
          roomNumber: '301',
          checkIn: '2025-01-20',
          checkOut: '2025-01-23',
          guests: 2,
          children: 0,
          status: 'confirmed',
          amount: 1200,
          paymentStatus: 'paid',
          specialRequests: 'Late checkout requested',
          bookingDate: '2025-01-15',
          source: 'website'
        },
        {
          id: 'BK002',
          guestName: 'Maria Garcia',
          email: 'maria@example.com',
          phone: '+1 234 567 8901',
          roomType: 'Double Room',
          roomNumber: '205',
          checkIn: '2025-01-21',
          checkOut: '2025-01-24',
          guests: 2,
          children: 1,
          status: 'pending',
          amount: 850,
          paymentStatus: 'pending',
          specialRequests: 'Ground floor room',
          bookingDate: '2025-01-16',
          source: 'phone'
        },
        {
          id: 'BK003',
          guestName: 'David Johnson',
          email: 'david@example.com',
          phone: '+1 234 567 8902',
          roomType: 'Single Room',
          roomNumber: '102',
          checkIn: '2025-01-22',
          checkOut: '2025-01-25',
          guests: 1,
          children: 0,
          status: 'confirmed',
          amount: 600,
          paymentStatus: 'paid',
          specialRequests: 'None',
          bookingDate: '2025-01-17',
          source: 'booking.com'
        },
        {
          id: 'BK004',
          guestName: 'Sarah Wilson',
          email: 'sarah@example.com',
          phone: '+1 234 567 8903',
          roomType: 'Executive Suite',
          roomNumber: '401',
          checkIn: '2025-01-23',
          checkOut: '2025-01-26',
          guests: 2,
          children: 0,
          status: 'cancelled',
          amount: 1200,
          paymentStatus: 'refunded',
          specialRequests: 'High floor room',
          bookingDate: '2025-01-18',
          source: 'website'
        }
      ];
      
      setBookings(mockBookings);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'checked-in': return 'bg-blue-100 text-blue-800';
      case 'checked-out': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus }
        : booking
    ));
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const exportBookings = () => {
    // Mock export functionality
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Guest Name,Email,Room,Check-in,Check-out,Status,Amount\n" +
      filteredBookings.map(booking => 
        `${booking.id},${booking.guestName},${booking.email},${booking.roomType},${booking.checkIn},${booking.checkOut},${booking.status},${booking.amount}`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bookings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#4A3F36]">Bookings Management</h1>
            <p className="text-gray-600 mt-1">Manage hotel reservations and guest information</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={exportBookings}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="flex items-center px-4 py-2 bg-[#C46A26] text-white rounded-lg hover:bg-[#A85B1F] transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                >
                  <option value="all">All Bookings</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="checked-in">Checked In</option>
                  <option value="checked-out">Checked Out</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-2 font-medium text-gray-700">Booking ID</th>
                    <th className="text-left py-4 px-2 font-medium text-gray-700">Guest</th>
                    <th className="text-left py-4 px-2 font-medium text-gray-700">Room</th>
                    <th className="text-left py-4 px-2 font-medium text-gray-700">Dates</th>
                    <th className="text-left py-4 px-2 font-medium text-gray-700">Status</th>
                    <th className="text-left py-4 px-2 font-medium text-gray-700">Amount</th>
                    <th className="text-left py-4 px-2 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-2">
                        <div className="font-medium text-[#4A3F36]">{booking.id}</div>
                        <div className="text-sm text-gray-500">{booking.source}</div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#C46A26] rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-[#4A3F36]">{booking.guestName}</div>
                            <div className="text-sm text-gray-500">{booking.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="font-medium text-[#4A3F36]">{booking.roomType}</div>
                        <div className="text-sm text-gray-500">Room {booking.roomNumber}</div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="text-sm">
                          <div className="font-medium text-[#4A3F36]">{booking.checkIn}</div>
                          <div className="text-gray-500">to {booking.checkOut}</div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="font-medium text-[#4A3F36]">${booking.amount}</div>
                        <div className="text-sm text-gray-500">{booking.paymentStatus}</div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewBooking(booking)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Booking Details Modal */}
        {showModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-[#4A3F36]">Booking Details</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#4A3F36] mb-4">Guest Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium">{selectedBooking.guestName}</div>
                          <div className="text-sm text-gray-500">Guest Name</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium">{selectedBooking.email}</div>
                          <div className="text-sm text-gray-500">Email</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium">{selectedBooking.phone}</div>
                          <div className="text-sm text-gray-500">Phone</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-[#4A3F36] mb-4">Booking Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium">{selectedBooking.checkIn} to {selectedBooking.checkOut}</div>
                          <div className="text-sm text-gray-500">Stay Dates</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium">{selectedBooking.roomType} - Room {selectedBooking.roomNumber}</div>
                          <div className="text-sm text-gray-500">Accommodation</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium">${selectedBooking.amount}</div>
                          <div className="text-sm text-gray-500">Total Amount</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#4A3F36] mb-4">Special Requests</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{selectedBooking.specialRequests}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-[#C46A26] text-white rounded-lg hover:bg-[#A85B1F]">
                    Edit Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BookingsPage;