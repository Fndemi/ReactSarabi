import cucumber from "../../src/assets/images/cucumber.png";
import mango from "../../src/assets/images/mango.png";
import crispy from "../../src/assets/images/crispy.png";
import mezze_pletter from "../../src/assets/images/mezze pletter.png";
import spicy_pan from "../../src/assets/images/spicy pan.png";
import gnocchi from "../../src/assets/images/gnocchi.png";
import berry from "../../src/assets/images/berry.png";
import pink_frosted from "../../src/assets/images/pink frosted.png";
import decadent from "../../src/assets/images/decadent.png";

export const menuItems = [
  // Appetizers
  {
    id: 1,
    name: "Cucumber & Cream Cheese Bites",
    description: "Fresh and light wraps with creamy cheese and crisp cucumber.",
    price: "$18",
    category: "appetizers",
    image: cucumber,
  },
  {
    id: 2,
    name: "Mango & Passion Cheesecake",
    description:
      "Creamy, fruity cheesecake with a tropical mango-passion fruit topping.",
    price: "$20",
    category: "appetizers",
    image: mango,
  },
  {
    id: 3,
    name: "Crispy Golden Bites",
    description: "Deliciously crunchy, savory bites perfect for dipping.",
    price: "$15",
    category: "appetizers",
    image: crispy,
  },

  // Main Courses
  {
    id: 4,
    name: "Cucumber & Cream Cheese Bites",
    description: "Fresh and light wraps with creamy cheese and crisp cucumber.",
    price: "$18",
    category: "mains",
    image: mezze_pletter,
  },
  {
    id: 5,
    name: "Mango & Passion Cheesecake",
    description:
      "Creamy, fruity cheesecake with a tropical mango-passion fruit topping.",
    price: "$20",
    category: "mains",
    image: spicy_pan,
  },
  {
    id: 6,
    name: "Crispy Golden Bites",
    description: "Deliciously crunchy, savory bites perfect for dipping.",
    price: "$15",
    category: "mains",
    image: gnocchi,
  },

  // Desserts
  {
    id: 7,
    name: "Cucumber & Cream Cheese Bites",
    description: "Fresh and light wraps with creamy cheese and crisp cucumber.",
    price: "$18",
    category: "desserts",
    image: berry,
  },
  {
    id: 8,
    name: "Mango & Passion Cheesecake",
    description:
      "Creamy, fruity cheesecake with a tropical mango-passion fruit topping.",
    price: "$20",
    category: "desserts",
    image: pink_frosted,
  },
  {
    id: 9,
    name: "Crispy Golden Bites",
    description: "Deliciously crunchy, savory bites perfect for dipping.",
    price: "$15",
    category: "desserts",
    image: decadent,
  },
];
