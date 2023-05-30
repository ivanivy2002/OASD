// 卡片数据，可以根据需要进行修改
const cardData = [
    {
      title: "Product 1",
      description: "Product 1 description",
      price: "$499.49",
    },
    {
      title: "Product 2",
      description: "Product 2 description",
      price: "$599.49",
    },
    // 其他卡片数据
  ];
  
  // 获取父容器元素
  const cardContainer = document.querySelector(".card-container");
  
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