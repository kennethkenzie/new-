"use client";


import { useState } from 'react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface OrderItem extends MenuItem {
  quantity: number;
}

const RestaurantMenu = () => {
  const [activeTab, setActiveTab] = useState('Main Courses');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Grilled Salmon',
      description: 'With lemon butter sauce and seasonal vegetables',
      price: 18.9,
      image: 'https://ik.imagekit.io/67mog36hf/Labrezi/MYC_7955-scaled.jpg',
      category: 'Main Courses'
    },
    {
      id: 2,
      name: 'Beef Tenderloin',
      description: '8oz prime cut with red wine reduction',
      price: 22.5,
      image: 'https://ik.imagekit.io/67mog36hf/Labrezi/images.webp?updatedAt=1743538343947',
      category: 'Main Courses'
    },
    {
      id: 3,
      name: 'Bruschetta',
      description: 'Toasted bread with tomatoes, garlic and basil',
      price: 8.5,
      image: 'https://example.com/bruschetta.jpg',
      category: 'Starters'
    },
    {
      id: 4,
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with a molten center',
      price: 9.9,
      image: 'https://example.com/lava-cake.jpg',
      category: 'Desserts'
    },
    {
      id: 5,
      name: 'Craft Cocktail',
      description: 'Seasonal ingredients with premium spirits',
      price: 12.0,
      image: 'https://example.com/cocktail.jpg',
      category: 'Drinks'
    }
  ];

  const tabs = ['Main Courses', 'Starters', 'Desserts', 'Drinks'];

  // Filter menu items by active tab
  const filteredMenuItems = menuItems.filter(item => item.category === activeTab);

  const addToOrder = (item: MenuItem) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromOrder = (id: number) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prevItems.filter((i) => i.id !== id);
    });
  };

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
       
      {/* Background Image with Overlay */}
      <div className="absolute fixed inset-0 z-0">
        {/* <img
          src="https://ik.imagekit.io/67mog36hf/Labrezi/sergey-kotenev-l4U1u0bso6E-unsplash.jpg?updatedAt=1743519064678"
          alt="Restaurant background"
          className="w-full h-full object-cover"
        /> */}
        <div className="absolute inset-0 bg-opacity-40"></div>
      </div>

      <div className="container mx-auto relative z-10 px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Restaurant & Bar</h2>
          <div className="w-24 h-1 bg-[#C49A6C] mx-auto my-4"></div>
          <p className="text-white max-w-2xl mx-auto text-lg">
            Experience our exquisite culinary offerings with locally-sourced ingredients and international flavors
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu Categories */}
          <div className="lg:w-3/5 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            {/* Menu Category Tabs */}
            <div className="flex overflow-x-auto pb-4 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-2 ${
                    activeTab === tab
                      ? 'bg-[#A80532] text-white'
                      : 'bg-[#F6F0E5] text-[#4A3F36]'
                  } rounded-full whitespace-nowrap transition-colors`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="space-y-6 mt-6">
              {filteredMenuItems.length > 0 ? (
                filteredMenuItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-[#F6F0E5] rounded-lg bg-white hover:shadow-md transition-shadow"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-[#4A3F36]">{item.name}</h3>
                        <span className="font-bold text-[#A80532]">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      <div className="flex justify-between items-center mt-3">
                        <button
                          className="bg-[#A80532] text-white px-4 py-1 rounded text-sm hover:bg-[#800026] transition-colors"
                          onClick={() => addToOrder(item)}
                        >
                          Add to Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No items available in this category
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-2/5">
            <div className="bg-[#F6F0E5] bg-opacity-90 backdrop-blur-sm p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#4A3F36] mb-4">Your Order</h3>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {orderItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">Your cart is empty</div>
                ) : (
                  <>
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-[#4A3F36]">
                            {item.name} × {item.quantity}
                          </h4>
                          <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#A80532]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                            onClick={() => removeFromOrder(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Order Total */}
              <div
                className={`border-t border-[#C49A6C] pt-4 ${
                  orderItems.length === 0 ? 'hidden' : ''
                }`}
              >
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <button className="w-full bg-[#A80532] text-white py-3 rounded hover:bg-[#800026] transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantMenu;