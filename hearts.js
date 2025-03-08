function createHeart(x, y) {
    const heart = document.createElement("span");
    heart.classList.add("heart");

    // 🔥 Используем случайные цвета сердечек
    const heartColors = ["🩷", "❤️", "🧡", "💛", "💚", "🩵", "💙", "💜", "🖤", "❤️‍🔥", "💖"];
    heart.innerHTML = heartColors[Math.floor(Math.random() * heartColors.length)];

    document.body.appendChild(heart);

    // 🔥 Устанавливаем координаты клика
    heart.style.position = "absolute";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    // 🔥 Анимация подъема вверх и исчезновения
    heart.style.animation = "float 1.5s ease-in-out forwards";

    // 🔥 Удаляем сердечко через 1.5 секунды
    setTimeout(() => {
        heart.remove();
    }, 1500);
}
