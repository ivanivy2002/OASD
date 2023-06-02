// Load the cart items when the page loads
function fetchCartItems() {
    fetch('./php/getCartItems.php')
        .then(response => response.json())
        .then(displayCartItems);
};


// Display the cart items
function displayCartItems(items) {
    const container = document.getElementById('cartContainer');
    container.innerHTML = '';
    let totalPrice = 0;

    for (let item of items) {
        let cartItem = document.createElement('div');
        cartItem.className = 'cartItem';
        let cartItemClickHandler = () => {
            // Send a request to increase the visit count
            fetch('./php/increaseVisited.php', {
                method: 'POST',
                body: JSON.stringify({ artworkId: item.PaintingID })
            });
            // Open the artwork detail page
            window.location.href = 'details.html?id=' + item.PaintingID;
        };
        cartItem.onclick = cartItemClickHandler;

        let image = document.createElement('img');

        image.src = './assets/images/works/square-small/' + item.ImageFileName + '.jpg';
        cartItem.appendChild(image);

        let name = document.createElement('h2');
        name.className = 'name';
        name.textContent = item.Title;
        cartItem.appendChild(name);

        let status = document.createElement('p');
        status.className = 'status';
        status.textContent = item.status == 1 ? 'SOLD OUT' : '';
        status.style.color = 'red';
        cartItem.appendChild(status);

        let price = document.createElement('p');
        price.className = 'price';
        price.textContent = "$" + parseFloat(item.Cost).toFixed(2);
        cartItem.appendChild(price);

        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function (event) {
            // Disable the cart item click handler
            cartItem.onclick = null;
            if (confirm('Remove from Cart?') === false) {
                return;
            }
            event.preventDefault(); // 阻止默认跳转
            fetch('./php/removeFromCart.php', {
                method: 'POST',
                body: JSON.stringify({ itemId: item.id })
            })
                .then(() => {
                    // Refresh the cart items
                    fetch('./php/getCartItems.php')
                        .then(response => response.json())
                        .then(displayCartItems);
                });
        };
        cartItem.appendChild(removeButton);

        container.appendChild(cartItem);
        if (item.status == 1) {
            continue; // Skip the sold out items
        }
        totalPrice += parseInt(item.Cost);
        console.log(`totalPrice: ${totalPrice}`);
    }
    let total = document.getElementById('total');
    total.textContent = 'Total: $' + totalPrice;
}

// Handle the checkout button click
document.getElementById('checkoutButton').onclick = function () {
    if (confirm('Are you sure you want to checkout?') === false) {
        return;
    }
    fetch('./php/checkout.php')
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Checkout successful!');
                // Clear the cart
                document.getElementById('cartContainer').innerHTML = '';
                displayCartItems([]);
            } else {
                alert('Checkout failed: ' + result.message);
            }
        });
};
