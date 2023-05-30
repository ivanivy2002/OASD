// 商品数据
const items = [
    {
        name: '商品1',
        price: 100,
    },
    {
        name: '商品2',
        price: 200,
    },
    {
        name: '商品3',
        price: 300,
    },
];

// 购物车数据
let cartItems = [];

// 获取DOM元素
const cartItemsContainer = document.querySelector('#cart-items');
const totalPriceAmount = document.querySelector('#total-price-amount');
const checkoutButton = document.querySelector('#checkout-button');

// 生成购物车表格行
function generateCartRow(item, index) {
    const tr = document.createElement('tr');

    const nameTd = document.createElement('td');
    nameTd.textContent = item.name;

    const priceTd = document.createElement('td');
    priceTd.textContent = item.price;

    const quantityTd = document.createElement('td');
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = 1;
    quantityInput.min = 1;
    quantityInput.addEventListener('change', (event) => {
        cartItems[index].quantity = parseInt(event.target.value);
        updateTotalPrice();
    });
    quantityTd.appendChild(quantityInput);

    const removeTd = document.createElement('td');
    const removeButton = document.createElement('button');
}
