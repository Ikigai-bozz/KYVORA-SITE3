document.addEventListener("DOMContentLoaded", () => {
    const categoryButtons = document.querySelectorAll(".category-button");
    const searchInput = document.getElementById("product-search");
    const sortSelect = document.getElementById("sort-options");
    const productGrid = document.getElementById("product-grid");
    const productCards = Array.from(document.querySelectorAll(".product-card"));
    const noResults = document.getElementById("no-results");

    const updateProducts = () => {
        if (!productGrid || !searchInput || !sortSelect) {
            return;
        }

        const query = searchInput.value.trim().toLowerCase();
        const selectedCategory = document.querySelector(".category-button.active")?.dataset.category || "all";
        const sortType = sortSelect.value;

        const filtered = productCards.filter((card) => {
            const title = card.dataset.name.toLowerCase();
            const category = card.dataset.category;
            const matchesCategory = selectedCategory === "all" || category === selectedCategory;
            const matchesSearch = query === "" || title.includes(query);

            return matchesCategory && matchesSearch;
        });

        filtered.sort((a, b) => {
            if (sortType === "price-low") {
                return Number(a.dataset.price) - Number(b.dataset.price);
            }

            if (sortType === "price-high") {
                return Number(b.dataset.price) - Number(a.dataset.price);
            }

            if (sortType === "best-selling") {
                return Number(b.dataset.popularity) - Number(a.dataset.popularity);
            }

            return new Date(b.dataset.date) - new Date(a.dataset.date);
        });

        productGrid.innerHTML = "";
        filtered.forEach((card) => productGrid.appendChild(card));

        if (noResults) {
            noResults.hidden = filtered.length > 0;
        }
    };

    categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            categoryButtons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");
            updateProducts();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", updateProducts);
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", updateProducts);
    }

    updateProducts();

    const cartBtn = document.getElementById("cart-btn");
    const cartSidebar = document.getElementById("cart-sidebar");
    const closeCart = document.getElementById("close-cart");

    if (cartBtn && cartSidebar) {
        cartBtn.addEventListener("click", () => {
            cartSidebar.classList.add("active");
        });
    }

    if (closeCart && cartSidebar) {
        closeCart.addEventListener("click", () => {
            cartSidebar.classList.remove("active");
        });
    }

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));

        if (!cartItemsContainer) {
            return;
        }

        cartItemsContainer.innerHTML = "";

        let total = 0;
        let count = 0;

        cart.forEach((item) => {
            total += item.price * item.quantity;
            count += item.quantity;

            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <strong>${item.name}</strong><br>
                    $${item.price}

                    <div class="qty-controls">
                        <button class="qty-btn minus" data-name="${item.name}">−</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn plus" data-name="${item.name}">+</button>
                    </div>

                    <button class="remove-item" data-name="${item.name}">✕ Remove</button>
                    <hr>
                </div>
            `;
        });

        if (cartTotal) {
            cartTotal.textContent = total;
        }

        if (cartCount) {
            cartCount.textContent = count;
        }

        document.querySelectorAll(".plus").forEach((btn) => {
            btn.addEventListener("click", () => {
                const item = cart.find((product) => product.name === btn.dataset.name);

                if (item) {
                    item.quantity++;
                    updateCart();
                }
            });
        });

        document.querySelectorAll(".minus").forEach((btn) => {
            btn.addEventListener("click", () => {
                const item = cart.find((product) => product.name === btn.dataset.name);

                if (item && item.quantity > 1) {
                    item.quantity--;
                    updateCart();
                }
            });
        });

        document.querySelectorAll(".remove-item").forEach((btn) => {
            btn.addEventListener("click", () => {
                cart = cart.filter((item) => item.name !== btn.dataset.name);
                updateCart();
            });
        });
    }

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = Number(button.dataset.price);
            const existingItem = cart.find((item) => item.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    name,
                    price,
                    quantity: 1,
                });
            }

            updateCart();
        });
    });

    updateCart();
});
