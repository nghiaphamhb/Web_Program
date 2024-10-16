document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");
    const submitButton = document.getElementById("submit-button");
    const resetButton = document.getElementById("reset-button");
    let xValue = NaN;
    let yValue = NaN;
    let rValue = NaN;
    let sendTime;

    //reset button 
    resetButton.addEventListener("click", function(){
        form.reset();
    });

    //choose only 1 check boxes of x 
    const checkboxes = document.querySelectorAll("input[name='x-checkbox']");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                //Unselected others boxes 
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
        }});
    });

    // get r value by click the buttons 
    const buttons = document.querySelectorAll("input[name='r-button']");
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            rValue = parseFloat(button.value);
    });
});

    //submit button 
    submitButton.addEventListener("click", function(event) {
        event.preventDefault(); //Prevent default action (redirect to page, ...) to fetch
        sendTime = new Date().toLocaleTimeString('vi-VN', { hour12: false }); 

        //get x and y values 
        xValue = parseFloat(document.querySelector("input[name='x-checkbox']:checked")?.id);
        yValue = parseFloat(document.getElementById("yField").value);

        const data = {
            x: xValue,
            y: yValue,
            r: rValue
        };
        console.log(data); //check out send data 

        let statusCode;
        fetch('http://localhost:8080/fcgi-bin/server-1.0-jar-with-dependencies.jar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)   //json to string 
        })
        .then(response => {
            statusCode = response.status;
            return response.json();
        })
        .then(data => {
            if(statusCode == 400){ // 400 Bad Request 
                errorMessage = JSON.stringify(data).replace("java.lang.NumberFormatException:", "");
                errorMessage = errorMessage.replaceAll("\"", "");
                errorMessage = errorMessage.replaceAll("*", "\n");
                errorMessage = "400 Bad Request:" + errorMessage;

                alert(errorMessage);
            } 
            else {  // 200 OK 
                console.log("Server answer:", data);
                updateTable(data);
                } 
            })
            .catch(error => {
                alert("Mistake while sending: " + error)
            });
    });


    //update result table 
    function updateTable(result) {
        const tableBody = document.getElementById("result-rows");
        const newRow = document.createElement("div");
        newRow.className = "result-row";
        newRow.innerHTML = `
            <div class="column-result">${result.x}</div>
            <div class="column-result">${result.y}</div>
            <div class="column-result">${result.r}</div>
            <div class="column-result">${sendTime}</div>
            <div class="column-result">${result.responseTime}</div>
            <div class="column-result">${result.inArea === true ? 'True' : 'False'}</div>
        `;
        tableBody.appendChild(newRow); // add new row 
    }
    
});