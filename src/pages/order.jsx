import React, { useState } from "react";
import order1 from "../assets/images/order1.png";
import order2 from "../assets/images/order2.png";
import order3 from "../assets/images/order3.png";
import cartImage from '../assets/images/cart.png';
import Navbar from '../components/Navbar'

const OrderPage = () => {
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState("delivery");

  const menuItems = [
    {
      id: 1,
      name: "Cucumber & Cream Cheese Bites",
      description:
        "Fresh and light wraps with creamy cheese and crisp cucumber.",
      price: 18,
      image: order1,
    },
    {
      id: 2,
      name: "Sarabi Mezze Platter",
      description:
        "A vibrant mix of crispy bites, fresh vegetables, and a creamy dip.",
      price: 30,
      image: order2,
    },
    {
      id: 3,
      name: "Pink Frosted Delights",
      description: "Sweet pastries with vibrant pink frosting and sprinkles.",
      price: 8,
      image: order3,
    },
  ];

  const updateOrderType = (type) => {
    setOrderType(type);
  };

  const getDeliveryTime = () => {
    return orderType === "delivery" ? "25-35 min" : "15-20 min";
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item.id !== itemId);
      }
    });
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      alert(
        `Order placed successfully! Total: $${getTotalPrice().toFixed(2)}\nOrder type: ${orderType}\nEstimated time: ${getDeliveryTime()}`
      );
      setCart([]);
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="container mx-auto px-4 py-8 bg-[#E6C3C3] sm:px-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 mt-2 sm:text-6xl sm:mb-4 sm:mt-4">
          Order Now
        </h1>
        <p className="text-base text-gray-700 sm:text-xl">
          Enjoy our delicious cuisine from the comfort of your home
        </p>
      </div>

      {/* Order Type (always at the top of content flow) */}
      <div className="mb-8 p-4 rounded-2xl order-card bg-[#C9A995] sm:p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 sm:text-2xl sm:mb-4">
          Order Type
        </h2>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button
            onClick={() => updateOrderType("delivery")}
            className={`px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 text-sm sm:px-6 sm:py-3 sm:text-base ${
              orderType === "delivery"
                ? "bg-[#EB9D69] text-white"
                : "bg-[#EB9D69] text-gray-700"
            }`}
          >
            <svg
              width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 6.75V14.25M18.25 6.75V14.25M2 14.25H26.5M22 21.75H25.75C25.75 21.75 26.375 19.625 26.75 18.25C26.875 17.75 27 17.25 27 16.75C27 16.25 26.875 15.75 26.75 15.25L25 9C24.625 7.75 23.375 6.75 22 6.75H4.5C3.83696 6.75 3.20107 7.01339 2.73223 7.48223C2.26339 7.95107 2 8.58696 2 9.25V21.75H5.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.25 24.25C9.63071 24.25 10.75 23.1307 10.75 21.75C10.75 20.3693 9.63071 19.25 8.25 19.25C6.86929 19.25 5.75 20.3693 5.75 21.75C5.75 23.1307 6.86929 24.25 8.25 24.25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.75 21.75H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19.5 24.25C20.8807 24.25 22 23.1307 22 21.75C22 20.3693 20.8807 19.25 19.5 19.25C18.1193 19.25 17 20.3693 17 21.75C17 23.1307 18.1193 24.25 19.5 24.25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Delivery</span>
          </button>
          <button
            onClick={() => updateOrderType("pickup")}
            className={`px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 text-sm sm:px-6 sm:py-3 sm:text-base ${
              orderType === "pickup"
                ? "bg-[#EB9D69] text-white"
                : "bg-[#EB9D69] text-gray-700"
            }`}
          >
            <svg
              width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 3C21.9037 3 27.5 8.59625 27.5 15.5C27.5 22.4037 21.9037 28 15 28C8.09625 28 2.5 22.4037 2.5 15.5C2.5 8.59625 8.09625 3 15 3ZM15 5.5C12.3478 5.5 9.8043 6.55357 7.92893 8.42893C6.05357 10.3043 5 12.8478 5 15.5C5 18.1522 6.05357 20.6957 7.92893 22.5711C9.8043 24.4464 12.3478 25.5 15 25.5C17.6522 25.5 20.1957 24.4464 22.0711 22.5711C23.9464 20.6957 25 18.1522 25 15.5C25 12.8478 23.9464 10.3043 22.0711 8.42893C20.1957 6.55357 17.6522 5.5 15 5.5ZM15 8C15.3062 8.00004 15.6017 8.11244 15.8305 8.31589C16.0593 8.51934 16.2054 8.79969 16.2413 9.10375L16.25 9.25V14.9825L19.6337 18.3663C19.8579 18.5912 19.9881 18.893 19.9978 19.2105C20.0075 19.5279 19.896 19.8371 19.6859 20.0753C19.4759 20.3136 19.1831 20.4629 18.8669 20.493C18.5508 20.5231 18.235 20.4318 17.9838 20.2375L17.8663 20.1337L14.1163 16.3837C13.922 16.1893 13.7972 15.9363 13.7612 15.6637L13.75 15.5V9.25C13.75 8.91848 13.8817 8.60054 14.1161 8.36612C14.3505 8.1317 14.6685 8 15 8Z"
                fill="white"
              />
            </svg>
            <span>Pick up</span>
          </button>
        </div>
      </div>

      {/* Main content area: Flex container for desktop, stacks on mobile */}
      <div className="flex flex-col lg:flex-row lg:gap-8"> {/* Adjusted to stack on mobile, row on large */}

        {/* Right Column - Order Summary (order-first on mobile, order-last on desktop) */}
        <div className="w-full mb-8 lg:w-80 order-first lg:order-last"> {/* order-first for mobile, order-last for desktop */}
          <div className="order-card p-4 rounded-2xl bg-[#C9A995] lg:sticky lg:top-8 sm:p-6">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              {/* Ensure cartImage size is consistent */}
              <img
                src={cartImage}
                alt="Shopping Cart"
                className="w-8 h-8 sm:w-8 sm:h-8" // Explicitly set size for all screen sizes
              />
              <h3 className="text-lg font-bold text-gray-800 sm:text-xl">
                Your Order({getTotalItems()})
              </h3>
            </div>

            {cart.length === 0 ? (
              <>
                <div className="text-center py-4 sm:py-8">
                  <p className="text-gray-600 text-sm sm:text-base">Your cart is empty</p>
                </div>
                <hr className="my-3 border-gray-400 sm:my-4" />
                <div className="flex justify-between items-center mb-1 text-sm sm:mb-2 sm:text-base">
                  <p className="text-gray-700">Estimated delivery time:</p>
                  <p className="text-gray-800 font-medium">
                    - min
                  </p>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <p className="text-gray-700">Minimum Order:</p>
                  <p className="text-gray-800 font-medium">
                    - $
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2 mb-4 sm:space-y-3 sm:mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-white bg-opacity-30 p-2 rounded-lg sm:p-3"
                    >
                      <div>
                        <div className="font-medium text-gray-800 text-sm sm:text-base">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-600 sm:text-sm">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-all sm:w-6 sm:h-6"
                        >
                          -
                        </button>
                        <span className="text-xs font-medium sm:text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-5 h-5 bg-green-500 text-white rounded-full text-xs hover:bg-green-600 transition-all sm:w-6 sm:h-6"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="my-3 border-gray-400 sm:my-4" />

                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Estimated delivery time:</span>
                  <span>{getDeliveryTime()}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Minimum Order:</span>
                  <span>- $</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t pt-2 sm:text-lg">
                  <span>Total:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className={`w-full bg-amber-600 text-white py-2 rounded-lg font-medium hover:bg-amber-700 transition-all mt-3 text-sm sm:py-3 sm:mt-4 sm:text-base ${
                    cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={cart.length === 0}
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Left Column - Menu (order-last on mobile, flex-1 on desktop) */}
        <div className="flex-1 order-last lg:order-first"> {/* order-last for mobile, order-first for desktop */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pl-0 sm:text-3xl sm:mb-6 lg:pl-20">
            Menu
          </h2>

          {menuItems.map((item) => (
            <div
              key={item.id}
              className="menu-item mb-4 p-2 rounded-2xl flex flex-col items-center space-y-3 bg-[#C9A995] sm:flex-row sm:space-x-4 sm:space-y-0 sm:pr-2 sm:mb-6"
            >
              <img
                src={item.image}
                className="w-full h-auto rounded-t-2xl sm:w-[150px] sm:h-[170px] sm:rounded-none sm:rounded-l-2xl"
                alt={item.name}
              />
              <div className="flex-1 text-center sm:text-left sm:pr-2">
                <h3 className="text-lg font-bold text-gray-800 mb-1 sm:text-xl sm:mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2 sm:text-base sm:mb-3">{item.description}</p>
                <p className="text-base font-bold text-gray-800 sm:text-lg">
                  PRICE: ${item.price}
                </p>
              </div>
              <button
                className="add-btn text-white px-4 py-2 rounded-lg font-medium bg-[#EB9D69] w-full sm:w-auto"
                onClick={() => addToCart(item)}
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default OrderPage;