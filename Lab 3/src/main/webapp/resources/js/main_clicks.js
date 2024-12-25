function changeR(button, value) {
    document.getElementById('form:rHidden').value = value;
    let buttons = document.getElementById('r-buttons').getElementsByClassName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('r-checked');
    }

    button.classList.add('r-checked');
    drawGraph(value);
}


function updateHiddenXAndToggle(value) {
    const hiddenX = document.getElementById('form:xHidden');
    if (parseInt(hiddenX.value) === value) {
        console.log(`Hidden input x already has the value ${value}. No update needed.`);
        return;
    }

    hiddenX.value = value;

    const checkboxes = document.querySelectorAll('.group-x input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        const checkboxValue = parseInt(checkbox.nextElementSibling.textContent.trim());
        if (checkboxValue !== value) {
            checkbox.checked = false; // Bỏ chọn checkbox khác
        }
    });
    document.getElementById('x-warning').style.display = 'none';
}





