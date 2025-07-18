"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  Package, 
  Edit, 
  Trash2,
  Plus,
  Save,
  Wifi,
  Tv,
  Coffee,
  Car,
  Wind,
  Shield,
  Utensils,
  Dumbbell,
  Waves,
  Flower,
  Phone,
  MapPin,
  Clock,
  Star,
  Check,
  X
} from 'react-feather';

const AmenitiesPage = () => {
  const [amenities, setAmenities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingAmenity, setEditingAmenity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAmenities();
  }, []);

  const loadAmenities = async () => {
    try {
      // Mock data - in production, this would come from your API
      const mockAmenities = [
        {
          id: 1,
          name: 'Free WiFi',
          description: 'High-speed internet access throughout the property',
          category: 'connectivity',
          icon: 'wifi',
          available: true,
          featured: true,
          location: 'All Areas',
          operatingHours: '24/7',
          cost: 'Free',
          order: 1
        },
        {
          id: 2,
          name: 'Flat-screen TV',
          description: 'Smart TV with cable channels and streaming services',
          category: 'entertainment',
          icon: 'tv',
          available: true,
          featured: true,
          location: 'All Rooms',
          operatingHours: '24/7',
          cost: 'Free',
          order: 2
        },
        {
          id: 3,
          name: 'Minibar',
          description: 'Fully stocked minibar with beverages and snacks',
          category: 'dining',
          icon: 'coffee',
          available: true,
          featured: false,
          location: 'All Rooms',
          operatingHours: '24/7',
          cost: 'Paid',
          order: 3
        },
        {
          id: 4,
          name: 'Free Parking',
          description: 'Complimentary parking for all guests',
          category: 'convenience',
          icon: 'car',
          available: true,
          featured: true,
          location: 'Parking Area',
          operatingHours: '24/7',
          cost: 'Free',
          order: 4
        },
        {
          id: 5,
          name: 'Air Conditioning',
          description: 'Climate control in all rooms',
          category: 'comfort',
          icon: 'wind',
          available: true,
          featured: true,
          location: 'All Rooms',
          operatingHours: '24/7',
          cost: 'Free',
          order: 5
        },
        {
          id: 6,
          name: 'In-room Safe',
          description: 'Secure safe for valuables',
          category: 'security',
          icon: 'shield',
          available: true,
          featured: false,
          location: 'All Rooms',
          operatingHours: '24/7',
          cost: 'Free',
          order: 6
        },
        {
          id: 7,
          name: 'Restaurant',
          description: 'On-site restaurant serving local and international cuisine',
          category: 'dining',
          icon: 'utensils',
          available: true,
          featured: true,
          location: 'Ground Floor',
          operatingHours: '6:00 AM - 10:00 PM',
          cost: 'Paid',
          order: 7
        },
        {
          id: 8,
          name: 'Fitness Center',
          description: 'Modern fitness equipment and exercise area',
          category: 'fitness',
          icon: 'dumbbell',
          available: false,
          featured: false,
          location: 'Ground Floor',
          operatingHours: '6:00 AM - 10:00 PM',
          cost: 'Free',
          order: 8
        },
        {
          id: 9,
          name: 'Swimming Pool',
          description: 'Outdoor swimming pool with sun deck',
          category: 'recreation',
          icon: 'waves',
          available: true,
          featured: true,
          location: 'Outdoor Area',
          operatingHours: '6:00 AM - 8:00 PM',
          cost: 'Free',
          order: 9
        },
        {
          id: 10,
          name: 'Garden',
          description: 'Beautiful landscaped garden area',
          category: 'recreation',
          icon: 'flower',
          available: true,
          featured: false,
          location: 'Outdoor Area',
          operatingHours: '24/7',
          cost: 'Free',
          order: 10
        },
        {
          id: 11,
          name: '24/7 Reception',
          description: 'Round-the-clock front desk service',
          category: 'service',
          icon: 'phone',
          available: true,
          featured: true,
          location: 'Lobby',
          operatingHours: '24/7',
          cost: 'Free',
          order: 11
        },
        {
          id: 12,
          name: 'Concierge Service',
          description: 'Personal concierge to assist with reservations and recommendations',
          category: 'service',
          icon: 'mapPin',
          available: true,
          featured: false,
          location: 'Lobby',
          operatingHours: '8:00 AM - 8:00 PM',
          cost: 'Free',
          order: 12
        }
      ];

      const mockCategories = [
        { id: 'connectivity', name: 'Connectivity', count: 1 },
        { id: 'entertainment', name: 'Entertainment', count: 1 },
        { id: 'dining', name: 'Dining', count: 2 },
        { id: 'convenience', name: 'Convenience', count: 1 },
        { id: 'comfort', name: 'Comfort', count: 1 },
        { id: 'security', name: 'Security', count: 1 },
        { id: 'fitness', name: 'Fitness', count: 1 },
        { id: 'recreation', name: 'Recreation', count: 2 },
        { id: 'service', name: 'Service', count: 2 }
      ];

      setAmenities(mockAmenities);
      setCategories(mockCategories);
    } catch (error) {
      console.error('Failed to load amenities:', error);
    } finally {
      setLoading(false);
    }
  };

  const iconMap = {
    wifi: Wifi,
    tv: Tv,
    coffee: Coffee,
    car: Car,
    wind: Wind,
    shield: Shield,
    utensils: Utensils,
    dumbbell: Dumbbell,
    waves: Waves,
    flower: Flower,
    phone: Phone,
    mapPin: MapPin
  };

  const filteredAmenities = selectedCategory === 'all' 
    ? amenities 
    : amenities.filter(amenity => amenity.category === selectedCategory);

  const handleEdit = (amenity) => {
    setEditingAmenity({ ...amenity });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingAmenity({
      id: Date.now(),
      name: '',
      description: '',
      category: 'comfort',
      icon: 'star',
      available: true,
      featured: false,
      location: '',
      operatingHours: '24/7',
      cost: 'Free',
      order: amenities.length + 1
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingAmenity.id && amenities.find(a => a.id === editingAmenity.id)) {
      setAmenities(amenities.map(amenity => 
        amenity.id === editingAmenity.id ? editingAmenity : amenity
      ));
    } else {
      setAmenities([...amenities, editingAmenity]);
    }
    setShowModal(false);
    setEditingAmenity(null);
  };

  const handleDelete = (id) => {
    setAmenities(amenities.filter(amenity => amenity.id !== id));
  };

  const toggleAvailability = (id) => {
    setAmenities(amenities.map(amenity => 
      amenity.id === id ? { ...amenity, available: !amenity.available } : amenity
    ));
  };

  const toggleFeatured = (id) => {
    setAmenities(amenities.map(amenity => 
      amenity.id === id ? { ...amenity, featured: !amenity.featured } : amenity
    ));
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
            <h1 className="text-3xl font-bold text-[#4A3F36]">Amenities Management</h1>
            <p className="text-gray-600 mt-1">Manage hotel amenities and services</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center px-4 py-2 bg-[#C46A26] text-white rounded-lg hover:bg-[#A85B1F] transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Amenity
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Amenities</p>
                <p className="text-2xl font-bold text-[#4A3F36]">{amenities.length}</p>
              </div>
              <Package className="w-8 h-8 text-[#C46A26]" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">{amenities.filter(a => a.available).length}</p>
              </div>
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-blue-600">{amenities.filter(a => a.featured).length}</p>
              </div>
              <Star className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-[#4A3F36]">{categories.length}</p>
              </div>
              <Package className="w-8 h-8 text-[#C46A26]" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#C46A26] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({amenities.length})
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#C46A26] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAmenities.map((amenity) => {
            const IconComponent = iconMap[amenity.icon] || Package;
            return (
              <div key={amenity.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      amenity.available ? 'bg-[#C46A26]' : 'bg-gray-400'
                    }`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#4A3F36]">{amenity.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{amenity.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {amenity.featured && (
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className={`w-3 h-3 rounded-full ${
                      amenity.available ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{amenity.description}</p>

                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3 h-3" />
                    <span>{amenity.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3" />
                    <span>{amenity.operatingHours}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      amenity.cost === 'Free' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {amenity.cost}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleAvailability(amenity.id)}
                      className={`p-1 rounded ${
                        amenity.available ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'
                      }`}
                    >
                      {amenity.available ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => toggleFeatured(amenity.id)}
                      className={`p-1 rounded ${
                        amenity.featured ? 'text-yellow-600 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(amenity)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(amenity.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Edit Modal */}
        {showModal && editingAmenity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-[#4A3F36]">
                    {editingAmenity.name ? 'Edit Amenity' : 'Add New Amenity'}
                  </h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={editingAmenity.name}
                      onChange={(e) => setEditingAmenity({...editingAmenity, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={editingAmenity.category}
                      onChange={(e) => setEditingAmenity({...editingAmenity, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editingAmenity.description}
                    onChange={(e) => setEditingAmenity({...editingAmenity, description: e.target.value})}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={editingAmenity.location}
                      onChange={(e) => setEditingAmenity({...editingAmenity, location: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Operating Hours</label>
                    <input
                      type="text"
                      value={editingAmenity.operatingHours}
                      onChange={(e) => setEditingAmenity({...editingAmenity, operatingHours: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cost</label>
                    <select
                      value={editingAmenity.cost}
                      onChange={(e) => setEditingAmenity({...editingAmenity, cost: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                    >
                      <option value="Free">Free</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                    <select
                      value={editingAmenity.icon}
                      onChange={(e) => setEditingAmenity({...editingAmenity, icon: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                    >
                      {Object.keys(iconMap).map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="available"
                      checked={editingAmenity.available}
                      onChange={(e) => setEditingAmenity({...editingAmenity, available: e.target.checked})}
                      className="mr-2"
                    />
                    <label htmlFor="available" className="text-sm font-medium text-gray-700">
                      Available
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={editingAmenity.featured}
                      onChange={(e) => setEditingAmenity({...editingAmenity, featured: e.target.checked})}
                      className="mr-2"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                      Featured
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-[#C46A26] text-white rounded-lg hover:bg-[#A85B1F]"
                  >
                    Save Amenity
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

export default AmenitiesPage;