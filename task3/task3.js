
const counterValue = document.getElementById('counterValue');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');


let count = 0;


function updateDisplay() {
    counterValue.textContent = count;
}


incrementBtn.addEventListener('click', function() {
    count++;
    updateDisplay();
});


decrementBtn.addEventListener('click', function() {
    if (count > 0) {
        count--;
        updateDisplay();
    }
});


resetBtn.addEventListener('click', function() {
    count = 0;
    updateDisplay();
});