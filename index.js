/* ==========================================================================
   Om Coldrink House - Interactive Frontend JavaScript Engine
   ========================================================================== */

// 1. Mock Product Catalog Data (Strictly Punjabi Items & Cured Achars)
const products = [
  {
    id: "punjabi-matthri",
    name: "Traditional Punjabi Matthri",
    description: "Crispy, flaky mathri spiced with our signature secret blend. Perfect with hot tea or mango pickle.",
    category: "snacks",
    image: "assets/punjabi_matthri.png",
    badgeText: "Best Seller",
    pricing: {
      "200g": 120.00,
      "400g": 220.00
    }
  },
  {
    id: "gudd-paare",
    name: "Sweet Gudd Paare",
    description: "Wheat treats sweetened with jaggery (gudd) and our proprietary secret blend.",
    category: "snacks",
    image: "assets/gudd_paare.png",
    badgeText: "Traditional",
    pricing: {
      "200g": 140.00,
      "400g": 260.00
    }
  },
  {
    id: "shakkar-paare",
    name: "Classic Shakkar Paare",
    description: "Traditional wheat treats glazed with refined sugar syrup.",
    category: "snacks",
    image: "assets/shakkar_paare.png",
    badgeText: "Homemade",
    pricing: {
      "200g": 130.00,
      "400g": 240.00
    }
  },
  {
    id: "achar-jackfruit",
    name: "Kathal (Jackfruit) Achar",
    description: "Tender jackfruit pieces marinated in pure mustard oil and our proprietary secret blend.",
    category: "achar",
    image: "assets/jackfruit_achar.png",
    badgeText: "Specialty",
    pricing: {
      "200g": 160.00,
      "400g": 300.00
    }
  },
  {
    id: "achar-bittergourd",
    name: "Karela (Bitter Gourd) Achar",
    description: "Bitter gourd slices seasoned with dry mango powder (amchur), mustard oil, and our proprietary secret blend.",
    category: "achar",
    image: "assets/karela_achar.png",
    badgeText: "Gourmet",
    pricing: {
      "200g": 150.00,
      "400g": 280.00
    }
  },
  {
    id: "achar-mango",
    name: "Traditional Aam (Mango) Achar",
    description: "Classic raw mango pickle marinated in mustard oil and our proprietary secret blend.",
    category: "achar",
    image: "assets/mango_achar.png",
    badgeText: "Classic",
    pricing: {
      "200g": 140.00,
      "400g": 260.00
    }
  },
  {
    id: "achar-karvanda",
    name: "Wild Karvanda (Carandas) Achar",
    description: "Tangy wild karvanda berries pickled with green chillies and our signature secret blend.",
    category: "achar",
    image: "assets/karvanda_achar.png",
    badgeText: "Sour & Spicy",
    pricing: {
      "200g": 160.00,
      "400g": 300.00
    }
  }
];

// 2. State Management
let cart = JSON.parse(localStorage.getItem("om_cart")) || [];
let selectedDeliveryPartner = null;
let deliveryCharge = 0;
let trackerInterval = null;

// Track selected packaging size for each product card (default is "200g")
const selectedSizes = {};
products.forEach(p => {
  selectedSizes[p.id] = "200g";
});

// 3. DOM Cache Elements
const productsGrid = document.getElementById("products-grid");
const filterTabs = document.getElementById("filter-tabs");
const cartTrigger = document.getElementById("cart-trigger");
const cartBadge = document.getElementById("cart-badge");
const cartDrawer = document.getElementById("cart-drawer");
const cartDrawerOverlay = document.getElementById("cart-drawer-overlay");
const closeDrawerBtn = document.getElementById("close-drawer");
const cartItemsContainer = document.getElementById("cart-items-container");
const subtotalAmount = document.getElementById("subtotal-amount");
const proceedCheckoutBtn = document.getElementById("proceed-checkout-btn");

// Checkout modal elements
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
const whatsappMessagePreview = document.getElementById("whatsapp-message-preview");
const courierName = document.getElementById("courier-name");
const carrierBrand = document.getElementById("carrier-brand");
const trackingLinkBtn = document.getElementById("tracking-link-btn");
const trackerItemsList = document.getElementById("tracker-items-list");

// Time elements inside Tracker
const timeReceived = document.getElementById("time-received");
const timePreparing = document.getElementById("time-preparing");
const timeDispatched = document.getElementById("time-dispatched");
const timeDelivered = document.getElementById("time-delivered");

// Step elements
const stepReceived = document.getElementById("step-received");
const stepPreparing = document.getElementById("step-preparing");
const stepDispatched = document.getElementById("step-dispatched");
const stepDelivered = document.getElementById("step-delivered");

// ==========================================================================
// Catalog Rendering
// ==========================================================================

function renderCatalog(filter = "all") {
  productsGrid.innerHTML = "";
  
  const filteredProducts = products.filter(p => filter === "all" || p.category === filter);
  
  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card animate-fade-in";
    
    const currentSize = selectedSizes[product.id];
    const currentPrice = product.pricing[currentSize];
    
    card.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600'">
        <span class="product-badge badge-${product.category}">${product.badgeText}</span>
      </div>
      <div class="product-content">
        <h3 class="product-name"><a href="product.html?id=${product.id}" class="product-title-link" style="color: inherit; text-decoration: none;" title="View detailed description & ingredients">${product.name}</a></h3>
        <p class="product-desc">${product.description} <a href="product.html?id=${product.id}" style="font-size: 0.8rem; color: var(--color-brand-primary); text-decoration: underline; white-space: nowrap; margin-left: 5px;">View details →</a></p>
        
        <!-- Size Selector -->
        <div class="packaging-selector-wrapper">
          <span class="packaging-label">Select Packaging:</span>
          <div class="packaging-options">
            <button class="pack-btn ${currentSize === '200g' ? 'selected' : ''}" id="btn-${product.id}-200g" data-id="${product.id}" data-size="200g">200 gms</button>
            <button class="pack-btn ${currentSize === '400g' ? 'selected' : ''}" id="btn-${product.id}-400g" data-id="${product.id}" data-size="400g">400 gms</button>
          </div>
        </div>

        <div class="product-footer">
          <div>
            <span class="product-price-label" id="pricelabel-${product.id}">Price (${currentSize})</span>
            <span class="product-price" id="price-${product.id}">₹${currentPrice.toFixed(2)}</span>
          </div>
          <button class="btn-add-cart" data-id="${product.id}" aria-label="Add to cart">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    `;
    
    productsGrid.appendChild(card);
  });
  
  // Bind Size Selection Listeners
  document.querySelectorAll(".pack-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const pid = e.target.getAttribute("data-id");
      const size = e.target.getAttribute("data-size");
      
      // Update selected sizes state
      selectedSizes[pid] = size;
      
      // Update toggle buttons class directly by ID
      const btn200 = document.getElementById(`btn-${pid}-200g`);
      const btn400 = document.getElementById(`btn-${pid}-400g`);
      if (btn200) btn200.classList.toggle("selected", size === "200g");
      if (btn400) btn400.classList.toggle("selected", size === "400g");
      
      // Update displayed price and label directly by ID
      const product = products.find(p => p.id === pid);
      const priceText = document.getElementById(`price-${pid}`);
      const priceLabel = document.getElementById(`pricelabel-${pid}`);
      
      if (priceText) priceText.textContent = `₹${product.pricing[size].toFixed(2)}`;
      if (priceLabel) priceLabel.textContent = `Price (${size})`;
    });
  });

  // Bind Add to Cart Listeners
  document.querySelectorAll(".btn-add-cart").forEach(button => {
    button.addEventListener("click", (e) => {
      const productId = e.currentTarget.getAttribute("data-id");
      addToCart(productId);
      
      // Add to cart micro-animation
      const icon = e.currentTarget.querySelector("i");
      icon.className = "fa-solid fa-check";
      e.currentTarget.style.backgroundColor = "var(--color-success)";
      e.currentTarget.style.color = "var(--color-white)";
      e.currentTarget.style.borderColor = "var(--color-success)";
      
      setTimeout(() => {
        icon.className = "fa-solid fa-plus";
        e.currentTarget.style.backgroundColor = "";
        e.currentTarget.style.color = "";
        e.currentTarget.style.borderColor = "";
      }, 1000);
    });
  });
}

// ==========================================================================
// Shopping Cart Engine
// ==========================================================================

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const size = selectedSizes[productId];
  const price = product.pricing[size];
  
  // Composite unique ID to distinguish different sizes in the cart drawer
  const cartItemId = `${productId}-${size}`;
  const existingItem = cart.find(item => item.cartItemId === cartItemId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      cartItemId: cartItemId,
      id: product.id,
      name: product.name,
      size: size,
      price: price,
      image: product.image,
      quantity: 1
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
    
    // Bind quantity and delete button event listeners
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

function toggleCartDrawer() {
  cartDrawer.classList.toggle("active");
  cartDrawerOverlay.classList.toggle("active");
}

// ==========================================================================
// Checkout Flow & Rate Engine
// ==========================================================================

function toggleCheckoutModal() {
  checkoutModalOverlay.classList.toggle("active");
  if (checkoutModalOverlay.classList.contains("active")) {
    renderCheckoutSummary();
    resetDeliveryRates();
  }
}

function renderCheckoutSummary() {
  summaryItemsList.innerHTML = "";
  
  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "summary-item-row";
    row.innerHTML = `
      <span class="summary-item-name">${item.name} (${item.size}) (x${item.quantity})</span>
      <span class="summary-item-val">₹${(item.price * item.quantity).toFixed(2)}</span>
    `;
    summaryItemsList.appendChild(row);
  });
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  summaryItemsSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
  
  updateCheckoutTotals();
}

function resetDeliveryRates() {
  deliveryOptionsList.innerHTML = `
    <div class="carrier-prompt">
      <i class="fa-solid fa-map-location-dot"></i>
      <p>Please enter your delivery address to calculate live rates.</p>
    </div>
  `;
  selectedDeliveryPartner = null;
  deliveryCharge = 0;
  updateCheckoutTotals();
  placeOrderBtn.setAttribute("disabled", "true");
}

// Interactive Map Picker and Borzo Rate Engine
const mapPickerModalOverlay = document.getElementById("map-picker-modal-overlay");
const selectedCoordsDisplay = document.getElementById("selected-coords-display");
const btnConfirmMapPicker = document.getElementById("btn-confirm-map-picker");
const deliveryBuildingInput = document.getElementById("delivery-building");
const deliveryLatInput = document.getElementById("delivery-lat");
const deliveryLngInput = document.getElementById("delivery-lng");

const BORZO_SANDBOX_TOKEN = "5227CBA1AC19DC1AD08FFFF6CA66FFEB995E0D9A";

let pickerMap = null;
let pickerMarker = null;
let selectedLat = null;
let selectedLng = null;
let selectedLocalityString = "";

const mapSearchInput = document.getElementById("map-search-input");

// Trigger rate calculation when building name is updated (if address is already pinned)
if (deliveryBuildingInput) {
  deliveryBuildingInput.addEventListener("change", () => {
    if (selectedLat && selectedLng) {
      calculateRealOrMockRates();
    }
  });
}

let addressAutocomplete = null;
function initGoogleAutocompletes() {
  if (typeof google === "undefined" || !google.maps || !google.maps.places) {
    setTimeout(initGoogleAutocompletes, 100);
    return;
  }
  const addressField = document.getElementById("delivery-address");
  if (addressField && !addressAutocomplete) {
    addressAutocomplete = new google.maps.places.Autocomplete(addressField, {
      componentRestrictions: { country: "in" },
      fields: ["geometry", "formatted_address", "name"],
      types: ["geocode", "establishment"]
    });
    
    addressAutocomplete.addListener("place_changed", () => {
      const place = addressAutocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        selectedLat = place.geometry.location.lat();
        selectedLng = place.geometry.location.lng();
        selectedLocalityString = place.formatted_address || place.name || "";
        
        deliveryLatInput.value = selectedLat;
        deliveryLngInput.value = selectedLng;
        
        calculateRealOrMockRates();
      }
    });
  }
}

function openMapPicker() {
  mapPickerModalOverlay.classList.add("active");
  
  // Pre-fill map search input with building name to speed up search
  const buildingVal = deliveryBuildingInput.value.trim();
  if (buildingVal && !selectedLat && !selectedLng && mapSearchInput) {
    mapSearchInput.value = buildingVal;
  }
  
  setTimeout(() => {
    if (!pickerMap) {
      const defaultCenter = { lat: 19.0372, lng: 72.8631 }; // Sion West, Mumbai
      pickerMap = new google.maps.Map(document.getElementById("picker-map-canvas"), {
        center: defaultCenter,
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      });
      
      pickerMap.addListener("click", (e) => {
        handleMapSelection(e.latLng.lat(), e.latLng.lng());
      });
      
      // Initialize Google Places Autocomplete
      if (mapSearchInput) {
        const autocomplete = new google.maps.places.Autocomplete(mapSearchInput, {
          componentRestrictions: { country: "in" },
          fields: ["geometry", "formatted_address", "name"],
          types: ["geocode", "establishment"]
        });
        
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            
            pickerMap.setCenter(place.geometry.location);
            pickerMap.setZoom(17);
            
            selectedLat = lat;
            selectedLng = lng;
            selectedLocalityString = place.formatted_address || place.name || "";
            
            placePickerMarker(lat, lng);
            updateSelectedCoordsDisplay();
          }
        });
      }
    } else {
      google.maps.event.trigger(pickerMap, "resize");
    }
    
    if (selectedLat && selectedLng) {
      const pos = { lat: selectedLat, lng: selectedLng };
      pickerMap.setCenter(pos);
      pickerMap.setZoom(16);
      placePickerMarker(selectedLat, selectedLng);
    } else {
      const defaultCenter = { lat: 19.0372, lng: 72.8631 };
      pickerMap.setCenter(defaultCenter);
      pickerMap.setZoom(15);
      if (pickerMarker) {
        pickerMarker.setMap(null);
        pickerMarker = null;
      }
      btnConfirmMapPicker.setAttribute("disabled", "true");
      selectedCoordsDisplay.innerHTML = `<i class="fa-solid fa-location-crosshairs"></i> Click on the map to drop the delivery pin...`;
    }
  }, 250);
}

function placePickerMarker(lat, lng) {
  const pos = { lat: lat, lng: lng };
  if (pickerMarker) {
    pickerMarker.setPosition(pos);
  } else {
    pickerMarker = new google.maps.Marker({
      position: pos,
      map: pickerMap,
      draggable: true
    });
    
    pickerMarker.addListener("dragend", () => {
      const newPos = pickerMarker.getPosition();
      handleMapSelection(newPos.lat(), newPos.lng());
    });
  }
}

async function handleMapSelection(lat, lng) {
  selectedLat = lat;
  selectedLng = lng;
  placePickerMarker(lat, lng);
  
  btnConfirmMapPicker.setAttribute("disabled", "true");
  selectedCoordsDisplay.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Locating address...`;
  
  try {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat: lat, lng: lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        selectedLocalityString = results[0].formatted_address;
        updateSelectedCoordsDisplay();
      } else {
        fallbackCoordsDisplay(lat, lng);
      }
    });
  } catch (err) {
    console.error("Google reverse geocoding failed:", err);
    fallbackCoordsDisplay(lat, lng);
  }
}

function updateSelectedCoordsDisplay() {
  selectedCoordsDisplay.innerHTML = `<i class="fa-solid fa-location-dot" style="color: var(--color-brand-primary);"></i> ${selectedLocalityString}`;
  btnConfirmMapPicker.removeAttribute("disabled");
}

function fallbackCoordsDisplay(lat, lng) {
  selectedLocalityString = `Location Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  selectedCoordsDisplay.innerHTML = `<i class="fa-solid fa-location-dot"></i> Coordinates pinned successfully!`;
  btnConfirmMapPicker.removeAttribute("disabled");
}

function confirmMapSelection() {
  deliveryAddressInput.value = selectedLocalityString;
  deliveryLatInput.value = selectedLat;
  deliveryLngInput.value = selectedLng;
  
  closeMapPickerModal();
  calculateRealOrMockRates();
}

function closeMapPickerModal() {
  mapPickerModalOverlay.classList.remove("active");
}

function checkLocalDeliveryZone(address) {
  if (!address) return false;
  const clean = address.toLowerCase();
  const localKeywords = [
    "gtb nagar", "rawli camp", "antop hill", "antophill",
    "cuff parade", "pratiksha nagar", "sion", "matunga", "dadar", "sion hospital"
  ];
  return localKeywords.some(keyword => clean.includes(keyword));
}

function calculateCartWeight() {
  let totalWeight = 0;
  cart.forEach(item => {
    // Glass jar and items weight estimation: 200g size is ~0.4kg total, 400g size is ~0.8kg total
    const itemWeight = item.size === "200g" ? 0.4 : 0.8;
    totalWeight += itemWeight * item.quantity;
  });
  return totalWeight;
}

function selectCarrier(partner, charge) {
  document.querySelectorAll(".option-card").forEach(card => card.classList.remove("selected"));
  
  if (partner === 'local') {
    const localCard = document.getElementById("carrier-local");
    if (localCard) localCard.classList.add("selected");
    const localInput = document.querySelector('input[value="local"]');
    if (localInput) localInput.checked = true;
    selectedDeliveryPartner = {
      partner: "local",
      brand: "Om Delivery Rider",
      charge: 20.00,
      eta: 240,
      riderName: "Om Store Rider",
      riderPhone: "+91 98928 37460"
    };
    deliveryCharge = 20.00;
    
    // Auto-select afternoon slot for local delivery
    const slotInput = document.getElementById("delivery-time");
    if (slotInput) slotInput.value = "afternoon";
  } else {
    const borzoCard = document.getElementById("carrier-borzo");
    if (borzoCard) borzoCard.classList.add("selected");
    const borzoInput = document.querySelector('input[value="borzo"]');
    if (borzoInput) borzoInput.checked = true;
    selectedDeliveryPartner = {
      partner: "borzo",
      brand: "Borzo (Express Delivery)",
      charge: charge,
      eta: 25,
      riderName: "Vijay Sharma",
      riderPhone: "+91 98123 45678"
    };
    deliveryCharge = charge;
  }
  updateCheckoutTotals();
}

async function calculateRealOrMockRates() {
  const address = deliveryAddressInput.value.trim();
  const building = deliveryBuildingInput.value.trim();
  const phone = document.getElementById("customer-phone").value.trim() || "918880000001";
  
  const latVal = deliveryLatInput.value;
  const lngVal = deliveryLngInput.value;
  
  if (!address || address.includes("Click 'Pin on Map'") || address.includes("Type your address")) {
    resetDeliveryRates();
    return;
  }
  
  deliveryOptionsList.innerHTML = `
    <div class="carrier-prompt">
      <i class="fa-solid fa-circle-notch fa-spin" style="color: var(--color-brand-primary); font-size: 1.8rem; margin-bottom: 10px;"></i>
      <p>Calculating delivery fares...</p>
    </div>
  `;
  
  const cartWeight = calculateCartWeight();
  
  try {
    const points = [
      {
        address: "Shop No. 4, 353 Guru Arjun Niwas, Hukamchand Julka Chowk, Sion West, Mumbai - 400037",
        latitude: 19.0372,
        longitude: 72.8631,
        contact_person: {
          phone: "9892837460"
        }
      },
      {
        address: building ? `${building}, ${address}` : address,
        contact_person: {
          phone: phone.replace(/[^0-9+]/g, "")
        }
      }
    ];
    
    if (latVal && lngVal) {
      points[1].latitude = parseFloat(latVal);
      points[1].longitude = parseFloat(lngVal);
    }
    
    const response = await fetch("/api/calculate-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        matter: "Fresh Pickles & Snacks (Om Coldrink House)",
        weight: cartWeight,
        points: points
      })
    });

    const data = await response.json();
    
    if (data && data.is_successful) {
      const borzoRate = parseFloat(data.order.payment_amount);
      displayRates(borzoRate);
      return;
    } else {
      console.warn("Borzo rate calculation returned errors:", data.errors);
    }
  } catch (error) {
    console.warn("Direct Borzo sandbox API fetch failed (likely CORS). Using simulated rates.", error);
  }
  
  const simulatedRate = 98.00;
  displayRates(simulatedRate);
}

function displayRates(borzoRate) {
  const address = deliveryAddressInput.value.trim();
  const isLocal = checkLocalDeliveryZone(address);
  
  let optionsHtml = "";
  
  if (isLocal) {
    optionsHtml += `
      <div class="option-card selected" id="carrier-local" onclick="selectCarrier('local', 20.00)" style="cursor: pointer; display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 12px; margin-bottom: 10px; background-color: var(--color-bg-primary);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="radio" name="delivery_partner" value="local" checked style="margin: 0; width: auto; cursor: pointer;">
          <div class="option-details">
            <span class="partner-name" style="font-weight: 600; color: var(--color-brand-primary);"><i class="fa-solid fa-bicycle"></i> Om Delivery Rider (Local Zone)</span>
            <span class="eta" style="display: block; font-size: 0.8rem; color: var(--color-text-muted);"><i class="fa-regular fa-clock"></i> Afternoon delivery (12 PM - 4 PM)</span>
          </div>
        </div>
        <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end;">
          <span class="price" style="font-weight: 700; color: var(--color-text-primary);">₹20.00</span>
          <span class="badge" style="font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; background-color: var(--color-brand-primary-light); color: var(--color-brand-primary); font-weight: 600; margin-top: 4px;">Local Saver</span>
        </div>
      </div>
      
      <div class="option-card" id="carrier-borzo" onclick="selectCarrier('borzo', ${borzoRate})" style="cursor: pointer; display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 12px; margin-bottom: 10px; background-color: var(--color-bg-primary);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="radio" name="delivery_partner" value="borzo" style="margin: 0; width: auto; cursor: pointer;">
          <div class="option-details">
            <span class="partner-name" style="font-weight: 600; color: var(--color-text-primary);">Borzo (Express Courier)</span>
            <span class="eta" style="display: block; font-size: 0.8rem; color: var(--color-text-muted);"><i class="fa-regular fa-clock"></i> Delivery in 20-35 mins</span>
          </div>
        </div>
        <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end;">
          <span class="price" style="font-weight: 700; color: var(--color-text-primary);">₹${borzoRate.toFixed(2)}</span>
          <span class="badge" style="font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; background-color: var(--color-bg-secondary); color: var(--color-text-muted); font-weight: 600; margin-top: 4px;">Direct Courier</span>
        </div>
      </div>
    `;
    
    selectedDeliveryPartner = {
      partner: "local",
      brand: "Om Delivery Rider",
      charge: 20.00,
      eta: 240,
      riderName: "Om Store Rider",
      riderPhone: "+91 98928 37460"
    };
    deliveryCharge = 20.00;
  } else {
    optionsHtml += `
      <div class="option-card selected" id="carrier-borzo" onclick="selectCarrier('borzo', ${borzoRate})" style="cursor: pointer; display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 12px; margin-bottom: 10px; background-color: var(--color-bg-primary);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="radio" name="delivery_partner" value="borzo" checked style="margin: 0; width: auto; cursor: pointer;">
          <div class="option-details">
            <span class="partner-name" style="font-weight: 600; color: var(--color-text-primary);">Borzo (Express Courier)</span>
            <span class="eta" style="display: block; font-size: 0.8rem; color: var(--color-text-muted);"><i class="fa-regular fa-clock"></i> Delivery in 20-35 mins</span>
          </div>
        </div>
        <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end;">
          <span class="price" style="font-weight: 700; color: var(--color-text-primary);">₹${borzoRate.toFixed(2)}</span>
          <span class="badge" style="font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; background-color: var(--color-bg-secondary); color: var(--color-text-muted); font-weight: 600; margin-top: 4px;">Direct Courier</span>
        </div>
      </div>
    `;
    
    selectedDeliveryPartner = {
      partner: "borzo",
      brand: "Borzo (Express Delivery)",
      charge: borzoRate,
      eta: 25,
      riderName: "Vijay Sharma",
      riderPhone: "+91 98123 45678"
    };
    deliveryCharge = borzoRate;
  }
  
  deliveryOptionsList.innerHTML = optionsHtml;
  updateCheckoutTotals();
  placeOrderBtn.removeAttribute("disabled");
}

function updateCheckoutTotals() {
  summaryDeliveryCharge.textContent = deliveryCharge > 0 ? `₹${deliveryCharge.toFixed(2)}` : "₹0.00";
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const grandTotal = subtotal + deliveryCharge;
  summaryGrandTotal.textContent = `₹${grandTotal.toFixed(2)}`;
  
  // Dynamic UPI QR Code updater
  const qrImage = document.getElementById("upi-qr-image");
  if (qrImage) {
    const amount = grandTotal.toFixed(2);
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=upi://pay?pa=9892837460@okbizaxis%26pn=Om%2520Coldrink%2520House%26am=${amount}%26cu=INR`;
  }
}

function populateDeliveryDates() {
  const dateSelect = document.getElementById("delivery-date");
  if (!dateSelect) return;
  dateSelect.innerHTML = "";
  
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  
  const options = [
    { value: "today", label: `Today, ${today.toLocaleDateString("en-US", { month: "short", day: "numeric" })}` },
    { value: "tomorrow", label: `Tomorrow, ${tomorrow.toLocaleDateString("en-US", { month: "short", day: "numeric" })}` }
  ];
  
  options.forEach(opt => {
    const o = document.createElement("option");
    o.value = opt.value;
    o.textContent = opt.label;
    dateSelect.appendChild(o);
  });
}

function validateCheckoutTimeConstraints() {
  const dateSelect = document.getElementById("delivery-date");
  const timeSelect = document.getElementById("delivery-time");
  
  if (!dateSelect || !timeSelect) return true;
  
  const selectedDateVal = dateSelect.value;
  const selectedSlot = timeSelect.value;
  
  if (!selectedDateVal || !selectedSlot) {
    alert("Please select a delivery date and time slot.");
    return false;
  }
  
  const now = new Date();
  const currentHour = now.getHours();
  
  if (selectedDateVal === "today") {
    // Local Delivery must be before 10 AM same day
    if (selectedDeliveryPartner && selectedDeliveryPartner.partner === "local") {
      if (currentHour >= 10) {
        alert("Same-day local rider deliveries must be placed before 10:00 AM. Please select 'Tomorrow' for local rider, or choose 'Borzo Express Courier' for today's delivery.");
        return false;
      }
    }
    
    // Slots must be 1 hour in the future
    if (selectedSlot === "afternoon" && currentHour >= 11) {
      alert("Afternoon slot (12 PM - 4 PM) is unavailable for same-day delivery. Please select Evening slot or Tomorrow.");
      return false;
    }
    
    if (selectedSlot === "evening" && currentHour >= 15) {
      alert("Evening slot (4 PM - 8 PM) is unavailable for same-day delivery. Please select Tomorrow.");
      return false;
    }
  }
  
  return true;
}

function handleOrderPlacement() {
  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const building = document.getElementById("delivery-building").value.trim();
  const locality = document.getElementById("delivery-address").value.trim();
  const utr = document.getElementById("payment-utr").value.trim();
  const dateVal = document.getElementById("delivery-date").value;
  const slotVal = document.getElementById("delivery-time").value;
  
  if (!name || !phone || !locality || !selectedDeliveryPartner) {
    alert("Please complete the delivery details first.");
    return;
  }
  
  if (!utr || !/^[a-zA-Z0-9]{4,20}$/.test(utr)) {
    alert("Please enter a valid UPI Transaction Ref / UTR number (at least 4 characters).");
    return;
  }
  
  if (!validateCheckoutTimeConstraints()) {
    return;
  }
  
  const fullAddress = building ? `${building}, ${locality}` : locality;
  
  placeOrderBtn.setAttribute("disabled", "true");
  placeOrderBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting payment details...`;
  
  setTimeout(() => {
    const randomHex = Math.floor((1 + Math.random()) * 0x10000000).toString(16).substring(1);
    const orderId = `OM-${randomHex.substring(0, 8).toUpperCase()}`;
    
    // Clear cart
    const orderedItems = [...cart];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const grandTotal = subtotal + deliveryCharge;
    
    cart = [];
    updateCartUI();
    toggleCheckoutModal();
    
    // Launch Live Tracker with "Pending Admin Verification"
    launchLiveTracker(orderId, name, phone, fullAddress, orderedItems, selectedDeliveryPartner, utr, grandTotal, dateVal, slotVal);
    
    placeOrderBtn.removeAttribute("disabled");
    placeOrderBtn.textContent = "Confirm Order";
  }, 1500);
}

function launchLiveTracker(orderId, name, phone, address, items, carrier, utr, totalAmount, dateVal, slotVal) {
  trackerOrderId.textContent = `Order ${orderId}`;
  trackerModalOverlay.classList.add("active");
  
  trackerItemsList.innerHTML = "";
  items.forEach(item => {
    const row = document.createElement("div");
    row.className = "tracker-item-row";
    row.innerHTML = `
      <span class="tracker-item-name">${item.name} (${item.size}) (x${item.quantity})</span>
      <span class="tracker-item-price">₹${(item.price * item.quantity).toFixed(2)}</span>
    `;
    trackerItemsList.appendChild(row);
  });
  
  courierName.textContent = "Verifying Payment...";
  carrierBrand.textContent = `Partner: ${carrier.brand}`;
  trackingLinkBtn.style.opacity = "0.5";
  trackingLinkBtn.style.pointerEvents = "none";
  trackingLinkBtn.href = "#";
  
  resetTrackerTimeline();
  const currentFormattedTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  timeReceived.textContent = currentFormattedTime;
  
  // Custom styled step texts
  const stepText1 = document.querySelector("#step-received p");
  if (stepText1) stepText1.innerHTML = `<strong>Payment Awaiting</strong><br><small id="time-received">${currentFormattedTime}</small>`;
  
  trackerStatusText.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="color: var(--color-brand-primary);"></i> Awaiting admin payment approval for UTR: <strong>${utr}</strong> (₹${totalAmount.toFixed(2)}).`;
  
  // Format items description for WhatsApp message
  const itemsText = items.map(item => `${item.name} (${item.size}) x${item.quantity}`).join(", ");
  
  // Admin approval URL (cross-tab interaction ready!)
  const adminApprovalUrl = `https://omcoldrinkhouse.com/admin.html?orderId=${orderId}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&utr=${utr}&amount=${totalAmount.toFixed(2)}&delivery=${carrier.partner}&weight=${calculateCartWeight()}`;
  
  // Fill text area preview
  whatsappMessagePreview.textContent = `"Hi ${name}, order ${orderId} submitted! UTR: ${utr}. Awaiting verification. Admin approval portal link generated."`;
  
  // Primary trigger to whatsapp contact for verification
  const userWaText = encodeURIComponent(`Hi Om Coldrink House, I have placed order ${orderId} for ₹${totalAmount.toFixed(2)}. UPI UTR Number: ${utr}. Please approve my order!\n\nDetails:\nAddress: ${address}\nItems: ${itemsText}\nDelivery Date/Slot: ${dateVal} - ${slotVal}\n\nMerchant Approval Link:\n${adminApprovalUrl}`);
  
  const whatsappSendLink = document.createElement("a");
  whatsappSendLink.href = `https://wa.me/919892837460?text=${userWaText}`;
  whatsappSendLink.target = "_blank";
  whatsappSendLink.style.display = "block";
  whatsappSendLink.style.textAlign = "center";
  whatsappSendLink.style.marginTop = "15px";
  whatsappSendLink.style.padding = "10px";
  whatsappSendLink.style.backgroundColor = "#25D366";
  whatsappSendLink.style.color = "white";
  whatsappSendLink.style.borderRadius = "var(--radius-sm)";
  whatsappSendLink.style.fontWeight = "600";
  whatsappSendLink.style.textDecoration = "none";
  whatsappSendLink.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Send Payment Receipt on WhatsApp`;
  
  // Append after whatsappMessagePreview
  const previewParent = whatsappMessagePreview.parentElement;
  const existingWaButton = previewParent.querySelector(".wa-send-receipt-btn");
  if (existingWaButton) existingWaButton.remove();
  whatsappSendLink.className = "wa-send-receipt-btn";
  previewParent.appendChild(whatsappSendLink);
  
  let timeElapsed = 0;
  let isApproved = false;
  
  if (trackerInterval) clearInterval(trackerInterval);
  
  // Listen for admin cross-tab localStorage update approval!
  localStorage.removeItem(`approve-${orderId}`);
  
  const checkApproval = setInterval(() => {
    if (localStorage.getItem(`approve-${orderId}`) === "true") {
      isApproved = true;
      localStorage.removeItem(`approve-${orderId}`);
    }
  }, 500);
  
  trackerInterval = setInterval(() => {
    timeElapsed += 1;
    
    // Auto-approve after 15 seconds if not approved by cross-tab yet (to maintain fluid user simulation)
    if (timeElapsed >= 15) {
      isApproved = true;
    }
    
    if (isApproved && stepReceived.classList.contains("active") && !stepPreparing.classList.contains("active")) {
      stepReceived.classList.add("complete");
      stepPreparing.classList.add("active");
      trackerProgressFill.style.width = "33%";
      const prepTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
      timePreparing.textContent = prepTime;
      trackerStatusText.innerHTML = `<strong>Payment Approved!</strong> Preparing your pickles and packaging them in our Sion West kitchen.`;
      courierName.textContent = "Kitchen Packaging...";
      
      const stepText2 = document.querySelector("#step-preparing p");
      if (stepText2) stepText2.innerHTML = `<strong>Preparing Jar</strong><br><small id="time-preparing">${prepTime}</small>`;
      
      // Update whatsapp preview
      whatsappMessagePreview.textContent = `"Hi ${name}, your order ${orderId} has been verified and is now entering packaging phase."`;
    }
    
    if (timeElapsed === 28) {
      stepPreparing.classList.add("complete");
      stepDispatched.classList.add("active");
      trackerProgressFill.style.width = "66%";
      const dispatchTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
      timeDispatched.textContent = dispatchTime;
      
      courierName.textContent = carrier.riderName;
      trackerStatusText.innerHTML = `Dispatched via <strong>${carrier.brand}</strong>. Rider ${carrier.riderName} (${carrier.riderPhone}) is on the way.`;
      
      const stepText3 = document.querySelector("#step-dispatched p");
      if (stepText3) stepText3.innerHTML = `<strong>Dispatched</strong><br><small id="time-dispatched">${dispatchTime}</small>`;
      
      trackingLinkBtn.style.opacity = "1";
      trackingLinkBtn.style.pointerEvents = "auto";
      trackingLinkBtn.href = `https://borzodelivery.com/in/track/${Math.floor(Math.random() * 9000000 + 1000000)}`;
      
      whatsappMessagePreview.textContent = `"Hi ${name}, your order ${orderId} has been dispatched! Track here: ${trackingLinkBtn.href}"`;
    }
    
    if (timeElapsed === 42) {
      stepDispatched.classList.add("complete");
      stepDelivered.classList.add("active");
      stepDelivered.classList.add("complete");
      trackerProgressFill.style.width = "100%";
      const delTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
      timeDelivered.textContent = delTime;
      trackerStatusText.innerHTML = `<strong>Delivered!</strong> Your order has been delivered. Thank you for choosing Om Coldrink House!`;
      
      const stepText4 = document.querySelector("#step-delivered p");
      if (stepText4) stepText4.innerHTML = `<strong>Delivered</strong><br><small id="time-delivered">${delTime}</small>`;
      
      whatsappMessagePreview.textContent = `"Hi ${name}, your order ${orderId} has been delivered successfully. Enjoy your Punjabi treat!"`;
      
      clearInterval(trackerInterval);
      clearInterval(checkApproval);
    }
  }, 1000);
}

function resetTrackerTimeline() {
  stepReceived.className = "step active";
  stepPreparing.className = "step";
  stepDispatched.className = "step";
  stepDelivered.className = "step";
  trackerProgressFill.style.width = "0%";
  
  const stepText1 = document.querySelector("#step-received p");
  if (stepText1) stepText1.innerHTML = `<strong>Placed</strong><br><small id="time-received">--:--</small>`;
  const stepText2 = document.querySelector("#step-preparing p");
  if (stepText2) stepText2.innerHTML = `<strong>Preparing</strong><br><small id="time-preparing">--:--</small>`;
  const stepText3 = document.querySelector("#step-dispatched p");
  if (stepText3) stepText3.innerHTML = `<strong>Dispatched</strong><br><small id="time-dispatched">--:--</small>`;
  const stepText4 = document.querySelector("#step-delivered p");
  if (stepText4) stepText4.innerHTML = `<strong>Delivered</strong><br><small id="time-delivered">--:--</small>`;
}

function closeTrackerModal() {
  if (trackerInterval) clearInterval(trackerInterval);
  trackerModalOverlay.classList.remove("active");
}

// ==========================================================================
// FAQ Accordion Collapsible Logic
// ==========================================================================

function initFaqs() {
  document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      const answer = faqItem.querySelector(".faq-answer");
      const isActive = faqItem.classList.contains("active");
      
      // Close other FAQs
      document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("active");
        item.querySelector(".faq-answer").style.maxHeight = null;
      });
      
      if (!isActive) {
        faqItem.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

// ==========================================================================
// Compliance Policies & Modal Logic
// ==========================================================================

const policies = {
  privacy: {
    title: "Privacy Policy",
    content: `
      <p><strong>Om Coldrink House</strong> is committed to protecting your personal information. Under the Information Technology Act, 2000 and Digital Personal Data Protection (DPDP) Act, 2023, we declare the following:</p>
      <br>
      <h4>1. Information Collection</h4>
      <p>We only collect your name, phone number, and delivery address to facilitate order processing and courier delivery. No account registration is required.</p>
      <br>
      <h4>2. Cookies</h4>
      <p>We use local storage only to maintain your shopping cart basket while you browse the site. No tracking cookies are used.</p>
      <br>
      <h4>3. Data Sharing</h4>
      <p>Your details are shared strictly with our delivery partners (such as Porter or Borzo) to complete delivery. We never sell or distribute your contact details to third parties.</p>
    `
  },
  terms: {
    title: "Terms of Service",
    content: `
      <p>Welcome to the <strong>Om Coldrink House</strong> online catalog. By placing a simulated order, you agree to these terms:</p>
      <br>
      <h4>1. Store Listings</h4>
      <p>All items displayed (Matthri, Gudd Paare, Shakkar Paare, Jackfruit, Bitter Gourd, Mango, and Karvanda Pickles) are offered at our family-run store at Shop No. 4, 353 Guru Arjun Niwas, Sion West, Mumbai.</p>
      <br>
      <h4>2. Delivery Limitations</h4>
      <p>Delivery is limited strictly to areas within Mumbai served by local courier partners. Pricing is dynamic based on distance.</p>
      <br>
      <h4>3. Dispute Resolution</h4>
      <p>Any concerns regarding quality should be referred directly to our Grievance Officer, Hriday Julka, at +91 77389 02561.</p>
    `
  },
  refund: {
    title: "Refund & Cancellation Policy",
    content: `
      <p>Under the Indian Food Safety regulations (FSSAI) and Consumer Protection Rules, food products are perishable and cannot be returned once delivered.</p>
      <br>
      <h4>1. Damaged or Incorrect Orders</h4>
      <p>If you receive the wrong product or if the jar is broken/damaged during courier transit, please send a photograph of the package to our WhatsApp support at <strong>+91 98928 37460</strong> or <strong>+91 77389 02561</strong> within 24 hours of delivery.</p>
      <br>
      <h4>2. Resolution</h4>
      <p>Approved claims will receive a 100% refund processed back via UPI or a fresh replacement shipped to your address free of charge within 24 hours.</p>
      <br>
      <h4>3. Order Cancellation</h4>
      <p>Orders can only be cancelled before they enter the "Packaging" phase. Once the jar has been wrapped and dispatched, cancellation is not possible.</p>
    `
  }
};

const complianceModalOverlay = document.getElementById("compliance-modal-overlay");
const complianceTitle = document.getElementById("compliance-title");
const complianceContent = document.getElementById("compliance-content");
const closeComplianceBtn = document.getElementById("close-compliance");

function showPolicy(policyKey) {
  const policy = policies[policyKey];
  if (policy) {
    complianceTitle.textContent = policy.title;
    complianceContent.innerHTML = policy.content;
    complianceModalOverlay.style.display = "flex";
    setTimeout(() => {
      complianceModalOverlay.style.opacity = "1";
    }, 10);
  }
}

function closePolicyModal() {
  complianceModalOverlay.style.opacity = "0";
  setTimeout(() => {
    complianceModalOverlay.style.display = "none";
  }, 300);
}

function initBottleOpenerScroll() {
  const widget = document.getElementById("bottle-opener-widget");
  const opener = document.getElementById("widget-opener");
  const cap = document.getElementById("widget-cap");
  const fizz = document.getElementById("widget-fizz");
  const scene = document.getElementById("bottle-scene");
  const statusTitle = document.getElementById("bottle-status-title");
  const statusDesc = document.getElementById("bottle-status-desc");

  if (!widget || !opener || !cap || !fizz || !scene || !statusTitle || !statusDesc) return;

  let popped = false;

  function handleScroll() {
    const rect = widget.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // We calculate progress relative to the screen. 
    // It starts when the top of the card is visible at the bottom of the viewport
    // and completes when the center of the card is at the center of the viewport.
    const startY = viewportHeight;
    const endY = viewportHeight * 0.35;
    
    const currentY = rect.top;
    
    let progress = (startY - currentY) / (startY - endY);
    progress = Math.max(0, Math.min(1, progress));

    if (progress < 0.6) {
      // Step 1: Opener descends onto the cap
      // Descend: top moves from 30px to 108px
      const currentTop = 30 + (progress / 0.6) * 78;
      opener.style.top = `${currentTop}px`;
      
      // Rotate opener slightly: from -30deg to -5deg
      const currentRot = -30 + (progress / 0.6) * 25;
      opener.style.transform = `translateX(-50%) rotate(${currentRot}deg)`;
      
      // Reset cap & fizz
      cap.style.top = "110px";
      cap.style.transform = "translateX(-50%) rotate(0deg)";
      cap.style.opacity = "1";
      fizz.style.display = "none";
      scene.classList.remove("opened-sparkle");
      
      statusTitle.textContent = "Coldrink Bottle Sealed";
      statusDesc.textContent = "Scroll down to align the opener and pop open our legacy!";
      popped = false;
    } else {
      // Step 2: Opener prys cap open (progress 0.6 to 1.0)
      const pryProgress = (progress - 0.6) / 0.4; // 0 to 1
      
      // Opener rotates upwards: from -5deg to 35deg
      const currentRot = -5 + (pryProgress * 40);
      opener.style.transform = `translateX(-50%) rotate(${currentRot}deg)`;
      opener.style.top = `${108 - (pryProgress * 15)}px`;
      
      if (pryProgress < 0.3) {
        // Cap starts prying
        cap.style.top = `${110 - (pryProgress * 10)}px`;
        cap.style.transform = `translateX(-50%) rotate(${-pryProgress * 20}deg)`;
        cap.style.opacity = "1";
        fizz.style.display = "none";
        scene.classList.remove("opened-sparkle");
        statusTitle.textContent = "Unlocking Heritage...";
        statusDesc.textContent = "Just a little more scroll to pop the cap!";
      } else {
        // Cap pops off completely
        const flyProgress = (pryProgress - 0.3) / 0.7; // 0 to 1
        
        cap.style.top = `${107 - (flyProgress * 140)}px`;
        cap.style.transform = `translateX(calc(-50% + ${flyProgress * 160}px)) rotate(${flyProgress * 360}deg)`;
        cap.style.opacity = `${1 - flyProgress}`;
        
        fizz.style.display = "flex";
        scene.classList.add("opened-sparkle");
        
        statusTitle.textContent = "POP! Opened Since 1968";
        statusDesc.textContent = "The legacy established by Late Shri Swaranlal Julka and the family is preserved fresh daily. Savor Sion Koliwada's authentic tastes!";
        
        if (!popped) {
          popped = true;
        }
      }
    }
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleScroll);
  handleScroll(); // Trigger initial state
}

// ==========================================================================
// Initialization & Bindings
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  updateCartUI();
  initFaqs();
  initBottleOpenerScroll();
  
  // Filter Click Listeners
  document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
      
      const filterValue = e.target.getAttribute("data-filter");
      renderCatalog(filterValue);
    });
  });
  
  // Bind Header Cart and drawer close
  cartTrigger.addEventListener("click", toggleCartDrawer);
  closeDrawerBtn.addEventListener("click", toggleCartDrawer);
  cartDrawerOverlay.addEventListener("click", toggleCartDrawer);
  
  // Bind Checkout Buttons
  proceedCheckoutBtn.addEventListener("click", () => {
    toggleCartDrawer();
    toggleCheckoutModal();
  });
  closeCheckoutBtn.addEventListener("click", toggleCheckoutModal);
  
  // Bind Order Placement
  checkoutForm.addEventListener("submit", handleOrderPlacement);
  
  // Bind Tracker Close
  closeTrackerBtn.addEventListener("click", closeTrackerModal);

  // Bind Compliance Links
  document.getElementById("policy-privacy-link").addEventListener("click", (e) => {
    e.preventDefault();
    showPolicy("privacy");
  });
  document.getElementById("policy-terms-link").addEventListener("click", (e) => {
    e.preventDefault();
    showPolicy("terms");
  });
  document.getElementById("policy-refund-link").addEventListener("click", (e) => {
    e.preventDefault();
    showPolicy("refund");
  });

  // Bind Compliance Close
  closeComplianceBtn.addEventListener("click", closePolicyModal);
  complianceModalOverlay.addEventListener("click", (e) => {
    if (e.target === complianceModalOverlay) {
      closePolicyModal();
    }
  });

  // Bind Map Picker events
  const btnLocateMap = document.getElementById("btn-locate-map");
  const closeMapPicker = document.getElementById("close-map-picker");
  const btnCancelMapPicker = document.getElementById("btn-cancel-map-picker");
  const mapSearchInput = document.getElementById("map-search-input");
  
  if (btnLocateMap) btnLocateMap.addEventListener("click", openMapPicker);
  if (closeMapPicker) closeMapPicker.addEventListener("click", closeMapPickerModal);
  if (btnCancelMapPicker) btnCancelMapPicker.addEventListener("click", closeMapPickerModal);
  if (btnConfirmMapPicker) btnConfirmMapPicker.addEventListener("click", confirmMapSelection);
  
  // Set up date selections
  populateDeliveryDates();
  
  // Initialize Google Autocomplete on fields
  initGoogleAutocompletes();
  
  // Recalculate if user changes manual address input text manually
  if (deliveryAddressInput) {
    deliveryAddressInput.addEventListener("change", () => {
      calculateRealOrMockRates();
    });
  }
});
