document.addEventListener('DOMContentLoaded', function() {
    // Obtener el ID del producto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product'); // e.g. ?product=product1

    if (!productId) {
        alert("Producto no especificado");
        return;
    }

    // Cargar el archivo JSON correspondiente al producto
    fetch(`/products/${productId}.json`)
        .then(response => response.json())
        .then(product => {
            // Rellenar los elementos del DOM con los datos del producto
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-description').textContent = product.description;
            document.getElementById('product-price').textContent = `$${product.price}`;
            document.getElementById('product-image').src = product.image;
        })
        .catch(error => {
            console.error('Error cargando el producto:', error);
            alert('Error al cargar el producto.');
        });
});