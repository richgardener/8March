document.addEventListener("click", function(event) {
    if (event.target.id === "nextButton") {
        explodeHearts(event.clientX, event.clientY); // Взрыв при нажатии на кнопку
    } else {
        createHeart(event.clientX, event.clientY); // Одиночное сердечко при клике
    }
});

// 💥 Взрыв сердечек (4-7 штук) при нажатии на кнопку
function explodeHearts(x, y) {
    const heartCount = Math.floor(Math.random() * 7) + 14; // От 4 до 7 сердечек

    for (let i = 0; i < heartCount; i++) {
        const offsetX = (Math.random() - 0.5) * 100; // Разброс по X
        const offsetY = (Math.random() - 0.5) * 100; // Разброс по Y
        createHeart(x + offsetX, y + offsetY);
    }
}

// 💖 Создание одиночного сердечка (рандомный цвет)
function createHeart(x, y) {
    const heart = document.createElement("span");
    heart.classList.add("heart");

    // Доступные цвета сердечек
    const heartColors = ["🩷", "❤️", "🧡", "💛", "💚", "🩵", "💙", "💜", "🖤", "❤️‍🔥", "💖"];
    const randomColor = heartColors[Math.floor(Math.random() * heartColors.length)];

    heart.innerHTML = randomColor;
    document.body.appendChild(heart);

    heart.style.position = "absolute";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    heart.style.animation = "float 1.5s ease-in-out forwards";

    setTimeout(() => {
        heart.remove();
    }, 1500);
}
