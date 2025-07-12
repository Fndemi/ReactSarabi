import Chicken from "../../src/assets/images/chicken-pizza.png";
import Burger from "../../src/assets/images/sarabi-burger.png";
import PorkLion from "../../src/assets/images/pork-loin.png";
import steak from "../../src/assets/images/steak.png";
import creamy from "../../src/assets/images/creamy.png";
import swahili from "../../src/assets/images/swahili.png";
import lentil from "../../src/assets/images/lentil.png";
import salmon from "../../src/assets/images/salmon.png";

export const dishes = [
  {
    id: 1,
    name: "Pan-African Spiced Chicken Pizza",
    description:
      "Crispy pizza with spiced chicken, sweet peppers, and a unique twist.",
    price: "$14.99",
    category: "Non-Veg",
    image: Chicken,
  },
  {
    id: 2,
    name: "Sarabi Gourmet Beef Burger",
    description:
      "Flame-grilled beef, avocado, peri-peri aioli on a brioche bun.",
    price: "$12.99",
    category: "Non-Veg",
    image: Burger,
  },
  {
    id: 3,
    name: "Rosemary & Garlic Pork Loin",
    description: "Tender pork with roasted root vegetables in a savory glaze.",
    price: "$16.99",
    category: "Non-Veg",
    image: PorkLion,
  },
  {
    id: 4,
    name: "Signature Dry-Aged Steak",
    description: "Prime steak with herb butter and layered fondant potatoes.",
    price: "$24.99",
    category: "Chef Specials",
    image: steak,
  },
  {
    id: 5,
    name: "Creamy Tilapia & Spinach Curry",
    description:
      "Lake Victoria tilapia in a luscious coconut curry with spinach.",
    price: "$15.99",
    category: "Non-Veg",
    image: creamy,
  },
  {
    id: 6,
    name: "Swahili Seafood Coconut Noodles",
    description: "Tender noodles with fresh seafood in a creamy coconut broth.",
    price: "$17.99",
    category: "Chef Specials",
    image: swahili,
  },
  {
    id: 7,
    name: "African Lentil Bolognese",
    description:
      "Rich lentil bolognese with African spices, tossed with tagliatelle.",
    price: "$13.99",
    category: "Veg",
    image: lentil,
  },
  {
    id: 8,
    name: "Lakeside Salmon with Mango Salsa",
    description: "Pan-seared salmon over a vibrant mango-avocado salsa.",
    price: "$19.99",
    category: "Chef Specials",
    image: salmon,
  },
];
