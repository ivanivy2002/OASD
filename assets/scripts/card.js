const cardContainer = document.querySelector(".card-container");
var cards = document.getElementById('cards');
const maxLength = 50;

function renderCards(cardData) {
  // 遍历卡片数据并动态创建卡片元素
  cardData.forEach((card) => {
    // 创建卡片元素
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    // console.log(card.Title);
    // 创建卡片内容元素
    const cardImg = document.createElement("div");
    cardImg.classList.add("card-img");
    const Img = document.createElement("img");
    Img.src = "./assets/images/works/small/" + card.ImageFileName + ".jpg";
    Img.alt = card.ImageFileName;

    Img.addEventListener("click", () => {
      // window.location.href = "./php/details.php?id=" + card.PaintingID;
      window.location.href = "./details.html?id=" + card.PaintingID;
    });

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");
    const title = document.createElement("p");
    title.classList.add("text-title");
    title.textContent = card.Title;
    const description = document.createElement("p");
    description.classList.add("text-body");
    // description.textContent = card.Description;
    description.innerHTML = card.Description;
    const ArtistElement = document.createElement("p");
    fetch('./php/artists.php?id=' + card.ArtistID).then(res => res.json()).then(artist => {
      ArtistElement.textContent = artist.FirstName + " " + artist.LastName;
    });
    //description cut
    // let text = description.innerText;
    // if (text.length > maxLength) {
    //   text = text.substring(0, maxLength) + '...';
    // }
    // description.innerText = text;

    const footer = document.createElement("div");
    footer.classList.add("card-footer");
    const price = document.createElement("span");
    price.classList.add("text-title");
    price.textContent = "$" + parseFloat(card.Cost).toFixed(2);
    const cardBtn = document.createElement("div");
    cardBtn.classList.add("card-button");

    cardBtn.addEventListener("click", () => {
      const body = {
        PaintingID: card.PaintingID,
        userId: localStorage.getItem('userId'),
      };
      console.log(JSON.stringify(body));
      // const trydata = JSON.parse(JSON.stringify(body));
      // console.log(trydata.PaintingID); // 输出 "7"
      // console.log(trydata.userId); // 输出 "5"
      $.ajax({
        url: "./php/addCart.php",
        type: "POST",
        data: JSON.stringify(body),
        contentType: "application/json", // 指定发送的数据类型为 JSON
        success: function (response) {
          // 处理服务器响应
          console.log(response);
        },
        error: function (xhr, status, error) {
          // 处理请求错误
          console.log(error);
        }
      });

      // console.log(JSON.stringify(body));
      // fetchWithBody('addCart.php', 'POST', body)
      //   .then(resp => resp.json())
      //   .then(respData => {
      //     try {
      //       // 尝试解析 JSON 数据
      //       // const result = JSON.parse(respData);
      //       const result = respData;
      //       // 处理解析后的数据
      //       console.log(result);
      //       if (result.success) {
      //         // window.location.href = "./index.html";
      //       }
      //       // ...
      //     } catch (error) {
      //       // 解析 JSON 数据时出现错误，处理错误并向用户显示错误提示
      //       console.error('Failed to parse JSON data:', error);
      //       // ...
      //     }
      //   })
    });
    const svgIcon = `<svg class="svg-icon" viewBox="0 0 20 20">
    <path
        d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z">
    </path>
    <path
        d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z">
    </path>
    <path
        d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z">
    </path>
</svg>`;
    cardBtn.innerHTML = svgIcon;
    // 将卡片内容元素添加到卡片元素中
    cardElement.appendChild(cardImg);
    cardImg.appendChild(Img);
    cardElement.appendChild(cardInfo);
    cardInfo.appendChild(title);
    // cardInfo.appendChild(description);
    cardInfo.appendChild(ArtistElement);
    cardElement.appendChild(footer);
    footer.appendChild(price);
    footer.appendChild(cardBtn);
    // cardBtn.appendChild(svgIcon);
    // 将卡片元素添加到父容器中
    cardContainer.appendChild(cardElement);
  });
}
window.onload = function () {
  // 获取父容器元素

  //XHR relics

  fetch('./php/getpaintings.php')
    .then(res => res.json())
    .then(data => {
      //Print cardData
      console.log(data);
      // console.log('wcao');
      renderCards(data);
    });

  // 检查 localStorage 中的 userId，并根据需要显示或隐藏导航栏链接
  var userId = localStorage.getItem('userId');
  var username = localStorage.getItem('username');
  var goLinks = document.getElementsByClassName('go-link');
  var antiLinks = document.getElementsByClassName('anti-link');
  for (var i = 0; i < goLinks.length; i++) {
    var goLink = goLinks[i];
    var antiLink = antiLinks[i];
    if (!userId) {
      goLink.style.color = '#ffffff';
      goLink.style.display = 'none';
    } else {
      goLink.style.color = '#111111';
      goLink.style.display = 'inline';
    }
    if (!username) {
      goLink.disabled = true;
    }
    else {
      goLink.disabled = false;
    }
    goLink.addEventListener('click', function (event) {
      if (this.disabled) {
        event.preventDefault();
      }
    });
  }
  for (var i = 0; i < antiLinks.length; i++) {
    var goLink = goLinks[i];
    var antiLink = antiLinks[i];
    if (!userId) {
      antiLink.style.color = '#111111';
      antiLink.style.display = 'inline';
    } else {
      antiLink.style.color = '#ffffff';
      antiLink.style.display = 'none';
    }
    if (!username) {
      antiLink.disabled = false;
    }
    else {
      antiLink.disabled = true;
    }
    antiLink.addEventListener('click', function (event) {
      if (this.disabled) {
        event.preventDefault();
      }
    });
  }
  // var goLink = document.getElementById('cart-link');
  // if (!userId) {
  //   goLink.style.color = '#ffffff';
  //   goLink.style.display = 'none';
  // }
  // else {
  //   goLink.style.color = '#111111';
  //   goLink.style.display = 'inline';
  // }
  // if (!username) {
  //   goLink.disabled = true;
  // }
  // goLink.addEventListener('click', function (event) {
  //   if (this.disabled) {
  //     event.preventDefault();
  //   }
  // });

}

