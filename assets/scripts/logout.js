
var btn = document.getElementById('log-out-btn');
btn.addEventListener("click", () => {
    localStorage.clear();
});