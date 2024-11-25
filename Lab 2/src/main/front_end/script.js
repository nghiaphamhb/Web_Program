document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");
    const submitButton = document.getElementById("submit-button");
    const resetButton = document.getElementById("reset-button");
    const tableBody = document.getElementById("result-rows");
    let xValue = NaN;
    let yValue = NaN;
    let rValue = NaN;
    let sendTime = "";
    //added elements
    const svgArea = document.querySelector("svg");
    const pointsGroup = document.querySelector("#points-group");
    let savedPoints = [];


    /**
     * Reset button
     */
    resetButton.addEventListener("click", function () {
        form.reset();
        fetch('http://127.0.0.1:8080/webLab2-1.0/controller', {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log("INFO: Server-side results cleared.");
                } else {
                    console.error("Failed to clear server-side results.");
                }
            })
            .catch(error => {
                console.error("Error while clearing results:", error);
            });

    });

    /**
     * X buttons
     * @type {NodeListOf<Element>}
     */
    const x_buttons = document.querySelectorAll("input[name='x-button']");
    x_buttons.forEach(x_button => {
        x_button.addEventListener('click', () => {
            // event.preventDefault();
            xValue = parseFloat(x_button.value);
        });
    });

    /**
     * R buttons
     * @type {NodeListOf<Element>}
     */
    const r_buttons = document.querySelectorAll("input[name='r-button']");
    r_buttons.forEach(r_button => {
        r_button.addEventListener('click', () => {
            // event.preventDefault();
            rValue = parseFloat(r_button.value);
            reDrawPoints();
        });
    });

    /**
     * Send data to server and get data from it
     * @param data
     */
    function sendAndGetDataWithServer(data) {
        if (isNaN(data.y)) data.y = -4;

        const jsonData = JSON.stringify(data); // change formData to JSON
        console.log("INFO: " + jsonData); // check it

        fetch('http://127.0.0.1:8080/webLab2-1.0/controller',  //send data
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            }
        )
            .then(response => {  //get response
                if (response.ok) {
                    return response.text();
                } else {
                    return response.text().then(errText => {
                        throw new Error(errText);
                    });
                }
            })
            .then(text => {  //check response
                let queryString = "";
                if (text) {
                    const dataResp = JSON.parse(text);
                    console.log("Response: ", dataResp);
                    updateTable();
                    queryString = `x=${dataResp.data.x}&y=${dataResp.data.y}&r=${dataResp.data.r}&sendTime=${dataResp.data.sendTime}&getTime=${dataResp.getTime}&inArea=${dataResp.inArea}`;
                } else {
                    console.log("INFO: No content in response.");
                }
                if (queryString){
                    window.location.href = `http://127.0.0.1:8080/webLab2-1.0/result_page.jsp?${queryString}`;
                }
            })
            .catch(error => {
                alert("Mistake: " + error.message); // Hiển thị thông báo lỗi
            });
        resetValues();
    }

    /**
     * Submit button
     */
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        yValue = parseFloat(document.getElementById("yField").value);

        sendTimeValue = new Date().toLocaleTimeString('vi-VN', {hour12: false});
        if (isNaN(xValue)) xValue = -4;

        const data = {
            x: xValue,
            y: yValue,
            r: rValue,
            sendTime: sendTimeValue
        };
        drawPoint(xValue, yValue, rValue);
        sendAndGetDataWithServer(data);
    });

    /**
     * Update table
     */
    function updateTable() {
        tableBody.innerHTML = "";

        savedPoints.forEach(point => {
            const newRow = document.createElement("div");

            newRow.className = "result-row";
            newRow.innerHTML = `
            <div class="column-result">${point.data.x}</div>
            <div class="column-result">${point.data.y}</div>
            <div class="column-result">${point.data.r}</div>
            <div class="column-result">${point.data.sendTime}</div>
            <div class="column-result">${point.getTime}</div>
            <div class="column-result">${point.inArea === true ? 'True' : 'False'}</div>`;
            tableBody.appendChild(newRow);
        });

    }

    /**
     * Draw point into SVG area
     * @param x
     * @param y
     * @param r
     */
    function drawPoint(x, y, r) {
        if(r <= 0 || isNaN(r)) return;
        const cx = (x / r) * 80;
        const cy = -(y / r) * 80;
        const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        point.setAttribute("cx", cx);
        point.setAttribute("cy", cy);
        point.setAttribute("r", "2");
        point.setAttribute("fill", "red");

        pointsGroup.appendChild(point);

    }

    /**
     * Redraw points in SVG when r was changed
     */
    function reDrawPoints() {
        pointsGroup.innerHTML = "";
        console.log("INFO: savedPoints:", savedPoints, typeof savedPoints);
        if (savedPoints.length > 0 && isNaN(rValue)) {
            rValue = savedPoints[0].data.r;
        }
        savedPoints.forEach(point => {
            drawPoint(point.data.x, point.data.y, rValue);
        });
    }

    /**
     * Fetch saved points from servlet context
     */
    function fetchSavedPoints() {
        fetch('http://127.0.0.1:8080/webLab2-1.0/checkArea')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    savedPoints = data;
                    if (savedPoints.length === 0) {
                        console.log("INFO: No points found. The results array is empty.");
                    }
                    else {
                        reDrawPoints();
                        updateTable();
                    }
                } else {
                    savedPoints = [];
                    throw new Error("Data received is not an array. Resetting savedPoints to an empty array.");
                }
            })
            .catch(error => {
                console.error('Mistake while taking saved points:', error);
            });
    }


    /**
     * Click into area
     */
    svgArea.addEventListener("click", function (event) {
        const svgRect = svgArea.getBoundingClientRect();
        const clickX = event.clientX - svgRect.left;
        const clickY = event.clientY - svgRect.top;


        const multiplier = svgRect.width / 200;

        xValue = (((clickX - svgRect.width / 2) / multiplier) * rValue) / 80;
        yValue = (((-(clickY - svgRect.height / 2) / multiplier) * rValue) / 80);

        drawPoint(xValue, yValue, rValue);

        if (isNaN(rValue)){
            xValue = 0;
            yValue = 0;
        }

        sendTimeValue = new Date().toLocaleTimeString('vi-VN', {hour12: false});
        const data = {
            x: xValue,
            y: yValue,
            r: rValue,
            sendTime: sendTimeValue
        };
        sendAndGetDataWithServer(data);
    });

    function resetValues(){
        xValue = NaN;
        yValue = NaN;
        rValue = NaN;
    }

    //while loading the page, fetch again saved points and table
    fetchSavedPoints();
});