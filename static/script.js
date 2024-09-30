const xCheckboxes = document.getElementsByName('x-checkbox');
const yField = document.querySelector('input[name="yField"]');
const rButtons = document.getElementsByName('r-button');
const submitButton = document.querySelector('[name="submit-button"]');
const resetButton = document.querySelector('[name="reset-button"]');
let x;
let y; 
let r; 

Array.from(xCheckboxes).forEach(function(checkbox) {
    checkbox.addEventListener('click', function() {
        if (this.checked) {
            x = this.value;
        }
    })
});

function getYValue() {
    y = yField.value;
};

Array.from(rButtons).forEach(function(rButton) {
    rButton.addEventListener('click', function(){
        r = this.value;
    })
});

resetButton.addEventListener('click', function() {
    document.getElementById('input-form').reset(); // Đặt lại biểu mẫu

});

function validateForm(){
    const y_min = -3;
    const y_max = 5;
    if (y < y_min || y > y_max) {
        console.log('Value of y is not accepted!');
        return false;
    }
    return true;
};

submitButton.addEventListener('click', function(event) {
    console.log("submit...");

    getYValue();
    if (!validateForm()) return;
    event.preventDefault(); // Ngăn chặn hành động mặc định của form
    

    var xhr = new XMLHttpRequest(); // Tạo đối tượng XMLHttpRequest
    xhr.open('POST', 'http://localhost:8080/fcgi-bin/server-1.0-jar-with-dependencies.jar', true); // Thiết lập phương thức và URL

    // Thiết lập header để nhận dữ liệu dưới dạng JSON
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');   //?

    // Lấy dữ liệu từ form; Dữ liệu sẽ được gửi
    var form = document.getElementById('input-form'); // Lấy form từ DOM
    var data = new URLSearchParams(new FormData(form)).toString() + '&timezone=' + new Date().getTimezoneOffset();
    let requestTime = new Date().getTimezoneOffset();

    // Sự kiện trước khi gửi
    xhr.onloadstart = function() {
        document.querySelector('.button').disabled = true; // Vô hiệu hóa nút trước khi gửi
    };

    // Xử lý phản hồi từ server (AJAX)
    xhr.onload = function() {
        document.querySelector('.button').disabled = false; // Kích hoạt lại nút sau khi nhận phản hồi
        if (xhr.status === 200) {
            try {
                console.log(xhr.responseText);  //debug 
                var responseData = JSON.parse(xhr.responseText); // Phân tích phản hồi JSON
                if (responseData.validate) {
                    // Tạo một hàng mới trong bảng kết quả
                    var newRow = document.createElement('div');
                    newRow.innerHTML = `
                        <div class="column-result">${responseData.x}</div>
                        <div class="column-result">${responseData.y}</div>
                        <div class="column-result">${responseData.r}</div>
                        <div class="column-result">${new Date().getTimezoneOffset()}</div>
                        <div class="column-result">${responseData.responseTime}</div>
                        <div class="column-result">${responseData.inArea}</div>
                    `;
                    document.getElementById('result').appendChild(newRow); // Thêm hàng mới vào kết quả
                }
            } catch (e) {
                console.error("Response is not valid JSON:", e);
                console.error("Response Text:", xhr.responseText);
            }
        } else {
            console.error("Error: " + xhr.statusText); // In lỗi ra console
        }
    };
    

    // Xử lý lỗi
    xhr.onerror = function() {
        document.querySelector('.button').disabled = false; // Kích hoạt lại nút
        console.error("Error: " + xhr.statusText); // In lỗi ra console
    };

    xhr.send(data); // Gửi dữ liệu
});




