document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("product-grid");
    const searchInput = document.getElementById("search");
    const filterSelect = document.getElementById("filter");

    function fetchProducts() {
        fetch("data/products.json")
            .then(response => response.json())
            .then(products => {
                renderProducts(products);
            });
    }

    function renderProducts(products) {
        productGrid.innerHTML = ""; // Clear previous content

        products.forEach((product, index) => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");

            // Add animation delay for smooth transition
            productElement.style.animation = `fadeIn 0.4s ease-in-out ${index * 0.1}s both`;

            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p><strong>$${product.price}</strong></p>
            `;
            productGrid.appendChild(productElement);
        });
    }

    function filterProducts() {
        fetch("data/products.json")
            .then(response => response.json())
            .then(products => {
                let filteredProducts = products.filter(product => 
                    product.name.toLowerCase().includes(searchInput.value.toLowerCase()) &&
                    (filterSelect.value === "all" || product.category === filterSelect.value)
                );
                renderProducts(filteredProducts);
            });
    }

    searchInput.addEventListener("input", filterProducts);
    filterSelect.addEventListener("change", filterProducts);

    fetchProducts();
});
