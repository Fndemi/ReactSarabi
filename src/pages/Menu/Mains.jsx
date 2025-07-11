import { menuItems } from "../../data/menuItems";
import MenuItem from "../../components/MenuItem";

export default function Mains() {
  const mainDishes = menuItems.filter((item) => item.category === "mains");

  return (
    <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {mainDishes.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
}
