import { menuItems } from "../../data/menuItems";
import MenuItem from "../../components/MenuItem";

export default function Desserts() {
  const desserts = menuItems.filter((item) => item.category === "desserts");

  return (
    <div className=" grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {desserts.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
}
