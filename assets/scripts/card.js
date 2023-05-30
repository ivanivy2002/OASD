var xhr = new XMLHttpRequest();
// xhr.open('GET', '../../php/getpaintings.php', true);
xhr.open('GET', '../../getpaintings.php', true);
xhr.send();

// 获取父容器元素
const cardContainer = document.querySelector(".card-container");

var cards = document.getElementById('cards');

xhr.onload = function () {
  if(xhr.responseText.startsWith("{")){
    // 解析JSON
  }else{
    alert(xhr.responseText); // 显示SQL错误等
  }
  // var data = JSON.parse(xhr.responseText);
  // cardData = JSON.parse(xhr.responseText);
  renderCards(JSON.parse(xhr.responseText));
  // data now contains the array from PHP
  // const cardData = data;
}

function renderCards(cardData) {
  // 遍历卡片数据并动态创建卡片元素
  cardData.forEach((card) => {
    // 创建卡片元素
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    // 创建卡片内容元素
    const cardImg = document.createElement("div");
    cardImg.classList.add("card-img");
    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");
    const title = document.createElement("p");
    title.classList.add("text-title");
    title.textContent = card.title;
    const description = document.createElement("p");
    description.classList.add("text-body");
    description.textContent = card.description;
    const price = document.createElement("span");
    price.classList.add("text-title");
    price.textContent = card.price;

    // 将卡片内容元素添加到卡片元素中
    cardInfo.appendChild(title);
    cardInfo.appendChild(description);
    cardElement.appendChild(cardImg);
    cardElement.appendChild(cardInfo);
    cardElement.appendChild(price);

    // 将卡片元素添加到父容器中
    cardContainer.appendChild(cardElement);
  });
}


// data.forEach(function(item) {
//   var card = document.createElement('div');
//   card.classList.add('card');

//   var title = document.createElement('h3');  
//   title.textContent = item.Title;  

//   var img = document.createElement('img');  
//   img.src = item.ImageFileName;

//   card.appendChild(title);  
//   card.appendChild(img);

//   cards.appendChild(card);
// })

// 卡片数据，可以根据需要进行修改
// const cardData = [
//   {
//     title: "Product 1",
//     description: "Product 1 description",
//     price: "$499.49",
//   },
//   {
//     title: "Product 2",
//     description: "Product 2 description",
//     price: "$599.49",
//   },
//   // 其他卡片数据
// ];



