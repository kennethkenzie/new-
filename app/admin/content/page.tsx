"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  Edit, 
  Image as ImageIcon, 
  Save, 
  Plus, 
  Trash2,
  Upload,
  Eye,
  ArrowUp,
  ArrowDown,
  Monitor,
  Smartphone,
  Tablet
} from 'react-feather';

const ContentPage = () => {
  const [activeTab, setActiveTab] = useState('carousel');
  const [carouselItems, setCarouselItems] = useState([]);
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      // Mock data - in production, this would come from your API
      const mockCarouselItems = [
        {
          id: 1,
          title: 'Mozambique',
          subtitle: 'Your Journey Begins Here',
          description: 'Discover the beauty of Africa',
          imageUrl: 'https://ik.imagekit.io/67mog36hf/Labrezi/carousel-1.jpg',
          buttonText: 'VIEW DESTINATIONS',
          buttonLink: '/destinations',
          order: 1,
          active: true
        },
        {
          id: 2,
          title: 'Luxury Accommodations',
          subtitle: 'Experience Ultimate Comfort',
          description: 'World-class amenities and service',
          imageUrl: 'https://ik.imagekit.io/67mog36hf/Labrezi/carousel-2.jpg',
          buttonText: 'BOOK NOW',
          buttonLink: '/booking',
          order: 2,
          active: true
        },
        {
          id: 3,
          title: 'Fine Dining',
          subtitle: 'Culinary Excellence',
          description: 'Taste the flavors of Uganda',
          imageUrl: 'https://ik.imagekit.io/67mog36hf/Labrezi/carousel-3.jpg',
          buttonText: 'VIEW MENU',
          buttonLink: '/dining',
          order: 3,
          active: true
        }
      ];

      const mockSiteContent = {
        siteTitle: 'La Brezi Suites',
        siteDescription: 'Luxury Hotel Experience in Uganda',
        heroTitle: 'ABSOLUTE LUXURY WITH A WARM SOUTHERN CALIFORNIA VIBE',
        heroSubtitle: 'An Exceptional Experience',
        aboutTitle: 'About La Brezi Suites',
        aboutText: 'Experience world-class hospitality in the heart of Uganda. Our luxury suites offer modern amenities with authentic local charm.',
        contactEmail: 'info@labrezisuites.com',
        contactPhone: '+256 753 208767',
        contactAddress: 'Sonde Misindye Jinja Kampala, Uganda',
        socialMedia: {
          facebook: '#',
          twitter: '#',
          instagram: '#',
          linkedin: '#'
        }
      };

      setCarouselItems(mockCarouselItems);
      setSiteContent(mockSiteContent);
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      // Mock save - in production, this would send to your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Content saved successfully');
    } catch (error) {
      console.error('Failed to save content:', error);
    } finally {
      setSaving(false);
    }
  };

  const addCarouselItem = () => {
    const newItem = {
      id: Date.now(),
      title: 'New Slide',
      subtitle: 'Subtitle',
      description: 'Description',
      imageUrl: '',
      buttonText: 'LEARN MORE',
      buttonLink: '#',
      order: carouselItems.length + 1,
      active: true
    };
    setCarouselItems([...carouselItems, newItem]);
  };

  const updateCarouselItem = (id, field, value) => {
    setCarouselItems(carouselItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeCarouselItem = (id) => {
    setCarouselItems(carouselItems.filter(item => item.id !== id));
  };

  const moveCarouselItem = (id, direction) => {
    const index = carouselItems.findIndex(item => item.id === id);
    if (
      (direction === 'up' && index > 0) ||
      (direction === 'down' && index < carouselItems.length - 1)
    ) {
      const newItems = [...carouselItems];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
      setCarouselItems(newItems);
    }
  };

  const updateSiteContent = (field, value) => {
    setSiteContent({ ...siteContent, [field]: value });
  };

  const handleImageUpload = (itemId, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateCarouselItem(itemId, 'imageUrl', e.target.result);
      };
      reader.readAsDataURL(file);
    }
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
            <h1 className="text-3xl font-bold text-[#4A3F36]">Content Management</h1>
            <p className="text-gray-600 mt-1">Manage website content and carousel images</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-white shadow' : ''}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewMode('tablet')}
                className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-white shadow' : ''}`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-white shadow' : ''}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={saveContent}
              disabled={saving}
              className="flex items-center px-4 py-2 bg-[#C46A26] text-white rounded-lg hover:bg-[#A85B1F] disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('carousel')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'carousel'
                  ? 'border-b-2 border-[#C46A26] text-[#C46A26]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Header Carousel
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'content'
                  ? 'border-b-2 border-[#C46A26] text-[#C46A26]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Site Content
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'preview'
                  ? 'border-b-2 border-[#C46A26] text-[#C46A26]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Preview
            </button>
          </div>

          <div className="p-6">
            {/* Carousel Tab */}
            {activeTab === 'carousel' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-[#4A3F36]">Carousel Management</h2>
                  <button
                    onClick={addCarouselItem}
                    className="flex items-center px-4 py-2 bg-[#C46A26] text-white rounded-lg hover:bg-[#A85B1F] transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Slide
                  </button>
                </div>

                <div className="space-y-4">
                  {carouselItems.map((item, index) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#4A3F36]">Slide {index + 1}</h3>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => moveCarouselItem(item.id, 'up')}
                            disabled={index === 0}
                            className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveCarouselItem(item.id, 'down')}
                            disabled={index === carouselItems.length - 1}
                            className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeCarouselItem(item.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Title
                            </label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => updateCarouselItem(item.id, 'title', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Subtitle
                            </label>
                            <input
                              type="text"
                              value={item.subtitle}
                              onChange={(e) => updateCarouselItem(item.id, 'subtitle', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <textarea
                              value={item.description}
                              onChange={(e) => updateCarouselItem(item.id, 'description', e.target.value)}
                              rows="3"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Button Text
                            </label>
                            <input
                              type="text"
                              value={item.buttonText}
                              onChange={(e) => updateCarouselItem(item.id, 'buttonText', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Button Link
                            </label>
                            <input
                              type="text"
                              value={item.buttonLink}
                              onChange={(e) => updateCarouselItem(item.id, 'buttonLink', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Image
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                              {item.imageUrl ? (
                                <div className="relative">
                                  <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="max-h-40 mx-auto rounded-lg object-cover"
                                  />
                                  <button
                                    onClick={() => updateCarouselItem(item.id, 'imageUrl', '')}
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <div className="py-8">
                                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                  <p className="text-gray-500">No image selected</p>
                                </div>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(item.id, e)}
                                className="hidden"
                                id={`image-upload-${item.id}`}
                              />
                              <label
                                htmlFor={`image-upload-${item.id}`}
                                className="mt-4 inline-flex items-center px-4 py-2 bg-[#C46A26] text-white rounded-lg hover:bg-[#A85B1F] cursor-pointer transition-colors"
                              >
                                <Upload className="w-4 h-4 mr-2" />
                                {item.imageUrl ? 'Change Image' : 'Upload Image'}
                              </label>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`active-${item.id}`}
                              checked={item.active}
                              onChange={(e) => updateCarouselItem(item.id, 'active', e.target.checked)}
                              className="mr-2"
                            />
                            <label htmlFor={`active-${item.id}`} className="text-sm font-medium text-gray-700">
                              Active
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Site Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#4A3F36]">Site Content</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Title
                      </label>
                      <input
                        type="text"
                        value={siteContent.siteTitle}
                        onChange={(e) => updateSiteContent('siteTitle', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Description
                      </label>
                      <textarea
                        value={siteContent.siteDescription}
                        onChange={(e) => updateSiteContent('siteDescription', e.target.value)}
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hero Title
                      </label>
                      <input
                        type="text"
                        value={siteContent.heroTitle}
                        onChange={(e) => updateSiteContent('heroTitle', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hero Subtitle
                      </label>
                      <input
                        type="text"
                        value={siteContent.heroSubtitle}
                        onChange={(e) => updateSiteContent('heroSubtitle', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={siteContent.contactEmail}
                        onChange={(e) => updateSiteContent('contactEmail', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={siteContent.contactPhone}
                        onChange={(e) => updateSiteContent('contactPhone', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Address
                      </label>
                      <textarea
                        value={siteContent.contactAddress}
                        onChange={(e) => updateSiteContent('contactAddress', e.target.value)}
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C46A26]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#4A3F36]">Content Preview</h2>
                <div className="bg-gray-100 rounded-lg p-6">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="relative h-64 bg-gray-200">
                      {carouselItems.filter(item => item.active).length > 0 ? (
                        <div className="relative h-full">
                          <img
                            src={carouselItems.filter(item => item.active)[0].imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <div className="text-center text-white">
                              <h1 className="text-2xl font-bold mb-2">
                                {carouselItems.filter(item => item.active)[0].title}
                              </h1>
                              <p className="text-lg">
                                {carouselItems.filter(item => item.active)[0].subtitle}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-gray-500">No active carousel items</p>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-2">{siteContent.heroTitle}</h2>
                      <p className="text-gray-600">{siteContent.heroSubtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContentPage;