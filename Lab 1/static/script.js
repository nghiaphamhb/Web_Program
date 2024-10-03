document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");
    const errorDiv = document.createElement("div");
    const submitButton = document.getElementById("submit-button");
    const resetButton = document.getElementById("reset-button");
    let rValue;
    errorDiv.style.color = "red";
    errorDiv.style.backgroundColor = "yellow";
    form.appendChild(errorDiv);
    let sentTime;

    resetButton.addEventListener("click", function(){
        form.reset();
        errorDiv.innerHTML = "";
    });

    //only get x value
    const checkboxes = document.querySelectorAll("input[name='x-checkbox']");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                // B? ch?n t?t c? các checkbox khác
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
        }});
    });

    // get r value
    const buttons = document.querySelectorAll("input[name='r-button']");
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            rValue = parseFloat(button.value);
    });
});


    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        sentTime = new Date().toLocaleTimeString('vi-VN', { hour12: false }); 

        const xValue = parseFloat(document.querySelector("input[name='x-checkbox']:checked")?.value);
        const yValue = parseFloat(document.getElementById("yField").value);
        // const rValue = parseFloat(document.querySelector("input[name='r-button']:checked").value); 
        console.log("x=" + xValue + "&&" + "y=" + yValue + "&&" + "r=" + rValue); 


        let errorMessage = "";
        if (isNaN(xValue)) {
            errorMessage += "Only choose one value of X.<br>";
        }
        if (isNaN(yValue) || yValue < -3 || yValue > 5) {
            errorMessage += "Y should be selected from the range -3 to 5.<br>";
        }
        if (isNaN(rValue)) {
            errorMessage += "The R value must be selected.<br>";
        }

        if (errorMessage) {
            errorDiv.innerHTML = errorMessage;
            return;
        }

        errorDiv.innerHTML = "";

        // const data = {
        //     x: xValue,
        //     y: yValue,
        //     r: rValue
        // };

        const data = "x=" + xValue + "&&y=" + yValue + "&&r=" + rValue;

        fetch('http://localhost:8080/fcgi-bin/server-1.0-jar-with-dependencies.jar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Server answer:", data);
                if (data.error === undefined) {
                    updateTable(data);
                } else {
                    errorDiv.innerHTML = "Error in Server: " + data.error;
                }
                
            })
            .catch(error => {
                errorDiv.innerHTML = "Mistake while sending: " + error;
            });
    });



    function updateTable(result) {
        const tableBody = document.getElementById("result-rows");
        const newRow = document.createElement("div");
        newRow.className = "result-row";
        newRow.innerHTML = `
            <div class="column-result">${result.x}</div>
            <div class="column-result">${result.y}</div>
            <div class="column-result">${result.r}</div>
            <div class="column-result">${sentTime}</div>
            <div class="column-result">${result.responseTime}</div>
            <div class="column-result">${result.inArea === true ? 'true' : 'false'}</div>
        `;
        tableBody.appendChild(newRow); // Thêm hàng m?i vào k?t qu?
    }
    
});