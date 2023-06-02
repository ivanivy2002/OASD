window.onload = function () {
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
  }