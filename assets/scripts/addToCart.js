document.getElementById('add-to-cart-button').addEventListener('click', async function () {
    // const id = document.getElementById('artworkId').textContent.split(' ')[1];

    const url = location.href;
    const searchParams = new URLSearchParams(url);
    // const id = searchParams.get('id');
    const reg = /id=([^&]+)/;
    const id = location.href.match(reg)[1];
    // const { id } = $.parseURL(url).queryParams;
    console.log(url);
    console.log(id);
    // console.log(PaintingID)
    // const id = thisId;
    console.log(`Add artwork ${id} to cart`);
    // const response = await fetch(`./php/addToCart.php?id=${id}`, { method: 'POST' });
    const response = await fetch('./php/addCart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id=${id}`
    });
    const result = await response.json();

    if (result.success) {
        alert('Successfully added to cart!');
    } else {
        console.error(result.error);
        alert('Failed to add to Cart! Maybe already in Cart!');
    }
});