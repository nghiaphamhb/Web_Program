const center = 210;
const rightEdge = 410;
const leftEdge = 10;
const bottomEdge = 410;
const topEdge = 10;
const max = 420;
const l = (bottomEdge - topEdge) / 6;
const mainColor = 'rgba(82,149,248,0.93)';
const axisAndLabelColor = "#00428c";
let xList = [];
let yList = [];
let rList = [];
let hitList = [];

function drawGraph(r) {
    const canvas = document.getElementById("graphic");
    const context = canvas.getContext('2d');
    const axisColor = axisAndLabelColor;
    const areaColor = mainColor;
    const labelColor = axisAndLabelColor; // Màu cho các nhãn ký hiệu

    context.clearRect(0, 0, max, max);

    // Vẽ trục tọa độ
    context.strokeStyle = axisColor;
    context.lineWidth = 2;
    drawArrow(context, leftEdge, center, rightEdge, center); // Trục X
    drawArrow(context, center, bottomEdge, center, topEdge); // Trục Y

    // Vẽ các khu vực đồ thị
    context.fillStyle = areaColor;
    context.globalAlpha = 0.8; // Làm mờ khu vực

    if (!r || r <= 0) {
        return;
    }

    // Hình vuông (cạnh R) ở góc phần tư thứ 2
    context.fillRect(center - r * l, center - r * l, r * l, r * l);

    // 1/4 hình tròn (bán kính R) ở góc phần tư thứ 1
    context.beginPath();
    context.arc(center, center, r * l, -Math.PI / 2, 0, false); // Vẽ cung góc phần tư thứ 1
    context.lineTo(center, center);
    context.closePath();
    context.fill();

    // Tam giác (chiều cao R, đáy R/2) ở góc phần tư thứ 4
    context.beginPath();
    context.moveTo(center, center); // Đỉnh tam giác
    context.lineTo(center + r * l / 2, center); // Điểm bên phải cạnh đáy
    context.lineTo(center, center + r * l); // Điểm dưới cạnh đáy
    context.closePath();
    context.fill();

    // Đặt lại độ trong suốt
    context.globalAlpha = 1;

    // Vẽ các ký hiệu R trên trục
    context.font = '12px Arial';
    context.fillStyle = labelColor;

    // Ký hiệu trên trục X
    context.fillText('-R', center - r * l, center + 15);
    context.fillText('-R/2', center - r * l / 2, center + 15);
    context.fillText('R/2', center + r * l / 2, center + 15);
    context.fillText('R', center + r * l, center + 15);

    // Ký hiệu trên trục Y
    context.fillText('-R', center + 5, center + r * l);
    context.fillText('-R/2', center + 5, center + r * l / 2);
    context.fillText('R/2', center + 5, center - r * l / 2);
    context.fillText('R', center + 5, center - r * l);

    // Ghi chú các trục
    context.fillText('X', rightEdge - 10, center - 10); // Trục X
    context.fillText('Y', center + 10, topEdge + 10);  // Trục Y

    // Vẽ lại các điểm đã lưu trên đồ thị
    drawAllDots(r);
}

function drawArrow(context, fromx, fromy, tox, toy) {
    const headlen = 10; // Độ dài của mũi tên
    const dx = tox - fromx;
    const dy = toy - fromy;
    const angle = Math.atan2(dy, dx);

    // Vẽ thân mũi tên
    context.beginPath(); // Bắt đầu đường vẽ
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.stroke(); // Vẽ thân mũi tên
    context.closePath(); // Kết thúc đường vẽ

    // Vẽ đầu mũi tên
    context.beginPath(); // Bắt đầu đường vẽ mới cho đầu mũi tên
    context.moveTo(tox, toy);
    context.lineTo(
        tox - headlen * Math.cos(angle - Math.PI / 6),
        toy - headlen * Math.sin(angle - Math.PI / 6)
    );
    context.moveTo(tox, toy);
    context.lineTo(
        tox - headlen * Math.cos(angle + Math.PI / 6),
        toy - headlen * Math.sin(angle + Math.PI / 6)
    );
    context.stroke(); // Vẽ đầu mũi tên
    context.closePath(); // Kết thúc đường vẽ
}

function drawDot(x, y, color) {
    const canvas = document.getElementById("graphic");
    const context = canvas.getContext('2d');
    context.fillStyle = color;
    context.globalAlpha = 1;
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, 2, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
}

function addDot() {
    // Lấy giá trị R từ hidden input
    let rElement = document.getElementById('form:rHidden');
    if (!rElement || !rElement.value || parseFloat(rElement.value) === 0) {
        console.error("R value not found or invalid. Ensure R is selected.");
        return;
    }
    let r = parseFloat(rElement.value);

    // Lấy giá trị Y từ input text
    let yElement = document.getElementById('form:y');
    if (!yElement || !yElement.value || isNaN(parseFloat(yElement.value))) {
        console.error("Y value not found or invalid. Ensure Y is entered.");
        return;
    }
    let y = parseFloat(yElement.value);

    // Lấy giá trị X từ hidden input
    let xElement = document.getElementById('form:xHidden');
    if (!xElement || !xElement.value || isNaN(parseFloat(xElement.value))) {
        console.error("X value not found or invalid. Ensure X is entered.");
        return;
    }
    let x = parseFloat(xElement.value);

    // Tính toán "hit" nếu cần gửi logic này lên backend
    let hit = ((x >= -r && x <= 0 && y >= 0 && y <= r) ||
        (x >= 0 && x <= r / 2 && y <= 0 && y >= -r + 2 * x) ||
        (x >= 0 && y >= 0 && x * x + y * y <= r * r));

    // Lưu trữ giá trị vào danh sách (nếu cần dùng cục bộ)
    xList.push(x);
    yList.push(y);
    rList.push(r);
    hitList.push(hit);

    console.log(`Point added locally: X=${x}, Y=${y}, R=${r}, Hit=${hit}`);

    // Không cần vẽ ngay lập tức, backend sẽ gửi toàn bộ dữ liệu để vẽ lại
}


function drawAllDots(r) {
    for (let i = 0; i < xList.length; i++) {
        drawDot(center + (xList[i] / rList[i]) * r * l, center - (yList[i] / rList[i]) * r * l,
            hitList[i] ? '#0F0' : '#F00');
    }
}

function saveDots(x, y, r, hit) {
    xList = x;
    yList = y;
    rList = r;
    hitList = hit;
}

function provideInteractiveGraphics() {
    const canvas = document.getElementById("graphic");

    canvas.addEventListener("click", function (e) {
        const rect = canvas.getBoundingClientRect();
        const canvasX = e.clientX - rect.left;
        const canvasY = e.clientY - rect.top;

        const rElement = document.getElementById('form:rHidden');
        if (!rElement || !rElement.value || parseFloat(rElement.value) <= 0) {
            showRWarning(true);
            return;
        }
        showRWarning(false);
        const r = parseFloat(rElement.value);

        const center = canvas.width / 2;
        const l = canvas.height / 6;

        let x = (canvasX - center) / l;
        let y = (center - canvasY) / l;

        const hiddenXInput = document.getElementById('form:xHidden');
        const yInput = document.getElementById('form:y');

        if (hiddenXInput) hiddenXInput.value = x;
        if (yInput) yInput.value = y;

        let hit =
            ((x >= -r) && (x <= 0) && (y >= 0) && (y <= r)) || // Hình chữ nhật
            ((x >= 0) && (x <= r / 2) && (y <= 0) && (y >= -r + 2 * x)) || // Tam giác
            ((x >= 0) && (y >= 0) && (x * x + y * y <= r * r)); // Cung tròn

        // Lưu và vẽ điểm mới
        xList.push(x);
        yList.push(y);
        rList.push(r);
        hitList.push(hit);
        drawAllDots(r);

        // Gửi form để cập nhật backend
        document.getElementById("form:submit-button").click();
    });
}



function clearDots() {
    const canvas = document.getElementById("graphic");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, max, max);
    xList = [];
    yList = [];
    rList = [];
    hitList = [];
    let currentR = document.getElementById('form:rHidden').value;
    if (currentR != null && currentR !== 0) {
        drawGraph(currentR);
    }
}



