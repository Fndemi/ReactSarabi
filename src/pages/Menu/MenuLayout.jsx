import { Link, Outlet, useLocation } from "react-router-dom";

const categories = [
  { name: "Appetizers", path: "/appetizers" },
  { name: "Main Courses", path: "/mains" },
  { name: "Desserts", path: "/Desserts" },
];

const MenuLayout = () => {
  const location = useLocation();

  return (
    <section className="bg-rose-100 min-h-screen pt-32 pb-16 px-4 sm:px-8">
      {/* ... header ... */}

      <div className="flex justify-center mb-10">
        <div className="flex border-b border-gray-400">
          {categories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className={`px-6 py-2 text-lg font-medium transition-colors relative ${
                location.pathname === category.path
                  ? "text-[#836262]"
                  : "text-gray-600 hover:text-[#836262]"
              }`}
            >
              {category.name}
              {location.pathname === category.path && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-[#836262]"></span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <Outlet />
    </section>
  );
};

export default MenuLayout;
