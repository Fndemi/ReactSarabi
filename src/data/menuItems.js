// data/menuItems.js

// Import each image from the assets/images folder
import cucumberImage from '../assets/images/cucumber.png';
import mangoImage from '../assets/images/mango.png';
import crispyImage from '../assets/images/crispy.png';
import mezzePletterImage from '../assets/images/mezze pletter.png'; // Be careful with spaces in filenames; consider renaming
import spicyPanImage from '../assets/images/spicy pan.png';
import gnocchiImage from '../assets/images/gnocchi.png';
import berryImage from '../assets/images/berry.png';
import pinkFrostedImage from '../assets/images/pink frosted.png'; // Be careful with spaces in filenames; consider renaming
import decadentImage from '../assets/images/decadent.png';

export const menuItems = [
  // Appetizers
  {
    id: 1,
    name: "Cucumber & Cream Cheese Bites",
    description: "Fresh and light wraps with creamy cheese and crisp cucumber.",
    price: "$18",
    category: "appetizers",
    image: cucumberImage, // Use the imported variable
  },
  {
    id: 2,
    name: "Mango & Passion Cheesecake",
    description:
      "Creamy, fruity cheesecake with a tropical mango-passion fruit topping.",
    price: "$20",
    category: "appetizers",
    image: mangoImage, // Use the imported variable
  },
  {
    id: 3,
    name: "Crispy Golden Bites",
    description: "Deliciously crunchy, savory bites perfect for dipping.",
    price: "$15",
    category: "appetizers",
    image: crispyImage, // Use the imported variable
  },

  // Main Courses
  {
    id: 4,
    name: "Cucumber & Cream Cheese Bites", // Note: This name is a duplicate of ID 1
    description: "Fresh and light wraps with creamy cheese and crisp cucumber.",
    price: "$18",
    category: "mains",
    image: mezzePletterImage, // Use the imported variable
  },
  {
    id: 5,
    name: "Mango & Passion Cheesecake", // Note: This name is a duplicate of ID 2
    description:
      "Creamy, fruity cheesecake with a tropical mango-passion fruit topping.",
    price: "$20",
    category: "mains",
    image: spicyPanImage, // Use the imported variable
  },
  {
    id: 6,
    name: "Crispy Golden Bites", // Note: This name is a duplicate of ID 3
    description: "Deliciously crunchy, savory bites perfect for dipping.",
    price: "$15",
    category: "mains",
    image: gnocchiImage, // Use the imported variable
  },

  // Desserts
  {
    id: 7,
    name: "Cucumber & Cream Cheese Bites", // Note: This name is a duplicate of ID 1
    description: "Fresh and light wraps with creamy cheese and crisp cucumber.",
    price: "$18",
    category: "desserts",
    image: berryImage, // Use the imported variable
  },
  {
    id: 8,
    name: "Mango & Passion Cheesecake", // Note: This name is a duplicate of ID 2
    description:
      "Creamy, fruity cheesecake with a tropical mango-passion fruit topping.",
    price: "$20",
    category: "desserts",
    image: pinkFrostedImage, // Use the imported variable
  },
  {
    id: 9,
    name: "Crispy Golden Bites", // Note: This name is a duplicate of ID 3
    description: "Deliciously crunchy, savory bites perfect for dipping.",
    price: "$15",
    category: "desserts",
    image: decadentImage, // Use the imported variable
  },
];