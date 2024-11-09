(window.onload = function () {
    const loadTime = performance.now();

    const loadTimeDisplay = document.createElement('div');
    loadTimeDisplay.style.position = 'fixed';
    loadTimeDisplay.style.bottom = '100px';
    loadTimeDisplay.style.left = '20px';
    loadTimeDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    loadTimeDisplay.style.color = 'white';
    loadTimeDisplay.style.padding = '10px';
    loadTimeDisplay.style.borderRadius = '5px';

    const seconds = (loadTime / 1000).toFixed(3);
    loadTimeDisplay.textContent = `Page load time: ${seconds} seconds`;

    document.body.appendChild(loadTimeDisplay);
})();
