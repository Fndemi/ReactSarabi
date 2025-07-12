import { menuItems } from "../../data/menuItems";
import MenuItem from "../../components/MenuItem";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

export default function Desserts() {
  const desserts = menuItems.filter((item) => item.category === "desserts");

  return (
    <>
      <div className="mb-15 mt-30 grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {desserts.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
      <Navbar />
      <Footer />
    </>
  );
}
