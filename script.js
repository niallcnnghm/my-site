function toggleMenu() {
    const menu = document.getElementById('startMenu');
    menu.classList.toggle('open');
}

document.addEventListener('click', (e) => {
    const menu = document.getElementById('startMenu');
    const startBtn = document.querySelector('.start-btn');

    if (!menu || !startBtn) return;

    const clickedInsideMenu = menu.contains(e.target);
    const clickedStartBtn = startBtn.contains(e.target);

    if (!clickedInsideMenu && !clickedStartBtn) {
        menu.classList.remove('open');
    }
});

let activeWindow = null;
let offsetX = 0;
let offsetY = 0;

document.querySelectorAll('.title-bar').forEach(bar => {

    bar.addEventListener('mousedown', (e) => {
        e.preventDefault(); // stops text selection while dragging

        activeWindow = bar.closest('.window');

        const rect = activeWindow.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    });

});

document.addEventListener('mousemove', (e) => {
    if (!activeWindow) return;

    activeWindow.style.left = (e.clientX - offsetX) + 'px';
    activeWindow.style.top = (e.clientY - offsetY) + 'px';
});

document.addEventListener('mouseup', () => {
    activeWindow = null;
});

function updateClock() {
    const clock = document.querySelector('.clock');
    if (!clock) return;

    const now = new Date();

    clock.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

setInterval(updateClock, 1000);
updateClock();