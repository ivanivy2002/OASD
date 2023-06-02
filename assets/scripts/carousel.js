const carousel = document.querySelector('.carousel');
const carouselInner = carousel.querySelector('.carousel-inner');
// img as slides
const slides = carouselInner.querySelectorAll('img');
const prevBtn = carousel.querySelector('.prev-btn');
const nextBtn = carousel.querySelector('.next-btn');
let currentIndex = 0;

// 显示第一张图片
showSlide(currentIndex);

// 点击前进按钮，显示下一张图片
nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }
  showSlide(currentIndex);
});

// 点击后退按钮，显示上一张图片
prevBtn.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }
  showSlide(currentIndex);
});

//定时切换图片
setInterval(() => {
  currentIndex++;
  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }
  showSlide(currentIndex);
}, 5000);//5s 自动切换

// 显示指定索引的图片
function showSlide(index) {
  // 隐藏所有图片
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  // 显示指定索引的图片
  slides[index].style.display = 'block';
}


const dotsContainer = carousel.querySelector('.carousel-dots');
const images = carousel.querySelectorAll('.carousel-inner img');
const imageCount = images.length;

// 添加小圆圈
for (let i = 0; i < imageCount; i++) {
  const dot = document.createElement('div');
  dot.classList.add('carousel-dot');
  if (i === currentIndex) {
    dot.classList.add('active');
  }
  dot.addEventListener('click', () => {
    goToImage(i);
  });
  dotsContainer.appendChild(dot);
}

// 切换到指定图片
function goToImage(index) {
  // if (index < 0 || index >= imageCount) {
  //   return;
  // }
  currentIndex = index;
  // carouselInner.style.transform = `translateX(-${currentIndex * 25}%)`;
  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }
  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }
  showSlide(currentIndex);
  updateDots();
}

// 更新小圆圈状态
function updateDots() {
  const dots = dotsContainer.querySelectorAll('.carousel-dot');
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}