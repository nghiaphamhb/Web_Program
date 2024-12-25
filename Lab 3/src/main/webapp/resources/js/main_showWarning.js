function showXWarning(show){
    if (show){
        document.getElementById('x-warning').style.display = 'block';
    } else {
        document.getElementById('x-warning').style.display = 'none';
    }
}

function showYWarning(show){
    if (show){
        document.getElementById('y-warning').style.display = 'block';
    } else {
        document.getElementById('y-warning').style.display = 'none';
    }
}

function showRWarning(show){
    if (show){
        document.getElementById('r-warning').style.display = 'block';
    } else {
        document.getElementById('r-warning').style.display = 'none';
    }
}

function hiddenAllWarning(show){
    showXWarning(!show);
    showYWarning(!show);
    showRWarning(!show);
}