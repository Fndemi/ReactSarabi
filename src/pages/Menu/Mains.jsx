import { menuItems } from "../../data/menuItems";
import MenuItem from "../../components/MenuItem";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

export default function Mains() {
  const mainDishes = menuItems.filter((item) => item.category === "mains");

  return (
    <>
      <Navbar />

      <div className="mb-15 mt-30 grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {mainDishes.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
      <Footer />
    </>
  );
}
