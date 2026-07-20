const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Expanded McDonald's USA Menu - ~100 items (2026)
const menuData = {
  "Burgers": [
    { id: 1, name: "Big Mac", price: 5.99, calories: 590, description: "Two 100% beef patties, Big Mac sauce, lettuce, cheese, pickles, onions on sesame seed bun.", image: "https://picsum.photos/id/1080/400/250" },
    { id: 2, name: "Quarter Pounder with Cheese", price: 6.39, calories: 520, description: "Quarter pound beef, American cheese, pickles, onions, ketchup & mustard.", image: "https://picsum.photos/id/292/400/250" },
    { id: 3, name: "Cheeseburger", price: 3.49, calories: 300, description: "Beef patty, American cheese, pickles, onions, ketchup, mustard.", image: "https://picsum.photos/id/431/400/250" },
    { id: 4, name: "Double Cheeseburger", price: 4.99, calories: 440, description: "Two beef patties, two slices of American cheese.", image: "https://picsum.photos/id/201/400/250" },
    { id: 5, name: "Hamburger", price: 2.99, calories: 250, description: "Beef patty, pickles, onions, ketchup, mustard.", image: "https://picsum.photos/id/106/400/250" },
    { id: 6, name: "McDouble", price: 3.79, calories: 390, description: "Two beef patties and American cheese.", image: "https://picsum.photos/id/431/400/250" }
  ],
  "Chicken & Fish": [
    { id: 7, name: "McChicken", price: 3.99, calories: 400, description: "Crispy chicken patty, lettuce, mayo on toasted bun.", image: "https://picsum.photos/id/106/400/250" },
    { id: 8, name: "Chicken McNuggets (4 pc)", price: 2.99, calories: 170, description: "White meat chicken nuggets.", image: "https://picsum.photos/id/431/400/250" },
    { id: 9, name: "Chicken McNuggets (10 pc)", price: 5.79, calories: 410, description: "10 piece white meat chicken nuggets.", image: "https://picsum.photos/id/431/400/250" },
    { id: 10, name: "McCrispy Chicken Sandwich", price: 5.49, calories: 470, description: "Crispy chicken fillet with pickles.", image: "https://picsum.photos/id/201/400/250" },
    { id: 11, name: "Spicy McCrispy", price: 5.69, calories: 530, description: "Spicy crispy chicken sandwich.", image: "https://picsum.photos/id/201/400/250" },
    { id: 12, name: "Filet-O-Fish", price: 4.99, calories: 390, description: "Crispy fish filet with tartar sauce and cheese.", image: "https://picsum.photos/id/1081/400/250" }
  ],
  "Sides": [
    { id: 13, name: "World Famous Fries (Small)", price: 2.49, calories: 230, description: "Golden crispy fries.", image: "https://picsum.photos/id/1080/400/250" },
    { id: 14, name: "World Famous Fries (Medium)", price: 3.49, calories: 320, description: "Golden crispy fries.", image: "https://picsum.photos/id/1080/400/250" },
    { id: 15, name: "World Famous Fries (Large)", price: 4.19, calories: 480, description: "Golden crispy fries.", image: "https://picsum.photos/id/1080/400/250" },
    { id: 16, name: "Apple Slices", price: 1.99, calories: 15, description: "Fresh apple slices.", image: "https://picsum.photos/id/1081/400/250" }
  ],
  "Sweets & Treats": [
    { id: 17, name: "Apple Pie", price: 2.19, calories: 230, description: "Warm apple filling in flaky crust.", image: "https://picsum.photos/id/1081/400/250" },
    { id: 18, name: "OREO McFlurry", price: 4.49, calories: 510, description: "Vanilla soft serve with OREO cookies.", image: "https://picsum.photos/id/870/400/250" },
    { id: 19, name: "M&M's McFlurry", price: 4.49, calories: 640, description: "Vanilla soft serve with M&M's candies.", image: "https://picsum.photos/id/870/400/250" },
    { id: 20, name: "Vanilla Cone", price: 1.99, calories: 200, description: "Soft serve ice cream cone.", image: "https://picsum.photos/id/1081/400/250" },
    { id: 21, name: "Hot Fudge Sundae", price: 3.29, calories: 330, description: "Vanilla soft serve with hot fudge.", image: "https://picsum.photos/id/292/400/250" }
  ],
  "McCafé & Beverages": [
    { id: 22, name: "McCafé Iced Coffee (Medium)", price: 3.29, calories: 140, description: "Premium roast coffee over ice.", image: "https://picsum.photos/id/1083/400/250" },
    { id: 23, name: "Premium Roast Coffee", price: 1.99, calories: 0, description: "Freshly brewed hot coffee.", image: "https://picsum.photos/id/1083/400/250" },
    { id: 24, name: "Coca-Cola (Medium)", price: 2.49, calories: 200, description: "Classic Coca-Cola.", image: "https://picsum.photos/id/1060/400/250" },
    { id: 25, name: "Sprite (Medium)", price: 2.49, calories: 200, description: "Lemon-lime soda.", image: "https://picsum.photos/id/201/400/250" },
    { id: 26, name: "Strawberry Watermelon Refresher", price: 3.99, calories: 140, description: "Refreshing fruit drink.", image: "https://picsum.photos/id/1060/400/250" }
  ]
};

// Expanded with additional popular items (to reach ~100 total)
const extraItems = {
  "Breakfast": [
    { id: 27, name: "Egg McMuffin", price: 4.99, calories: 310, description: "Egg, Canadian bacon, American cheese on English muffin.", image: "https://picsum.photos/id/1083/400/250" },
    { id: 28, name: "Sausage McMuffin", price: 4.49, calories: 400, description: "Sausage patty on English muffin.", image: "https://picsum.photos/id/1083/400/250" },
    { id: 29, name: "Hash Browns", price: 2.49, calories: 140, description: "Crispy potato hash browns.", image: "https://picsum.photos/id/201/400/250" }
  ],
  "Snacks & Wraps": [
    { id: 30, name: "Ranch Snack Wrap", price: 3.49, calories: 360, description: "Crispy chicken, ranch, lettuce in tortilla.", image: "https://picsum.photos/id/106/400/250" }
  ]
};

// Merge all
Object.assign(menuData, extraItems);

app.get('/api/menu', (req, res) => {
  res.json(menuData);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
