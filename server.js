const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const menuData = {
  "Burgers": [
    { id: 1, name: "Big Mac", price: 5.99, calories: 590, description: "Two 100% beef patties, Big Mac sauce, lettuce, cheese, pickles, onions on a sesame seed bun.", image: "https://picsum.photos/id/1080/400/250" },
    { id: 2, name: "Quarter Pounder with Cheese", price: 6.39, calories: 520, description: "Quarter pound of 100% beef, American cheese, pickles, onions, ketchup & mustard.", image: "https://picsum.photos/id/292/400/250" },
    { id: 3, name: "Cheeseburger", price: 3.49, calories: 300, description: "Beef patty, American cheese, pickles, onions, ketchup and mustard.", image: "https://picsum.photos/id/431/400/250" }
  ],
  "Chicken & Fish": [
    { id: 4, name: "McChicken", price: 3.99, calories: 400, description: "Crispy chicken patty, shredded lettuce, and mayo on a toasted bun.", image: "https://picsum.photos/id/106/400/250" },
    { id: 5, name: "Chicken McNuggets (10 pc)", price: 5.79, calories: 410, description: "White meat chicken nuggets served with your choice of sauce.", image: "https://picsum.photos/id/431/400/250" },
    { id: 6, name: "Filet-O-Fish", price: 4.99, calories: 390, description: "Crispy fish filet with tartar sauce and cheese on a steamed bun.", image: "https://picsum.photos/id/201/400/250" }
  ],
  "Sides": [
    { id: 7, name: "World Famous Fries (Medium)", price: 3.49, calories: 320, description: "Golden crispy fries, lightly seasoned with salt.", image: "https://picsum.photos/id/1080/400/250" }
  ],
  "Desserts & Treats": [
    { id: 8, name: "Apple Pie", price: 2.19, calories: 230, description: "Warm apple filling in a flaky pastry crust.", image: "https://picsum.photos/id/1081/400/250" },
    { id: 9, name: "OREO McFlurry", price: 4.49, calories: 510, description: "Creamy vanilla soft serve mixed with OREO cookie pieces.", image: "https://picsum.photos/id/870/400/250" }
  ],
  "McCafé & Beverages": [
    { id: 10, name: "McCafé Iced Coffee (Medium)", price: 3.29, calories: 140, description: "Premium roast coffee over ice with your choice of sweetener and cream.", image: "https://picsum.photos/id/1083/400/250" },
    { id: 11, name: "Coca-Cola (Medium)", price: 2.49, calories: 200, description: "Classic refreshing Coca-Cola fountain drink.", image: "https://picsum.photos/id/1060/400/250" }
  ]
};

app.get('/api/menu', (req, res) => {
  res.json(menuData);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`McDonald's Menu server running on port ${PORT}`);
});
