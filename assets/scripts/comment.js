// 获取评论列表数据
function getComments() {
  // 发送 AJAX 请求获取评论数据
  // 这里可以使用 jQuery 或其他库来简化 AJAX 请求的处理
  $.get('./php/comment.php', function (data) {
    // 成功获取评论数据后，渲染评论列表
    renderComments(data);
  });
}

// 渲染评论列表
function renderComments(comments) {
  var html = '';
  for (var i = 0; i < comments.length; i++) {
    var comment = comments[i];
    // 根据评论的层级缩进
    var indent = comment.level * 20;
    // 构造评论 HTML，包括缩进、折叠展开按钮和评论内容
    html += '<div class="comment" style="margin-left: ' + indent + 'px;">';
    if (comment.children.length > 0) {
      html += '<a href="#" class="toggle">[-]</a>';
    }
    html += '<strong>' + comment.author_name + ':</strong> ' + comment.comment_text;
    html += '</div>';
    // 如果有子评论，则递归渲染子评论
    if (comment.children.length > 0) {
      html += '<div class="children">';
      html += renderComments(comment.children);
      html += '</div>';
    }
  }
  // 将评论 HTML 插入到页面中
  $('#comments').html(html);
  // 绑定折叠展开按钮的点击事件
  $('.toggle').click(function (e) {
    e.preventDefault();
    var children = $(this).parent().next('.children');
    if (children.is(':visible')) {
      $(this).text('[+]');
      children.hide();
    } else {
      $(this).text('[-]');
      children.show();
    }
  });
}

// 提交评论表单数据
// $('#comment-form').submit(function(e) {
//   e.preventDefault();
//   var formData = $(this).serialize();
//   // 发送 AJAX 请求提交评论数据
//   $.post('./php/comment.php', formData, function(data) {
//     // 成功提交评论后，重新获取评论列表并渲染
//     getComments();
//   });
// });
document.getElementById('comment-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  fetch('./php/comment.php', {
    method: 'POST',
    body: formData
  }).then(() => {
    getComments();
  });
})

// function getComments() {
//   return fetch('./php/comment.php')
//     .then(res => res.json())
// }

// function renderComment(comment) {
//   // ... 构造评论HTML
// }

// function renderComments(comments) {
//   const html = [];
//   for (const comment of comments) {
//     html.push(renderComment(comment))
//     if (comment.children.length) {
//       html.push(renderComments(comment.children))
//     }
//   }
//   return html.join('')
// }

// function toggleChildren(event) {
//   // ... 绑定折叠展开事件
// }

// function submitComment(event) {
//   // ... 提交评论,然后重新获取数据
// }

// getComments()
//   .then(comments => {
//     document.getElementById('comments').innerHTML = renderComments(comments)
//     // 绑定事件
//     document.querySelectorAll('.toggle').forEach(toggleChildren)
//   })
// document.getElementById('comment-form').addEventListener('submit', submitComment)