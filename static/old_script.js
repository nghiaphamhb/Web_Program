$(function() {
    // check if the correct checkbox is selected.
    function validateX() {
        return $('.x-checkbox:checked').length === 1; // Đảm bảo chỉ 1 checkbox được chọn
    }

    // check if the value of input box Y
    function validateY() {
        const y_min = -3;
        const y_max = 5;

        let yField = $('input[name="y"]');
        let numY = yField.val().replace(',', '.');

        return numY >= y_min && numY <= y_max;
    }

    // check if one of the buttons has been pressed
    function validateR() {
        
        return $('.value-and-box input[type="button"].selected').length === 1; // Kiểm tra nếu có nút R được chọn
    }

    function validateForm() {
        console.log("Validating form...");
        return validateX() && validateY() && validateR();
    }

    $('#reset button').on('click', function() {
        $('#input-form')[0].reset(); // Đặt lại biểu mẫu
        $('.button').attr('disabled', false); // Kích hoạt lại các nút
        $('.value-and-box input[type="button"]').removeClass('selected'); // Xóa các lựa chọn
        $('.x-checkbox').prop('checked', false); // Bỏ chọn tất cả checkbox X
    });

    // Sự kiện click vào ô x 
    $('.x-checkbox').on('click', function() {
        console.log("x-click...");
        
        if (this.checked) {
            $(this).addClass('checked'); // Thêm lớp 'checked' nếu checkbox được chọn
            $('.x-checkbox').not(this).prop('checked', false); // Bỏ chọn các checkbox khác
        } else {
            $(this).removeClass('checked'); // Xóa lớp 'checked' nếu checkbox không được chọn
        }
    });

    //R button 
    $('.value-and-box input[type="button"]').on('click', function() {
        console.log("r-click...");
        $('.value-and-box input[type="button"]').removeClass('selected'); // Xóa các lựa chọn trước đó
        $(this).addClass('selected'); // Đánh dấu nút hiện tại là đã chọn
    });

    $('#input-form').on('submit', function(event) {
        console.log("submit...");

        event.preventDefault(); // Prevent default form action
        if (!validateForm()) return; // Check form validity

        $.ajax({
            url: "http://localhost:8080/fcgi-bin/server-1.0-jar-with-dependencies.jar", // URL to send request
            method: 'POST', // HTTP method
            data: $(this).serialize() + '&timezone=' + new Date().getTimezoneOffset(), // Data to send
            dataType: "json", // Expected data type from server
            beforeSend: function() {
                $('.button').attr('disabled', 'disabled'); // Disable buttons before sending
            },
            success: function(data) {
                $('.button').attr('disabled', false); // Enable buttons after response
                if (data.validate) {  // Check response from server
                    // Create a new row in the result table
                    let newRow = '<div>';
                    newRow += '<div class="column-result">' + data.xval + '</div>';
                    newRow += '<div class="column-result">' + data.yval + '</div>';
                    newRow += '<div class="column-result">' + data.rval + '</div>';
                    newRow += '<div class="column-result">' + data.curtime + '</div>';
                    newRow += '<div class="column-result">' + data.exectime + '</div>';
                    newRow += '<div class="column-result">' + data.hitres + '</div>';
                    newRow += '</div>';

                    $('#result').append(newRow);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('.button').attr('disabled', false); // Kích hoạt lại các nút
                console.error("Error: " + textStatus, errorThrown); // In lỗi ra console
            }
        });
    });
});