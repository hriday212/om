// ==========================================================================
// Om Coldrink House - Product Details Engine (product.js)
// ==========================================================================

// 1. Full Product Database
const products = [
  {
    id: "achar-jackfruit",
    name: "Kathal (Jackfruit) Achar",
    description: "Tender raw jackfruit chunks marinated in premium cold-pressed mustard oil and our proprietary secret blend. A unique, meaty texture pickle that perfectly captures Sion Koliwada's signature Punjabi flavors.",
    category: "sun-cured pickles",
    categoryKey: "achar",
    image: "assets/jackfruit_achar.png",
    badgeText: "Specialty",
    prep: "Hand-sliced & salt-cured",
    preservative: "Cold-pressed mustard oil",
    sourcing: "Delhi & Punjab grain markets",
    curing: "14 Days natural sunlight exposure",
    ingredients: "Raw Jackfruit, Cold-Pressed Mustard Oil, and our proprietary Secret Blend of hand-ground heritage spices.",
    pricing: {
      "200g": 160.00,
      "400g": 300.00
    }
  },
  {
    id: "achar-bittergourd",
    name: "Karela (Bitter Gourd) Achar",
    description: "Bitter gourd slices salted, dried, and seasoned with dry mango powder (amchur), pure mustard oil, and our proprietary secret blend. A delicious balance of mild bitterness, tang, and warming heat.",
    category: "sun-cured pickles",
    categoryKey: "achar",
    image: "assets/karela_achar.png",
    badgeText: "Gourmet",
    prep: "De-bittered & sun-dried",
    preservative: "Mustard oil & dry mango powder",
    sourcing: "Direct from Delhi vegetable markets",
    curing: "10 Days sunlight slow aging",
    ingredients: "Bitter Gourd (Karela), Cold-Pressed Mustard Oil, Dry Mango Powder (Amchur), and our proprietary Secret Blend of hand-ground heritage spices.",
    pricing: {
      "200g": 150.00,
      "400g": 280.00
    }
  },
  {
    id: "achar-mango",
    name: "Traditional Aam (Mango) Achar",
    description: "Classic raw green mango chunks pickled in aromatic mustard oil and traditional hand-crushed Punjabi spices. A nostalgic staple that brings the warmth of open terraces in GTB Nagar to your plate.",
    category: "sun-cured pickles",
    categoryKey: "achar",
    image: "assets/mango_achar.png",
    badgeText: "Classic",
    prep: "Terrace sun-baked & cured",
    preservative: "Mustard oil & natural salt brine",
    sourcing: "Select sour green mangoes from local markets",
    curing: "14 Days sun-matured jar aging",
    ingredients: "Sour Green Mango, Cold-Pressed Mustard Oil, Coarse Mustard Meal, and our proprietary Secret Blend of hand-ground heritage spices.",
    pricing: {
      "200g": 140.00,
      "400g": 260.00
    }
  },
  {
    id: "achar-karvanda",
    name: "Wild Karvanda (Carandas) Achar",
    description: "Sour wild karvanda berries gathered fresh and pickled with split green chillies, mustard oil, and our proprietary spice mix. A sharp, tangy Punjabi specialty.",
    category: "sun-cured pickles",
    categoryKey: "achar",
    image: "assets/karvanda_achar.png",
    badgeText: "Sour & Spicy",
    prep: "Whole berry brine-cured",
    preservative: "Cold-pressed mustard oil",
    sourcing: "Direct hand-picked forest harvest",
    curing: "12 Days sun-ripened",
    ingredients: "Wild Karvanda (Carandas), Green Chillies, Cold-Pressed Mustard Oil, Coarse Mustard, and our proprietary Secret Blend of hand-ground heritage spices.",
    pricing: {
      "200g": 160.00,
      "400g": 300.00
    }
  },
  {
    id: "punjabi-matthri",
    name: "Traditional Matthri",
    description: "Flaky, crisp, hand-rolled wheat flour crackers seasoned with our proprietary secret blend. Sourced directly from flour millers in Punjab, these mathris are double-fried in pure oil for that signature Punjabi crunch.",
    category: "hand-rolled savories",
    categoryKey: "drygoods",
    image: "assets/punjabi_matthri.png",
    badgeText: "Best Seller",
    prep: "Hand-rolled & slow-fried",
    preservative: "None (Air-tight sealed)",
    sourcing: "Wheat flour from Punjab mills",
    curing: "Immediate packaging post-cooling",
    ingredients: "Refined Wheat Flour (Maida), Pure Ghee/Oil, and our proprietary Secret Blend of hand-ground heritage spices.",
    pricing: {
      "200g": 120.00,
      "400g": 220.00
    }
  },
  {
    id: "gudd-paare",
    name: "Sweet Gudd Paare",
    description: "Delightfully crunchy wheat sticks coated in organic melted jaggery (gudd) and finished with our proprietary secret blend. A guilt-free traditional dessert snack with no refined sugar.",
    category: "hand-rolled savories",
    categoryKey: "drygoods",
    image: "assets/gudd_paare.png",
    badgeText: "Traditional",
    prep: "Hand-cut & jaggery glazed",
    preservative: "Natural jaggery coating",
    sourcing: "Organic sugarcane jaggery from Punjab",
    curing: "Immediate packaging post-cooling",
    ingredients: "Wheat Flour (Atta), Organic Jaggery (Gudd), Pure Ghee, and our proprietary Secret Blend.",
    pricing: {
      "200g": 140.00,
      "400g": 260.00
    }
  },
  {
    id: "shakkar-paare",
    name: "Classic Shakkar Paare",
    description: "Crispy, sweet, sugar-glazed flour sticks prepared using traditional Punjabi homestyle methods. Coated in refined sugar syrup, they are a teatime staple for kids and elders alike.",
    category: "hand-rolled savories",
    categoryKey: "drygoods",
    image: "assets/shakkar_paare.png",
    badgeText: "Homemade",
    prep: "Syrup-dipped & hand-glazed",
    preservative: "Sugar syrup glaze",
    sourcing: "Premium wheat & sugar markets",
    curing: "Immediate packaging post-cooling",
    ingredients: "Refined Wheat Flour (Maida), Sugar, Pure Ghee, Water, and our proprietary Secret Blend.",
    pricing: {
      "200g": 130.00,
      "400g": 240.00
    }
  },
  {
    id: "gokul-dairy",
    name: "Gokul Milk & Curd",
    description: "Premium quality pasteurized milk and thick, creamy curd sourced fresh daily from the Gokul Company. Packed with pure protein and calcium, serving Sion's daily nutritional needs.",
    category: "fresh essentials",
    categoryKey: "dairy",
    image: "assets/masala_soda.png",
    badgeText: "Fresh Daily",
    prep: "Cold-chain distribution",
    preservative: "Pasteurized (Keep refrigerated)",
    sourcing: "Gokul Dairy Cooperative",
    curing: "Freshly packed daily",
    ingredients: "Pasteurized Whole Milk, Active Curd Cultures (for Curd).",
    pricing: {
      "500ml": 33.00,
      "400g": 55.00
    }
  },
  {
    id: "fresh-mushrooms",
    name: "Fresh Button Mushrooms",
    description: "Crisp, plump, and high-quality white button mushrooms harvested fresh and packed immediately under hygienic conditions. A perfect, healthy ingredient for your daily cooking.",
    category: "fresh essentials",
    categoryKey: "dairy",
    image: "assets/mushroom.png",
    badgeText: "Fresh Daily",
    prep: "Fresh hand-sorted harvest",
    preservative: "None (Keep chilled)",
    sourcing: "Local climate-controlled farms",
    curing: "Harvested & shipped daily",
    ingredients: "100% White Button Mushrooms.",
    pricing: {
      "200g": 60.00
    }
  }
];

// 2. Global State
let product = null;
let selectedSize = "";
let purchaseQty = 1;
let cart = JSON.parse(localStorage.getItem("om_cart")) || [];
let selectedDeliveryPartner = null;
let deliveryCharge = 0;
let trackerInterval = null;

// Sion Koliwada Shop coordinates
const SHOP_LAT = 19.0396;
const SHOP_LNG = 72.8622;

// Map & Google elements
let map = null;
let marker = null;
let autocomplete = null;

// 3. DOM Cache Elements
const cartTrigger = document.getElementById("cart-trigger");
const cartBadge = document.getElementById("cart-badge");
const cartDrawer = document.getElementById("cart-drawer");
const cartDrawerOverlay = document.getElementById("cart-drawer-overlay");
const closeDrawerBtn = document.getElementById("close-drawer");
const cartItemsContainer = document.getElementById("cart-items-container");
const subtotalAmount = document.getElementById("subtotal-amount");
const proceedCheckoutBtn = document.getElementById("proceed-checkout-btn");

// Checkout elements
const checkoutModalOverlay = document.getElementById("checkout-modal-overlay");
const checkoutModal = document.getElementById("checkout-modal");
const closeCheckoutBtn = document.getElementById("close-checkout");
const checkoutForm = document.getElementById("checkout-form");
const deliveryOptionsList = document.getElementById("delivery-options-list");
const deliveryAddressInput = document.getElementById("delivery-address");
const summaryItemsList = document.getElementById("summary-items-list");
const summaryItemsSubtotal = document.getElementById("summary-items-subtotal");
const summaryDeliveryCharge = document.getElementById("summary-delivery-charge");
const summaryGrandTotal = document.getElementById("summary-grand-total");
const placeOrderBtn = document.getElementById("place-order-btn");

// Tracker elements
const trackerModalOverlay = document.getElementById("tracker-modal-overlay");
const closeTrackerBtn = document.getElementById("close-tracker");
const trackerOrderId = document.getElementById("tracker-order-id");
const trackerProgressFill = document.getElementById("tracker-progress-fill");
const trackerStatusText = document.getElementById("tracker-status-text");
const timeReceived = document.getElementById("time-received");
const timePreparing = document.getElementById("time-preparing");
const timeDispatched = document.getElementById("time-dispatched");
const timeDelivered = document.getElementById("time-delivered");
const stepReceived = document.getElementById("step-received");
const stepPreparing = document.getElementById("step-preparing");
const stepDispatched = document.getElementById("step-dispatched");
const stepDelivered = document.getElementById("step-delivered");

// Map Picker elements
const mapPickerModalOverlay = document.getElementById("map-picker-modal-overlay");
const btnConfirmMapPicker = document.getElementById("btn-confirm-map-picker");

// 4. Load Product Detail dynamically
function loadProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id") || "achar-jackfruit";
  
  product = products.find(p => p.id === productId);
  if (!product) {
    product = products[0]; // fallback to first item
  }
  
  // Update browser page title
  document.title = `${product.name} - Om Coldrink House | Sion Koliwada`;
  
  // Set default size
  selectedSize = Object.keys(product.pricing)[0];
  
  // Render details
  document.getElementById("dyn-badge").textContent = product.badgeText;
  document.getElementById("dyn-category").textContent = product.category;
  document.getElementById("dyn-name").textContent = product.name;
  document.getElementById("dyn-desc").textContent = product.description;
  document.getElementById("dyn-prep").textContent = product.prep;
  document.getElementById("dyn-preservative").textContent = product.preservative;
  document.getElementById("dyn-sourcing").textContent = product.sourcing;
  document.getElementById("dyn-curing").textContent = product.curing;
  document.getElementById("dyn-ingredients").textContent = product.ingredients;
  
  const imgElement = document.getElementById("dyn-img");
  imgElement.src = product.image;
  imgElement.alt = product.name;
  imgElement.onerror = function() {
    this.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600";
  };
  
  updatePriceDisplay();
  renderSizeSelectors();
}

function renderSizeSelectors() {
  const container = document.getElementById("dyn-packaging-options");
  container.innerHTML = "";
  
  Object.keys(product.pricing).forEach(size => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `pack-btn ${size === selectedSize ? "selected" : ""}`;
    btn.textContent = size;
    btn.addEventListener("click", () => {
      selectedSize = size;
      document.querySelectorAll("#dyn-packaging-options .pack-btn").forEach(b => {
        b.classList.toggle("selected", b.textContent === size);
      });
      updatePriceDisplay();
    });
    container.appendChild(btn);
  });
}

function updatePriceDisplay() {
  const price = product.pricing[selectedSize];
  document.getElementById("dyn-price").textContent = `₹${price.toFixed(2)}`;
  document.getElementById("dyn-price-label").textContent = `Price (${selectedSize})`;
}

// 5. Quantity modifiers on detail page
function initQtyButtons() {
  const qtyDisplay = document.getElementById("qty-display");
  document.getElementById("qty-minus").addEventListener("click", () => {
    if (purchaseQty > 1) {
      purchaseQty--;
      qtyDisplay.textContent = purchaseQty;
    }
  });
  document.getElementById("qty-plus").addEventListener("click", () => {
    purchaseQty++;
    qtyDisplay.textContent = purchaseQty;
  });
}

// 6. Accordion toggle
function initAccordion() {
  const btn = document.getElementById("accordion-btn");
  const content = document.getElementById("accordion-content");
  btn.addEventListener("click", () => {
    const isHidden = content.style.display === "none";
    content.style.display = isHidden ? "block" : "none";
    const icon = btn.querySelector("i");
    icon.className = isHidden ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down";
  });
}

// ==========================================================================
// E-Commerce Engine & Cart Drawer (Ported & Synchronized)
// ==========================================================================

function updateCartUI() {
  localStorage.setItem("om_cart", JSON.stringify(cart));
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItems;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart-state">
        <i class="fa-solid fa-basket-shopping"></i>
        <p>Your basket is currently empty.</p>
        <button class="btn btn-secondary close-drawer-btn" id="keep-shopping-drawer-btn">Keep Shopping</button>
      </div>
    `;
    document.getElementById("keep-shopping-drawer-btn").addEventListener("click", toggleCartDrawer);
    proceedCheckoutBtn.setAttribute("disabled", "true");
  } else {
    cartItemsContainer.innerHTML = "";
    cart.forEach(item => {
      const itemRow = document.createElement("div");
      itemRow.className = "cart-item";
      
      itemRow.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=100'">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name} (${item.size})</div>
          <div class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
        </div>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button class="qty-btn btn-qty-minus" data-cart-id="${item.cartItemId}"><i class="fa-solid fa-minus"></i></button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn btn-qty-plus" data-cart-id="${item.cartItemId}"><i class="fa-solid fa-plus"></i></button>
          </div>
          <button class="btn-remove-item" data-cart-id="${item.cartItemId}" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      `;
      cartItemsContainer.appendChild(itemRow);
    });
    
    // Bind click events inside drawer
    document.querySelectorAll(".btn-qty-minus").forEach(btn => {
      btn.addEventListener("click", () => changeQuantity(btn.getAttribute("data-cart-id"), -1));
    });
    document.querySelectorAll(".btn-qty-plus").forEach(btn => {
      btn.addEventListener("click", () => changeQuantity(btn.getAttribute("data-cart-id"), 1));
    });
    document.querySelectorAll(".btn-remove-item").forEach(btn => {
      btn.addEventListener("click", () => removeFromCart(btn.getAttribute("data-cart-id")));
    });
    
    proceedCheckoutBtn.removeAttribute("disabled");
  }
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  subtotalAmount.textContent = `₹${subtotal.toFixed(2)}`;
}

function addToCart(productId, size, qty = 1) {
  const prod = products.find(p => p.id === productId);
  const price = prod.pricing[size];
  const cartItemId = `${productId}-${size}`;
  
  const existingItem = cart.find(item => item.cartItemId === cartItemId);
  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    cart.push({
      cartItemId: cartItemId,
      id: prod.id,
      name: prod.name,
      size: size,
      price: price,
      image: prod.image,
      quantity: qty
    });
  }
  
  updateCartUI();
}

function removeFromCart(cartItemId) {
  cart = cart.filter(item => item.cartItemId !== cartItemId);
  updateCartUI();
}

function changeQuantity(cartItemId, delta) {
  const item = cart.find(item => item.cartItemId === cartItemId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      updateCartUI();
    }
  }
}

function toggleCartDrawer() {
  cartDrawer.classList.toggle("active");
  cartDrawerOverlay.classList.toggle("active");
}

// Add page product to cart
function handleDetailAddToCart() {
  addToCart(product.id, selectedSize, purchaseQty);
  
  // Button micro-animation
  const btn = document.getElementById("btn-add-to-cart-page");
  const originalHtml = btn.innerHTML;
  btn.innerHTML = `<i class="fa-solid fa-check" style="margin-right:8px;"></i> Added to Basket!`;
  btn.style.backgroundColor = "var(--color-success)";
  btn.style.borderColor = "var(--color-success)";
  
  // Show cart drawer
  setTimeout(() => {
    toggleCartDrawer();
    btn.innerHTML = originalHtml;
    btn.style.backgroundColor = "";
    btn.style.borderColor = "";
  }, 800);
}

// ==========================================================================
// Checkout Modal & Delivery Options (Sync from index.js)
// ==========================================================================

function toggleCheckoutModal() {
  const isOpening = checkoutModalOverlay.style.display !== "flex";
  checkoutModalOverlay.style.display = isOpening ? "flex" : "none";
  
  if (isOpening) {
    setTimeout(() => {
      checkoutModalOverlay.style.opacity = "1";
    }, 10);
    renderCheckoutSummary();
    calculateRealOrMockRates();
  } else {
    checkoutModalOverlay.style.opacity = "0";
  }
}

function renderCheckoutSummary() {
  summaryItemsList.innerHTML = "";
  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "summary-item-row";
    div.innerHTML = `
      <span class="summary-item-name">${item.name} <small>(${item.size})</small> <strong>x ${item.quantity}</strong></span>
      <span>₹${(item.price * item.quantity).toFixed(2)}</span>
    `;
    summaryItemsList.appendChild(div);
  });
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  summaryItemsSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
  updateCheckoutTotals();
}

function calculateRealOrMockRates() {
  const address = deliveryAddressInput.value.trim();
  if (address.length < 5) {
    deliveryOptionsList.innerHTML = `
      <div class="carrier-prompt">
        <i class="fa-solid fa-truck-ramp-box"></i>
        <p>Please enter your delivery address to see Borzo and Porter rates.</p>
      </div>
    `;
    placeOrderBtn.setAttribute("disabled", "true");
    return;
  }
  
  // Simulate API distance-based pricing (Sion Koliwada center to random coordinates)
  let distanceKm = 8.5; // default simulated distance
  
  // If marker is set, calculate real distance
  if (marker) {
    const lat = marker.getPosition().lat();
    const lng = marker.getPosition().lng();
    distanceKm = getHaversineDistance(SHOP_LAT, SHOP_LNG, lat, lng);
  }
  
  // Rates formulas based on Borzo/Porter structure
  const borzoPrice = Math.max(50, 40 + (distanceKm * 9.5));
  const porterPrice = Math.max(60, 48 + (distanceKm * 10.2));
  
  deliveryOptionsList.innerHTML = `
    <div class="carrier-option" id="carrier-borzo">
      <div style="display:flex; align-items:center; gap:12px;">
        <input type="radio" name="delivery-carrier" value="Borzo" id="carrier-choice-borzo">
        <div>
          <strong style="display:block;">Borzo Bike Courier</strong>
          <span style="font-size:0.8rem; color:var(--color-text-muted);">Estimated arrival: 45 - 60 mins</span>
        </div>
      </div>
      <strong class="carrier-price">₹${borzoPrice.toFixed(0)}</strong>
    </div>
    
    <div class="carrier-option" id="carrier-porter">
      <div style="display:flex; align-items:center; gap:12px;">
        <input type="radio" name="delivery-carrier" value="Porter" id="carrier-choice-porter">
        <div>
          <strong style="display:block;">Porter Ultra-Fast Delivery</strong>
          <span style="font-size:0.8rem; color:var(--color-text-muted);">Estimated arrival: 30 - 45 mins</span>
        </div>
      </div>
      <strong class="carrier-price">₹${porterPrice.toFixed(0)}</strong>
    </div>
  `;
  
  // Add listeners
  document.getElementById("carrier-borzo").addEventListener("click", () => selectCarrier("Borzo", borzoPrice));
  document.getElementById("carrier-porter").addEventListener("click", () => selectCarrier("Porter", porterPrice));
  
  placeOrderBtn.setAttribute("disabled", "true");
}

function selectCarrier(name, price) {
  selectedDeliveryPartner = name;
  deliveryCharge = price;
  
  // Toggle selection classes
  const activeOption = name === "Borzo" ? "carrier-borzo" : "carrier-porter";
  const inactiveOption = name === "Borzo" ? "carrier-porter" : "carrier-borzo";
  
  document.getElementById(activeOption).classList.add("selected");
  document.getElementById(inactiveOption).classList.remove("selected");
  
  const radio = document.getElementById(`carrier-choice-${name.toLowerCase()}`);
  if (radio) radio.checked = true;
  
  updateCheckoutTotals();
  placeOrderBtn.removeAttribute("disabled");
}

function updateCheckoutTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  summaryDeliveryCharge.textContent = `₹${deliveryCharge.toFixed(2)}`;
  summaryGrandTotal.textContent = `₹${(subtotal + deliveryCharge).toFixed(2)}`;
}

function getHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// ==========================================================================
// Order Placement & Live Tracking Simulation
// ==========================================================================

function handleOrderPlacement(e) {
  e.preventDefault();
  
  const customerName = document.getElementById("customer-name").value;
  const customerPhone = document.getElementById("customer-phone").value;
  const address = deliveryAddressInput.value;
  
  // Generate mock order ID
  const orderIdNum = Math.floor(100000 + Math.random() * 900000);
  const finalOrderId = `#OM-${orderIdNum}`;
  
  // Construct items summary for WhatsApp message
  let itemsSummary = "";
  cart.forEach(item => {
    itemsSummary += `- ${item.name} (${item.size}) x${item.quantity}\n`;
  });
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const grandTotal = subtotal + deliveryCharge;
  
  // Format WhatsApp Link
  const encodedText = encodeURIComponent(
    `*NEW ORDER RECEIVED: ${finalOrderId}*\n\n` +
    `*Customer Details:*\n` +
    `- Name: ${customerName}\n` +
    `- Phone: +91 ${customerPhone}\n` +
    `- Delivery Address: ${address}\n\n` +
    `*Carrier:* ${selectedDeliveryPartner} (Rate: ₹${deliveryCharge.toFixed(0)})\n\n` +
    `*Order Items:*\n${itemsSummary}\n` +
    `*Grand Total:* ₹${grandTotal.toFixed(2)}\n\n` +
    `_Please prepare this dispatch from Shop No. 4, Sion Koliwada!_`
  );
  
  const finalWhatsAppUrl = `https://wa.me/919892837460?text=${encodedText}`;
  
  // Close checkout modal
  toggleCheckoutModal();
  
  // Clear local cart
  cart = [];
  updateCartUI();
  
  // Open Live Tracker
  openOrderTracker(finalOrderId, finalWhatsAppUrl, customerName, address, grandTotal);
}

function openOrderTracker(orderId, whatsappUrl, name, address, total) {
  trackerOrderId.textContent = `Order ID: ${orderId}`;
  trackerModalOverlay.style.display = "flex";
  
  document.getElementById("whatsapp-message-preview").textContent = `Sent to Sion Koliwada kitchen for verification. Klik 'Live Link' to chat.`;
  document.getElementById("tracking-link-btn").href = whatsappUrl;
  
  // Populate Items list in Tracker
  const listContainer = document.getElementById("tracker-items-list");
  listContainer.innerHTML = `
    <div style="grid-column: span 2;">
      <p style="font-size:0.9rem;"><strong>Recipient:</strong> ${name}</p>
      <p style="font-size:0.9rem; margin-top:2px;"><strong>Address:</strong> ${address}</p>
      <p style="font-size:1.1rem; font-weight:700; margin-top:8px; color:var(--color-brand-primary);">Total Paid: ₹${total.toFixed(2)}</p>
    </div>
  `;
  
  startTrackerSimulation(orderId);
}

function startTrackerSimulation(orderId) {
  let progress = 10;
  trackerProgressFill.style.width = `${progress}%`;
  
  // Setup timestamps
  const now = new Date();
  timeReceived.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  timePreparing.textContent = "--:--";
  timeDispatched.textContent = "--:--";
  timeDelivered.textContent = "--:--";
  
  // Reset steps
  stepReceived.classList.add("active");
  stepPreparing.classList.remove("active");
  stepDispatched.classList.remove("active");
  stepDelivered.classList.remove("active");
  
  // Simulated driver details
  const firstNames = ["Rajesh", "Amit", "Sandip", "Karan", "Suraj", "Deepak"];
  const lastNames = ["Yadav", "Sharma", "Kadam", "Singh", "Sawant", "Gupta"];
  const driverName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  
  document.getElementById("courier-name").textContent = "Assigning partner...";
  document.getElementById("carrier-brand").textContent = `${selectedDeliveryPartner} Express`;
  
  if (trackerInterval) clearInterval(trackerInterval);
  
  let stage = 0;
  trackerInterval = setInterval(() => {
    stage++;
    if (stage === 1) {
      // Stage: Preparing
      progress = 40;
      trackerProgressFill.style.width = `${progress}%`;
      stepPreparing.classList.add("active");
      trackerStatusText.textContent = "Your Punjabi specialties are being packed fresh in our Sion Koliwada kitchen.";
      const t = new Date();
      timePreparing.textContent = t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } 
    else if (stage === 2) {
      // Stage: Dispatched
      progress = 75;
      trackerProgressFill.style.width = `${progress}%`;
      stepDispatched.classList.add("active");
      document.getElementById("courier-name").textContent = driverName;
      trackerStatusText.textContent = `${driverName} has picked up your order and is riding towards your location.`;
      const t = new Date();
      timeDispatched.textContent = t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } 
    else if (stage === 3) {
      // Stage: Delivered
      progress = 100;
      trackerProgressFill.style.width = `${progress}%`;
      stepDelivered.classList.add("active");
      trackerStatusText.textContent = "Delivered! Savor the authentic Punjabi flavors from Sion Koliwada.";
      const t = new Date();
      timeDelivered.textContent = t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      clearInterval(trackerInterval);
    }
  }, 10000); // changes stage every 10 seconds
}

function closeTrackerModal() {
  if (trackerInterval) clearInterval(trackerInterval);
  trackerModalOverlay.style.display = "none";
}

// ==========================================================================
// Google Maps Picker & Autocomplete Integration (Dynamic Pinning)
// ==========================================================================

function initGoogleAutocompletes() {
  if (typeof google === "undefined" || !google.maps || !google.maps.places) {
    console.log("Waiting for Google Maps API to load...");
    return;
  }
  
  autocomplete = new google.maps.places.Autocomplete(deliveryAddressInput, {
    componentRestrictions: { country: "IN" },
    fields: ["formatted_address", "geometry"]
  });
  
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      return;
    }
    
    // Address calculated
    calculateRealOrMockRates();
  });
}

function openMapPicker() {
  mapPickerModalOverlay.style.display = "flex";
  
  setTimeout(() => {
    if (!map) {
      const mapOptions = {
        center: { lat: SHOP_LAT, lng: SHOP_LNG },
        zoom: 14,
        mapTypeControl: false,
        fullscreenControl: false,
        styles: [
          {
            "featureType": "poi.business",
            "elementType": "labels",
            "stylers": [{ "visibility": "off" }]
          }
        ]
      };
      
      map = new google.maps.Map(document.getElementById("picker-map-canvas"), mapOptions);
      
      marker = new google.maps.Marker({
        position: { lat: SHOP_LAT, lng: SHOP_LNG },
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        title: "Your Delivery Spot"
      });
      
      google.maps.event.addListener(map, "click", (e) => {
        marker.setPosition(e.latLng);
        updateCoordsDisplay(e.latLng.lat(), e.latLng.lng());
      });
      
      marker.addListener("dragend", () => {
        const pos = marker.getPosition();
        updateCoordsDisplay(pos.lat(), pos.lng());
      });
      
      // Auto-search field inside picker
      const searchBoxInput = document.getElementById("map-search-input");
      const searchBox = new google.maps.places.SearchBox(searchBoxInput);
      
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });
      
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;
        
        const bounds = new google.maps.LatLngBounds();
        places.forEach(place => {
          if (!place.geometry || !place.geometry.location) return;
          
          marker.setPosition(place.geometry.location);
          updateCoordsDisplay(place.geometry.location.lat(), place.geometry.location.lng());
          
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    } else {
      // Recenter Map to Shop Coordinates
      map.setCenter({ lat: SHOP_LAT, lng: SHOP_LNG });
      marker.setPosition({ lat: SHOP_LAT, lng: SHOP_LNG });
    }
    
    updateCoordsDisplay(SHOP_LAT, SHOP_LNG);
  }, 100);
}

function updateCoordsDisplay(lat, lng) {
  const display = document.getElementById("selected-coords-display");
  display.innerHTML = `<i class="fa-solid fa-location-dot" style="color:var(--color-brand-primary);"></i> Coordinates: <strong>${lat.toFixed(5)}, ${lng.toFixed(5)}</strong>`;
  btnConfirmMapPicker.removeAttribute("disabled");
}

function closeMapPickerModal() {
  mapPickerModalOverlay.style.display = "none";
}

function confirmMapSelection() {
  if (!marker) return;
  
  const pos = marker.getPosition();
  const lat = pos.lat();
  const lng = pos.lng();
  
  // Perform reverse geocoding to address text field
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: { lat: lat, lng: lng } }, (results, status) => {
    if (status === "OK" && results[0]) {
      deliveryAddressInput.value = results[0].formatted_address;
    } else {
      deliveryAddressInput.value = `Pinned Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }
    
    closeMapPickerModal();
    calculateRealOrMockRates();
  });
}

// ==========================================================================
// Page Load Initialization & DOM Listeners Binding
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  loadProductDetail();
  initQtyButtons();
  initAccordion();
  updateCartUI();
  
  // Header Cart buttons
  cartTrigger.addEventListener("click", toggleCartDrawer);
  closeDrawerBtn.addEventListener("click", toggleCartDrawer);
  cartDrawerOverlay.addEventListener("click", toggleCartDrawer);
  
  // Checkout drawer proceed button
  proceedCheckoutBtn.addEventListener("click", () => {
    toggleCartDrawer();
    toggleCheckoutModal();
  });
  
  // Checkout Modal bindings
  closeCheckoutBtn.addEventListener("click", toggleCheckoutModal);
  document.getElementById("btn-cancel-checkout").addEventListener("click", toggleCheckoutModal);
  checkoutForm.addEventListener("submit", handleOrderPlacement);
  
  // Maps binding
  document.getElementById("btn-locate-map").addEventListener("click", openMapPicker);
  document.getElementById("close-map-picker").addEventListener("click", closeMapPickerModal);
  document.getElementById("btn-cancel-map-picker").addEventListener("click", closeMapPickerModal);
  btnConfirmMapPicker.addEventListener("click", confirmMapSelection);
  
  // Add address manual changes listener
  deliveryAddressInput.addEventListener("change", calculateRealOrMockRates);
  
  // Tracker bindings
  closeTrackerBtn.addEventListener("click", closeTrackerModal);
  
  // Detail page direct Add button
  document.getElementById("btn-add-to-cart-page").addEventListener("click", handleDetailAddToCart);
  
  // Lazy init autocomplete when API completes loading
  setTimeout(() => {
    initGoogleAutocompletes();
  }, 1000);
});
