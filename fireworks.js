function createFirework() {
    const firework = document.createElement("div");
    firework.classList.add("firework");
    document.body.appendChild(firework);

    const levelCounter = document.getElementById("levelCounter");
    const rect = levelCounter.getBoundingClientRect();
    
    const x = rect.left + rect.width / 2 + (Math.random() * 100 - 50);
    const y = rect.top + rect.height / 2 + (Math.random() * 100 - 50);
    
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;

    setTimeout(() => firework.remove(), 1000);
}
