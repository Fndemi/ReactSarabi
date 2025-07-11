// src/components/signature-dishes.jsx
import { useState } from "react";
import { dishes } from "../data/dishes";

const SignatureDishes = () => {
  // 1. Dynamic dish rendering with .map()
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeFilter, setActiveFilter] = useState("All");

  // 3. Category filters with React state
  const categories = ["All", "Veg", "Non-Veg", "Chef Specials"];

  const filteredDishes =
    activeFilter === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === activeFilter);

  // 2. Load More functionality
  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <header className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-[#917474] text-3xl font-bold">
          Our Signature Dishes
        </h2>
        <div className="w-24 h-1 bg-[#9f7373] mx-auto mt-4"></div>
      </header>

      {/* Category filter buttons */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveFilter(category);
              setVisibleCount(3);
            }}
            className={`px-4 py-2 rounded-full text-sm sm:text-base ${
              activeFilter === category
                ? "bg-[#9f7373] text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 5. Responsive grid layout */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDishes.slice(0, visibleCount).map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl relative group"
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {dish.name}
                </h3>
              </div>

              {/* 4. Hover tooltip */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 p-4">
                <div className="text-white text-center">
                  <p className="text-sm mb-2">{dish.description}</p>
                  <p className="font-bold text-amber-400">{dish.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More button */}
        {visibleCount < filteredDishes.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-[#9f7373] text-white rounded-full hover:bg-[#e0b7b7ba] transition-colors"
            >
              Load More Dishes
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SignatureDishes;
