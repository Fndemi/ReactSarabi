import { menuItems } from "../../data/menuItems";

export default function Appetizers() {
  const appetizers = menuItems.filter((item) => item.category === "appetizers");

  return (
    <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {appetizers.map((item) => (
        <article
          key={item.id}
          className="bg-[#C9A995] rounded-xl p-4 flex gap-4 items-start shadow-md"
        >
          {/* Image (fixed size, left side) */}
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 rounded-md object-cover"
          />

          {/* Text content */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-1 text-black">
              {item.name}
            </h2>
            <p className="text-sm text-gray-700 mb-1">{item.description}</p>
            <p className="font-bold text-sm text-black">{item.price}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
