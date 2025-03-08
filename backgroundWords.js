document.addEventListener("DOMContentLoaded", function() {
    generateCompliments();
});

// 📌 Список комплиментов (Теперь с Заглавной Буквы)
const backgroundWords = [
    "Удивительная", "Невероятная", "Красивая", "Шикарная", "Чудесная", "Супер!",
    "Несравненная", "Блистательная", "Неповторимая", "Любимая", "Блестящая", "Душевная",
    "Иногда Душная", "Самая лучшая", "Милая", "Сексуальная", "Яркая", "Привлекательная",
    "Вау!", "Бесподобная", "Очаровательная", "Достойная", "Булочка", "Лапочка",
    "Сладулька", "Солнце", "Солнышко", "Восхитительная", "Ангелочек", "Лапусечка",
    "Чарующая", "Завораживающая", "Неотразимая", "Прекрасная", "Ласковая"
];

// 💖 Функция для генерации множества комплиментов (увеличено в 3 раза)
function generateCompliments() {
    for (let i = 0; i < backgroundWords.length * 3; i++) {
        const word = document.createElement("span");
        word.classList.add("compliment-word");
        word.innerText = backgroundWords[i % backgroundWords.length]; // Зацикливаем список

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        word.style.left = `${x}px`;
        word.style.top = `${y}px`;

        document.body.appendChild(word);
    }
}
