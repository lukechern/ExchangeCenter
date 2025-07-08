$(document).ready(function() {
    // 获取显示二维码的 span 元素和二维码图片的容器元素
    const showQrCode = $('#qrcode');
    const qrCodePop = $('#qrcodepop');
    const textarea = $("#textarea");
    const successMsg = $("#successMsg");

    textarea.on('change', function() {
        saveText_7ree();
    });

    var saveBtn_7ree = $("#saveBtn_7ree");

    saveBtn_7ree.on('click', function() {
        saveText_7ree();
        showNotification('保存成功', 1000);
    });

    // QR code display logic
    showQrCode.on('click', function() {
        var text = textarea.val();
        if (text) {
            // 发送 AJAX 请求获取二维码图片
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'ajax/qrcode_ajax.php?text=' + encodeURIComponent(text));
            xhr.responseType = 'blob';
            xhr.onload = () => {
                if (xhr.status === 200) {
                    // 创建一个新的图片元素，将获取的二维码图片数据转换成 URL 并设置为图片的 src 属性
                    const img = new Image();
                    img.src = URL.createObjectURL(xhr.response);
                    // 将图片元素添加到二维码图片的容器元素中
                    qrCodePop.empty();
                    qrCodePop.append(img);
                    qrCodePop.css('display', 'block');

                    // 将弹出框定位到按钮下方
                    var btnRect = showQrCode[0].getBoundingClientRect();
                    var popupHeight = qrCodePop[0].clientHeight;
                    var top = btnRect.bottom + 20;
                    var left = btnRect.left - btnRect.width ;
                    if (top + popupHeight > window.innerHeight) {
                        top = btnRect.top - popupHeight;
                    }
                    qrCodePop.css({'top': top + "px", 'left': left + "px"});

                    // 点击屏幕任意位置关闭弹出框
                    $(document).on("click", function(e) {
                        if (!qrCodePop[0].contains(e.target) && !showQrCode[0].contains(e.target)) {
                            qrCodePop.css('display', 'none');
                        }
                    });
                }
            };
            xhr.send();
        }
    });

    // Close QR code popup when clicked outside
    qrCodePop.on('click', function(event) {
        if (event.target === qrCodePop[0]) {
            qrCodePop.css('display', 'none');
        }
    });

    // 每30秒自动保存
    setInterval(function() {
        saveText_7ree();
    }, 30000);

    function saveText_7ree() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "ajax/note_edit_ajax.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var now = new Date();
                var currentMonth = ("0" + (now.getMonth() + 1)).slice(-2);
                var currentDate = ("0" + now.getDate()).slice(-2);
                var currentHours = ("0" + now.getHours()).slice(-2);
                var currenMinutes = ("0" + now.getMinutes()).slice(-2);

                var timeString = currentMonth + "/" + currentDate + " " + currentHours + ":" + currenMinutes;
                successMsg.html("保存成功： " + timeString);
                showNotification('保存成功', 1000);
            }
        };
        xhr.send("text=" + encodeURIComponent(textarea.val()));
    }
});