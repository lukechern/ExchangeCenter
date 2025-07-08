document.getElementById('config-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', event.target.action);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status === 200) {
        showNotification('成功更新配置', 1000);
        setTimeout(() => {
          window.location.href = 'admin.php';
        }, 1000);
      } else {
        showNotification('出现错误，请重试', 1000);
      }
    };
    xhr.onerror = function() {
      showNotification('出现错误，请重试', 1000);
    };
    const formData = new FormData(event.target);
    xhr.send(new URLSearchParams(formData).toString());
});


function generateKey() {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById("key").value = result;
}