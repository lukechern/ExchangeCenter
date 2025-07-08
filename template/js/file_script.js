const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const progress = document.getElementById('progress');

uploadBtn.addEventListener('click', () => {
  fileInput.click();
});

// 当选择的文件发生变化时
fileInput.addEventListener('change', () => {
  // 创建 FormData 对象
  const formData = new FormData();
  // 添加选中的文件到 FormData 对象中
  for (const file of fileInput.files) {
    formData.append('files[]', file);
  }
  // 发送 AJAX 请求上传文件
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'ajax/file_upload_ajax.php');
  xhr.upload.addEventListener('progress', e => {
    // 显示上传进度
    progress.innerText = `上传中：${(e.loaded / e.total * 100).toFixed(2)}%`;
  });
  xhr.onload = () => {
    // 隐藏上传进度
    progress.style.display = 'none';
    // 显示上传成功提示
    const message = document.createElement('div');
    message.innerText = '上传成功';
    message.classList.add('upload_ok');
    document.body.appendChild(message);
    // 5秒后隐藏上传成功提示，并刷新页面
    setTimeout(() => {
      //message.remove();
      location.reload();
    }, 1000);
  };
  xhr.send(formData);
  // 显示上传进度
  progress.style.display = 'block';
  progress.innerText = '上传中：0%';
});

const link = document.getElementById('dir');

link.addEventListener('click', event => {
  event.preventDefault(); // 阻止默认行为
  const url = 'https://push.getquicker.cn/to/quicker?toUser=hi.1@qq.com&code=CSU0qP15Oue6Z&operation=action&action=文件接力&data=dir';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    console.log(xhr.responseText);
  };
  xhr.send();
});


let option_file_name;
var inputField = document.getElementById('newFileName');

function showPopup(fileName) {
  option_file_name = fileName;
  var popup = document.getElementById('popup');
  var popupContent = popup.getElementsByTagName('h3')[0];
  popupContent.innerHTML = '文件操作 - ' + option_file_name;


  // 获取文件扩展名
  var fileExt = fileName.split('.').pop();

  // 自动填充文件扩展名到 input 标签中
  inputField.value = fileExt ? '.' + fileExt : '';

  // 显示遮罩层
  var overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.bottom = 0;
  overlay.style.left = 0;
  overlay.style.right = 0;
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.addEventListener('click', function() {
      popup.style.display = 'none';
      this.style.display = 'none';
  });


  document.body.appendChild(overlay);

  // 显示弹窗
  popup.style.display = 'block';
}




function deleteFile() {
  // if (!confirm('确定要删除该文件吗？')) {
  //   return;
  // }
    // 使用ajax提交删除文件的请求
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'ajax/file_del_ajax.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const message = document.createElement('div');
          message.innerText = '删除成功';
          message.classList.add('upload_ok');
          document.body.appendChild(message);
          setTimeout(() => {
            //message.remove();
            location.reload();
          }, 1000);
        } else {
          alert('删除文件失败，请重试！');
        }
      }
    };
    xhr.send('file=' + encodeURIComponent(option_file_name));
}

function renameFile() {
  // 获取新文件名
  var newFileName = document.querySelector('#popup input').value;
  if (!newFileName || /^\./.test(newFileName)) {
    alert('请输入正确的文件名');
    document.getElementById('newFileName').focus();
    document.getElementById('newFileName').setSelectionRange(0, 0);
    return;
  }




  fetch('ajax/file_rename_ajax.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'old_file_name=' + encodeURIComponent(option_file_name) + '&new_file_name=' + encodeURIComponent(newFileName)
  })
  .then(function(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error('请求失败，HTTP状态码：' + response.status);
  })
  .then(function(data) {
    console.log(data); // 打印 PHP 脚本返回的数据
    if (data.success) {
      const message = document.createElement('div');
      message.innerText = '重命名成功';
      message.classList.add('upload_ok');
      document.body.appendChild(message);
      setTimeout(() => {
        //message.remove();
        location.reload();
      }, 1000);
    } else {
      alert('文件重命名失败');
    }
  })
  .catch(function(error) {
    console.error(error);
  });
  



}





function showRenameTab() {
  var renameTab = document.getElementById('rename-tab');
  var deleteTab = document.getElementById('delete-tab');
  var renameButton = document.querySelector('.tab-button:nth-of-type(1)');
  var deleteButton = document.querySelector('.tab-button:nth-of-type(2)');
  
  renameTab.style.display = 'flex';
  deleteTab.style.display = 'none';
  renameButton.classList.add('active');
  deleteButton.classList.remove('active');


  // 将光标移动到input的最前面

  setTimeout(function() {
    inputField.focus();
    inputField.setSelectionRange(0, 0);
  }, 0);



}

function showDeleteTab() {
  var renameTab = document.getElementById('rename-tab');
  var deleteTab = document.getElementById('delete-tab');
  var renameButton = document.querySelector('.tab-button:nth-of-type(1)');
  var deleteButton = document.querySelector('.tab-button:nth-of-type(2)');
  
  renameTab.style.display = 'none';
  deleteTab.style.display = 'flex';
  renameButton.classList.remove('active');
  deleteButton.classList.add('active');
}







// 获取表格和所有的 checkbox 元素
const table = document.querySelector('table');
const checkboxes = document.querySelectorAll('.filetable input[type="checkbox"]');

// 创建底部的 div 元素和全选/取消按钮元素
const statsDiv = document.createElement('div');
const toggleButton = document.createElement('b');

// 设置 div 元素和按钮元素的样式和初始内容
statsDiv.className = 'toolbar';
//可拖动





// 获取 table 元素的位置信息
const tableRect = table.getBoundingClientRect();
const tableLeft = tableRect.left;
const tableTop = tableRect.top;
const tableWidth = tableRect.width;
const tableHeight = tableRect.height;



// 计算 statsDiv 的位置
const statsDivLeft = tableLeft + tableWidth - statsDiv.offsetWidth - 180;
const statsDivTop = tableTop  - statsDiv.offsetHeight -6;

// 设置 statsDiv 的位置和样式
statsDiv.style.position = 'fixed';
statsDiv.style.top = statsDivTop + 'px';
statsDiv.style.left = statsDivLeft + 'px';



statsDiv.innerHTML = '已选择 0 个文件';
toggleButton.textContent = '全选';


// 将 div 元素和按钮元素添加到表格后面
table.parentNode.insertBefore(statsDiv, table);


statsDiv.appendChild(toggleButton);

// 监听 checkbox 元素的变化事件
let count = 0;
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {

    var row = checkbox.parentNode.parentNode.parentNode;
    if (checkbox.checked) {
      row.classList.add('selected');
    } else {
      row.classList.remove('selected');
    }


    if (checkbox.checked) {
      count++;
      statsDiv.style.display = 'block';
    } else {
      count--;
    }

    toggleButton.textContent = checkboxes.length==count ? '取消' : '全选';

    statsDiv.innerHTML = `已选择 ${count} 个文件[<i onclick="toggleCheckboxes()">${toggleButton.outerHTML}</i>]<br><span onclick="BulkOperation(1)" class="iconfont icon-package" title="打包压缩"></span><span onclick="BulkOperation(2)" class="iconfont icon-del" title="批量删除"></span>`;
    if (count === 0) {
      statsDiv.style.display = 'none';
    }

    // console.log(toggleButton.outerHTML);


  });
});

// 全选/取消功能



function toggleCheckboxes() {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = toggleButton.textContent === '全选';
    var row = checkbox.parentNode.parentNode.parentNode;
    if (checkbox.checked) {
      row.classList.add('selected');
    } else {
      row.classList.remove('selected');
    }
  });
  count = toggleButton.textContent === '全选' ? checkboxes.length : 0;
  toggleButton.textContent = toggleButton.textContent === '全选' ? '取消' : '全选';
  statsDiv.innerHTML = `已选择 ${count} 个文件[<i onclick="toggleCheckboxes()">${toggleButton.outerHTML}</i>]<br><span onclick="BulkOperation(1)" class="iconfont icon-package" title="打包压缩"></span><span onclick="BulkOperation(2)" class="iconfont icon-del" title="批量删除"></span>`;
  statsDiv.style.display = count === 0 ? 'none' : 'block';
  console.log(toggleButton.outerHTML);
}


function BulkOperation(operationType) {
  const selectedCheckboxes = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedCheckboxes.push(checkbox.value);
    }
  });

  let ajaxurl = '';

  if (operationType === 1) {
    // 压缩打包
    ajaxurl = 'ajax/file_zip_ajax.php';
  } else if (operationType === 2) {
    // 批量删除
    ajaxurl = 'ajax/file_batchdelete_ajax.php';
    if (!window.confirm('确认删除这些文件吗？')) {
      // 用户取消操作
      return;
    }
  } else {
    // 操作类型不支持
    return;
  }

  // 修改状态文本
  statsDiv.innerHTML = '正在处理中，请稍候...';
  
  const startTime = Date.now();
  const timer = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    statsDiv.innerHTML = `正在处理中，请稍候...(${elapsedTime}s)`;
  }, 1000);

  fetch(ajaxurl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(selectedCheckboxes)
  })
  .then(response => {
    clearInterval(timer); // 清除计时器
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // 处理成功响应
    const message = document.createElement('div');
    message.innerText = operationType === 1 ? '压缩打包zip成功' : '批量删除成功';
    message.classList.add('upload_ok');
    document.body.appendChild(message);
    setTimeout(() => {
      //message.remove();
      location.reload();
    }, 1000);
    console.log(data);
    statsDiv.innerHTML = '操作完成！'; // 恢复状态文本
  })
  .catch(error => {
    // 处理错误响应
    console.error(error);
    statsDiv.innerHTML = '操作失败！'; // 恢复状态文本
  });
}





