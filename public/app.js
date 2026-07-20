let menuData = {};
let cart = [];

async function fetchMenu() {
    try {
        const response = await fetch('/api/menu');
        menuData = await response.json();
        renderCategoryFilters();
        renderMenu(Object.values(menuData).flat());
    } catch (error) {
        console.error('Failed to load menu:', error);
        document.getElementById('menuGrid').innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#DA291C;">Unable to load menu. Please try again.</p>`;
    }
}

function renderCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    let html = `<button class="active" onclick="filterByCategory('all')">All</button>`;
    
    Object.keys(menuData).forEach(category => {
        html += `<button onclick="filterByCategory('${category}')">${category}</button>`;
    });
    
    container.innerHTML = html;
}

function renderMenu(items) {
    const grid = document.getElementById('menuGrid');
    grid.innerHTML = items.map(item => `
        <div class="menu-card">
            <img src="${item.image}" alt="${item.name}">
            <div class="card-content">
                <h3>${item.name}</h3>
                <div class="price">$${item.price.toFixed(2)}</div>
                <div class="calories">${item.calories} Cal</div>
                <p>${item.description}</p>
                <button onclick="addToCart(${item.id})" class="add-to-cart">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function addToCart(id) {
    let foundItem = null;
    Object.keys(menuData).forEach(cat => {
        const item = menuData[cat].find(i => i.id === id);
        if (item) foundItem = { ...item };
    });

    if (!foundItem) return;

    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({ ...foundItem, quantity: 1 });
    }

    updateCartUI();
}

function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.getElementById('cartCount').textContent = count;
    document.getElementById('cartIconCount').textContent = count;

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * (item.quantity || 1);
        total += itemTotal;
        html += `
            <div style="display:flex; gap:15px; padding:15px 0; border-bottom:1px solid #eee;">
                <img src="${item.image}" style="width:70px; height:70px; object-fit:cover; border-radius:8px;">
                <div style="flex:1">
                    <strong>${item.name}</strong><br>
                    $${item.price.toFixed(2)} × ${item.quantity || 1}
                    <button onclick="removeFromCart(${index})" style="color:#DA291C; background:none; border:none; cursor:pointer; margin-top:6px;">Remove</button>
                </div>
            </div>`;
    });

    document.getElementById('cartItems').innerHTML = html || '<p style="text-align:center; padding:60px 20px; color:#888;">Your cart is empty</p>';
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('open');
}

function checkout() {
    if (cart.length === 0) return;
    const total = document.getElementById('cartTotal').textContent;
    alert(`Thank you for your order!\n\nTotal: $${total}\n\n(This is a demo application — no real payment processed.)`);
    cart = [];
    updateCartUI();
    toggleCart();
}

function filterByCategory(category) {
    document.querySelectorAll('.category-filters button').forEach(btn => {
        btn.classList.remove('active');
        if ((category === 'all' && btn.textContent === 'All') || btn.textContent === category) {
            btn.classList.add('active');
        }
    });

    if (category === 'all') {
        renderMenu(Object.values(menuData).flat());
    } else {
        renderMenu(menuData[category] || []);
    }
}

function filterMenu() {
    const term = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!term) {
        renderMenu(Object.values(menuData).flat());
        return;
    }

    const filtered = Object.values(menuData).flat().filter(item =>
        item.name.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term)
    );
    renderMenu(filtered);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', fetchMenu);
