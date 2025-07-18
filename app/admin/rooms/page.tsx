"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  Home, 
  Edit, 
  Trash2,
  Plus,
  DollarSign,
  Users,
  Wifi,
  Tv,
  Coffee,
  Car,
  Wind,
  Shield,
  Save,
  Eye,
  Calendar,
  Settings,
  Image as ImageIcon,
  Upload,
  X
} from 'react-feather';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      // Mock data - in production, this would come from your API
      const mockRooms = [
        {
          id: 1,
          name: 'Executive Suite',
          type: 'suite',
          number: '301',
          floor: 3,
          capacity: 2,
          beds: 1,
          bedType: 'King',
          area: 45,
          basePrice: 299,
          weekendPrice: 349,
          status: 'available',
          amenities: ['wifi', 'tv', 'minibar', 'balcony', 'ac', 'safe'],
          images: [
            'https://ik.imagekit.io/67mog36hf/Labrezi/executive-suite-1.jpg',
            'https://ik.imagekit.io/67mog36hf/Labrezi/executive-suite-2.jpg'
          ],
          description: 'Luxurious executive suite with panoramic city views, king-size bed, and separate living area.',
          features: [
            'Panoramic city views',
            'Separate living area',
            'Work desk',
            'Premium bedding',
            'Marble bathroom',
            'Complimentary breakfast'
          ],
          bookings: [
            { checkIn: '2025-01-20', checkOut: '2025-01-23', guest: 'John Smith' },
            { checkIn: '2025-01-25', checkOut: '2025-01-28', guest: 'Maria Garcia' }
          ]
        },
        {
          id: 2,
          name: 'Double Room',
          type: 'standard',
          number: '205',
          floor: 2,
          capacity: 2,
          beds: 1,
          bedType: 'Queen',
          area: 30,
          basePrice: 199,
          weekendPrice: 229,
          status: 'occupied',
          amenities: ['wifi', 'tv', 'ac', 'safe'],
          images: [
            'https://ik.imagekit.io/67mog36hf/Labrezi/double-room-1.jpg',
            'https://ik.imagekit.io/67mog36hf/Labrezi/double-room-2.jpg'
          ],
          description: 'Comfortable double room with modern amenities and garden views.',
          features: [
            'Garden views',
            'Modern bathroom',
            'Work desk',
            'Complimentary WiFi',
            'Daily housekeeping'
          ],
          bookings: [
            { checkIn: '2025-01-18', checkOut: '2025-01-22', guest: 'David Johnson' }
          ]
        },
        {
          id: 3,
          name: 'Single Room',
          type: 'standard',
          number: '102',
          floor: 1,
          capacity: 1,
          beds: 1,
          bedType: 'Single',
          area: 20,
          basePrice: 149,
          weekendPrice: 169,
          status: 'maintenance',
          amenities: ['wifi', 'tv', 'ac'],
          images: [
            'https://ik.imagekit.io/67mog36hf/Labrezi/single-room-1.jpg'
          ],
          description: 'Cozy single room perfect for solo travelers.',
          features: [
            'Compact design',
            'Work desk',
            'Modern bathroom',
            'Complimentary WiFi'
          ],
          bookings: []
        }
      ];
      
      setRooms(mockRooms);
    } catch (error) {
      console.error('Failed to load rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const amenityIcons = {
    wifi: { icon: Wifi, label: 'WiFi' },
    tv: { icon: Tv, label: 'TV' },
    minibar: { icon: Coffee, label: 'Minibar' },
    balcony: { icon: Wind, label: 'Balcony' },
    ac: { icon: Wind, label: 'AC' },
    safe: { icon: Shield, label: 'Safe' },
    parking: { icon: Car, label: 'Parking' }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'reserved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const updateRoomPrice = (roomId, priceType, newPrice) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, [priceType]: parseFloat(newPrice) }
        : room
    ));
  };

  const updateRoomStatus = (roomId, newStatus) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, status: newStatus }
        : room
    ));
  };

  const addNewRoom = () => {
    const newRoom = {
      id: Date.now(),
      name: 'New Room',
      type: 'standard',
      number: '000',
      floor: 1,
      capacity: 2,
      beds: 1,
      bedType: 'Queen',
      area: 25,
      basePrice: 199,
      weekendPrice: 229,
      status: 'available',
      amenities: ['wifi', 'tv', 'ac'],
      images: [],
      description: 'New room description',
      features: [],
      bookings: []
    };
    setRooms([...rooms, newRoom]);
    setSelectedRoom(newRoom);
    setShowModal(true);
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
            <h1 className="text-3xl font-bold text-[#4A3F36]">Room Management</h1>
            <p className="text-gray-600 mt-1">Manage rooms, pricing, and availability</p>
          </div>
          <button
            onClick={addNewRoom}
            className="flex items-center px-4 py-2 bg-[#C46A26] text-white rounded-lg hover:bg-[#A85B1F] transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Room
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'list'
                  ? 'border-b-2 border-[#C46A26] text-[#C46A26]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Room List
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'pricing'
                  ? 'border-b-2 border-[#C46A26] text-[#C46A26]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => setActiveTab('availability')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'availability'
                  ? 'border-b-2 border-[#C46A26] text-[#C46A26]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Availability
            </button>
          </div>

          <div className="p-6">
            {/* Room List Tab */}
            {activeTab === 'list' && (
              <div className="space-y-4">
                {rooms.map((room) => (
                  <div key={room.id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-[#C46A26] rounded-lg flex items-center justify-center">
                          <Home className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#4A3F36]">{room.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Room {room.number}</span>
                            <span>Floor {room.floor}</span>
                            <span>{room.area}m²</span>
                            <span>{room.capacity} guests</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#4A3F36]">${room.basePrice}/night</div>
                          <div className="text-sm text-gray-500">Weekend: ${room.weekendPrice}</div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                          {room.status}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleRoomClick(room)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRoomClick(room)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Amenities */}
                    <div className="mt-4 flex items-center space-x-3">
                      <span className="text-sm text-gray-600">Amenities:</span>
                      <div className="flex items-center space-x-2">
                        {room.amenities.map((amenity) => {
                          const AmenityIcon = amenityIcons[amenity]?.icon || Shield;
                          return (
                            <div key={amenity} className="flex items-center space-x-1 text-xs bg-white px-2 py-1 rounded">
                              <AmenityIcon className="w-3 h-3 text-gray-500" />
                              <span>{amenityIcons[amenity]?.label || amenity}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-2 font-medium text-gray-700">Room</th>
                        <th className="text-left py-4 px-2 font-medium text-gray-700">Type</th>
                        <th className="text-left py-4 px-2 font-medium text-gray-700">Base Price</th>
                        <th className="text-left py-4 px-2 font-medium text-gray-700">Weekend Price</th>
                        <th className="text-left py-4 px-2 font-medium text-gray-700">Status</th>
                        <th className="text-left py-4 px-2 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms.map((room) => (
                        <tr key={room.id} className="border-b border-gray-100">
                          <td className="py-4 px-2">
                            <div className="font-medium text-[#4A3F36]">{room.name}</div>
                            <div className="text-sm text-gray-500">Room {room.number}</div>
                          </td>
                          <td className="py-4 px-2">
                            <span className="capitalize">{room.type}</span>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4 text-gray-400" />
                              <input
                                type="number"
                                value={room.basePrice}
                                onChange={(e) => updateRoomPrice(room.id, 'basePrice', e.target.value)}
                                className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                              />
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4 text-gray-400" />
                              <input
                                type="number"
                                value={room.weekendPrice}
                                onChange={(e) => updateRoomPrice(room.id, 'weekendPrice', e.target.value)}
                                className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                              />
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <select
                              value={room.status}
                              onChange={(e) => updateRoomStatus(room.id, e.target.value)}
                              className="border border-gray-300 rounded px-2 py-1 text-sm"
                            >
                              <option value="available">Available</option>
                              <option value="occupied">Occupied</option>
                              <option value="maintenance">Maintenance</option>
                              <option value="reserved">Reserved</option>
                            </select>
                          </td>
                          <td className="py-4 px-2">
                            <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                              <Save className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Availability Tab */}
            {activeTab === 'availability' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600">Available</p>
                        <p className="text-2xl font-bold text-green-800">
                          {rooms.filter(r => r.status === 'available').length}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                        <Hotel className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-red-600">Occupied</p>
                        <p className="text-2xl font-bold text-red-800">
                          {rooms.filter(r => r.status === 'occupied').length}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-yellow-600">Maintenance</p>
                        <p className="text-2xl font-bold text-yellow-800">
                          {rooms.filter(r => r.status === 'maintenance').length}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
                        <Settings className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Room Status Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rooms.map((room) => (
                    <div key={room.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-[#4A3F36]">{room.name}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                          {room.status}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Room {room.number} • Floor {room.floor}
                      </div>
                      {room.bookings.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-gray-700">Upcoming Bookings:</p>
                          {room.bookings.slice(0, 2).map((booking, index) => (
                            <div key={index} className="bg-gray-50 rounded p-2 text-xs">
                              <p className="font-medium">{booking.guest}</p>
                              <p className="text-gray-600">{booking.checkIn} - {booking.checkOut}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Room Details Modal */}
        {showModal && selectedRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-[#4A3F36]">Room Details</h2>
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
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
                      <input
                        type="text"
                        value={selectedRoom.name}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
                      <input
                        type="text"
                        value={selectedRoom.number}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={selectedRoom.description}
                        rows="4"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                        <input
                          type="number"
                          value={selectedRoom.capacity}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Area (m²)</label>
                        <input
                          type="number"
                          value={selectedRoom.area}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Base Price</label>
                        <input
                          type="number"
                          value={selectedRoom.basePrice}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Weekend Price</label>
                        <input
                          type="number"
                          value={selectedRoom.weekendPrice}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={selectedRoom.status}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                      >
                        <option value="available">Available</option>
                        <option value="occupied">Occupied</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="reserved">Reserved</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#4A3F36] mb-4">Features</h3>
                  <div className="space-y-2">
                    {selectedRoom.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={feature}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                        />
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button className="flex items-center px-3 py-2 text-[#C46A26] hover:bg-[#C46A26] hover:text-white rounded-lg transition-colors">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Feature
                    </button>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-[#C46A26] text-white rounded-lg hover:bg-[#A85B1F]">
                    Save Changes
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

export default RoomsPage;