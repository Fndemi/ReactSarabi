export default function MenuItem({ item }) {
  return (
    <article className="bg-[#C9A995] rounded-xl p-4 flex gap-4 items-start shadow-md">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 rounded-md object-cover"
      />
      <div>
        <h2 className="text-lg font-semibold mb-1">{item.name}</h2>
        <p className="text-sm text-gray-700 mb-1">{item.description}</p>
        <p className="font-bold text-sm">PRICE: {item.price}</p>
      </div>
    </article>
  );
}
