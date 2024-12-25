function validateForm() {
    const isXValid = validateXSelection();
    const isYValid = validateYText();
    const isRValid = validateRButton();

    return isXValid && isYValid && isRValid;
}

function validateXSelection() {
    const checkboxes = document.querySelectorAll('.group-x input[type="checkbox"]');
    const isAnyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    // const hiddenInput = document.getElementById('form:xHidden');

    if (!isAnyChecked) {
        showXWarning(true);
        return false;
    } else {
        showXWarning(false);
        return true;
    }
}

function validateYText() {
    const yInput = document.getElementById('form:y'); // Đảm bảo ID chính xác
    const yHidden = document.getElementById('form:yHidden');

    const yValue = parseFloat(yInput.value);
    if (isNaN(yValue) || yValue < -5 || yValue > 5) {
        showYWarning(true);
        return false;
    } else {
        showYWarning(false);
        if (yHidden) {
            yHidden.value = yValue;
        }
        return true;
    }
}

function validateRButton() {
    const rHiddenInput = document.getElementById('form:rHidden');
    if (!rHiddenInput || !rHiddenInput.value || parseFloat(rHiddenInput.value) === 0) {
        showRWarning(true);
        return false;
    }
    showRWarning(false);
    return true;
}

